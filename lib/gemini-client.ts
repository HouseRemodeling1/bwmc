// ─── Gemini API helper (proxied through /api/gemini-proxy to avoid CORS) ─────

/**
 * Calls Gemini 1.5 Pro via our own Next.js proxy route.
 * Direct browser → googleapis.com calls are blocked by CORS.
 * The proxy keeps the API key server-side only.
 */
export async function callGemini(prompt: string): Promise<string> {
    const res = await fetch("/api/gemini-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
        throw new Error(data.error || "Gemini is temporarily unavailable. Please try again.");
    }

    return data.text as string;
}



/**
 * Extracts a JSON object from a raw string using bracket matching.
 * Handles cases where Gemini adds preamble text, trailing commentary,
 * imperfect markdown fences, or wraps JSON in explanation.
 */
function extractJSON(raw: string): string {
    // 1. Strip markdown fences if present
    const fenceStripped = raw
        .replace(/^```json?\s*/im, "")
        .replace(/\s*```\s*$/im, "")
        .trim();

    // 2. Find the outermost JSON object via bracket matching
    const start = fenceStripped.indexOf("{");
    if (start === -1) throw new Error("No JSON object found in response");

    let depth = 0;
    let inString = false;
    let escape = false;

    for (let i = start; i < fenceStripped.length; i++) {
        const ch = fenceStripped[i];
        if (escape) { escape = false; continue; }
        if (ch === "\\" && inString) { escape = true; continue; }
        if (ch === '"') { inString = !inString; continue; }
        if (inString) continue;
        if (ch === "{") depth++;
        if (ch === "}") {
            depth--;
            if (depth === 0) return fenceStripped.slice(start, i + 1);
        }
    }
    throw new Error("Incomplete JSON object in response");
}

/**
 * Calls Gemini and parses the response as JSON.
 * Uses bracket-matching extraction to tolerate preamble/trailing text.
 * Auto-retries once before throwing a user-friendly error.
 */
export async function callGeminiJSON<T>(prompt: string): Promise<T> {
    let lastRaw = "";
    const attempt = async (): Promise<T> => {
        lastRaw = await callGemini(prompt);
        console.debug("[Gemini] raw text for JSON parsing:", lastRaw.slice(0, 500));
        const jsonStr = extractJSON(lastRaw);
        return JSON.parse(jsonStr) as T;
    };

    try {
        return await attempt();
    } catch (firstErr) {
        console.error("[Gemini] first JSON parse attempt failed:", firstErr, "\nRaw:", lastRaw.slice(0, 500));
        try {
            return await attempt();
        } catch (secondErr) {
            console.error("[Gemini] second JSON parse attempt failed:", secondErr, "\nRaw:", lastRaw.slice(0, 500));
            // If the underlying callGemini threw (e.g. safety block, network), surface that error
            const msg = secondErr instanceof Error ? secondErr.message : String(secondErr);
            if (!msg.includes("JSON") && !msg.includes("Incomplete") && !msg.includes("No JSON")) {
                throw secondErr; // re-throw Gemini-level errors directly
            }
            throw new Error("We had trouble reading the AI response. Please try uploading your file again.");
        }
    }
}


// ─── Browser-side file parsers ─────────────────────────────────────────────────

/** Convert an uploaded File to a plain-text string suitable for Gemini. */
export async function parseFileToText(file: File): Promise<string> {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

    // ── CSV ──────────────────────────────────────────────────────────────────
    if (ext === "csv") {
        return await file.text();
    }

    // ── Excel ─────────────────────────────────────────────────────────────────
    if (ext === "xlsx" || ext === "xls") {
        const XLSX = await import("xlsx");
        const buffer = await file.arrayBuffer();
        const wb = XLSX.read(buffer, { type: "array" });
        const parts: string[] = wb.SheetNames.map((name) => {
            const ws = wb.Sheets[name];
            const json = XLSX.utils.sheet_to_json(ws, { defval: "" });
            return `Sheet: ${name}\n${JSON.stringify(json, null, 2)}`;
        });
        return parts.join("\n\n");
    }

    // ── PDF ───────────────────────────────────────────────────────────────────
    if (ext === "pdf") {
        const buffer = await file.arrayBuffer();
        // Dynamically import pdfjs-dist to keep initial bundle light
        const pdfjsLib = await import("pdfjs-dist");
        // Use CDN worker to avoid Next.js worker-file copy issues
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        const pages: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const lineText = content.items
                .map((item) => ("str" in item ? item.str : ""))
                .join(" ");
            pages.push(lineText);
        }
        return pages.join("\n");
    }

    throw new Error(`Unsupported file type: .${ext}. Please upload a PDF, Excel, or CSV file.`);
}
