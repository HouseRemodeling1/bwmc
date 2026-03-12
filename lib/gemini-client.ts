// ─── Direct Gemini API helper (runs 100% in the browser) ──────────────────────

const GEMINI_ENDPOINT = (key: string) =>
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${key}`;

const GEN_CONFIG = {
    temperature: 0.2,
    topK: 32,
    topP: 1,
    maxOutputTokens: 8192,
};

/** Maps HTTP status codes to user-friendly messages */
function statusMessage(status: number): string {
    if (status === 400) return "Something went wrong reading your file. Try uploading a cleaner PDF or Excel version.";
    if (status === 403) return "Your API key seems invalid. Please check and re-enter it.";
    if (status === 429) return "Too many requests. Please wait 30 seconds and try again.";
    return "Gemini is temporarily unavailable. Please try again in a moment.";
}

/**
 * Fires a single content-generation request to Gemini 1.5 Pro.
 * Returns the raw text of the first candidate part.
 * Throws an Error with a user-friendly message on non-200 responses.
 */
export async function callGemini(apiKey: string, prompt: string): Promise<string> {
    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: GEN_CONFIG,
    };

    const res = await fetch(GEMINI_ENDPOINT(apiKey), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(statusMessage(res.status));
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

/**
 * Calls Gemini and parses the response as JSON.
 * - Strips leading/trailing markdown fences (```json ... ```)
 * - Retries once automatically on JSON parse failure
 * Throws "We had trouble reading the AI response. Please try uploading your file again." after 2 failed parses.
 */
export async function callGeminiJSON<T>(apiKey: string, prompt: string): Promise<T> {
    const attempt = async (): Promise<T> => {
        const raw = await callGemini(apiKey, prompt);
        const cleaned = raw
            .replace(/^```json?\s*/i, "")
            .replace(/\s*```\s*$/i, "")
            .trim();
        return JSON.parse(cleaned) as T;
    };

    try {
        return await attempt();
    } catch {
        // One automatic retry
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
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

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
