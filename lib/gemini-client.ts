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
    if (!raw || !raw.trim()) throw new Error("Empty response from AI");

    // 1. Strip markdown fences and conversational noise more aggressively
    let cleaned = raw
        .replace(/^[\s\S]*?```(?:json)?/im, "") // Strip everything before the first ```json or ```
        .replace(/```[\s\S]*?$/im, "")         // Strip everything after the first closing ```
        .trim();

    // 2. If no fences were found, try to find the first '{' and last '}'
    const start = cleaned.indexOf("{");
    if (start === -1) {
        // Try again on the raw string just in case the cleaning was too aggressive
        const rawStart = raw.indexOf("{");
        if (rawStart === -1) throw new Error("No JSON object found in response");
        cleaned = raw;
    }

    const firstBrace = cleaned.indexOf("{");
    let depth = 0;
    let inString = false;
    let escape = false;

    for (let i = firstBrace; i < cleaned.length; i++) {
        const ch = cleaned[i];
        if (escape) { escape = false; continue; }
        if (ch === "\\" && inString) { escape = true; continue; }
        if (ch === '"') { inString = !inString; continue; }
        if (inString) continue;
        if (ch === "{") depth++;
        if (ch === "}") {
            depth--;
            if (depth === 0) return cleaned.slice(firstBrace, i + 1);
        }
    }
    throw new Error("Incomplete JSON object in response (missing closing brace)");
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calls Gemini and parses the response as JSON.
 * Uses bracket-matching extraction to tolerate preamble/trailing text.
 * Auto-retries with exponential backoff on both parse and API errors.
 */
export async function callGeminiJSON<T>(prompt: string): Promise<T> {
    let lastRaw = "";
    const maxRetries = 2;

    const attempt = async (retryCount = 0): Promise<T> => {
        try {
            lastRaw = await callGemini(prompt);
            console.debug(`[Gemini] Attempt ${retryCount + 1} raw response:`, lastRaw.slice(0, 300));
            const jsonStr = extractJSON(lastRaw);
            return JSON.parse(jsonStr) as T;
        } catch (err: any) {
            const isLastAttempt = retryCount >= maxRetries;
            const msg = err instanceof Error ? err.message : String(err);
            const isRateLimit = msg.includes("429") || msg.includes("Too many requests");

            console.error(`[Gemini] Attempt ${retryCount + 1} failed:`, msg);

            if (isLastAttempt) {
                // If it's the last attempt and it's a parse error, give a friendly message
                if (msg.includes("JSON") || msg.includes("brace") || msg.includes("No JSON")) {
                    console.error("[Gemini] Final attempt failed to parse JSON. Raw:", lastRaw);
                    throw new Error("We had trouble reading the AI response. Please try uploading your file again.");
                }
                throw err;
            }

            // Exponential backoff: 2s, 5s... with jitter
            // Wait longer (10s+) for rate limits
            const baseDelay = isRateLimit ? 10000 : 2000;
            const delay = baseDelay * Math.pow(2, retryCount) + Math.random() * 1000;
            
            console.warn(`[Gemini] Retrying in ${Math.round(delay)}ms...`);
            await sleep(delay);
            return attempt(retryCount + 1);
        }
    };

    return attempt();
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
