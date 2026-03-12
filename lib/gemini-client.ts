// ─── Direct Gemini API helper (runs 100% in the browser) ──────────────────────

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

const GEMINI_ENDPOINT =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

const GEN_CONFIG = {
    temperature: 0.2,
    topK: 32,
    topP: 1,
    maxOutputTokens: 8192,
};

/** Maps HTTP status codes to user-friendly messages */
function statusMessage(status: number): string {
    if (status === 400) return "Something went wrong reading your file. Try uploading a cleaner PDF or Excel version.";
    if (status === 403) return "API key is invalid or not authorised. Please contact support.";
    if (status === 429) return "Too many requests. Please wait 30 seconds and try again.";
    return "Gemini is temporarily unavailable. Please try again in a moment.";
}

/**
 * Fires a single content-generation request to Gemini 1.5 Pro.
 * Returns the raw text of the first candidate part.
 */
export async function callGemini(prompt: string): Promise<string> {
    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: GEN_CONFIG,
    };

    const res = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(statusMessage(res.status));

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
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
    const attempt = async (): Promise<T> => {
        const raw = await callGemini(prompt);
        const jsonStr = extractJSON(raw);
        return JSON.parse(jsonStr) as T;
    };

    try {
        return await attempt();
    } catch {
        try {
            return await attempt();
        } catch {
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
