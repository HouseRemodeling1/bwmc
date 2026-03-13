import { NextRequest, NextResponse } from "next/server";

// Try models in order — fall back if one is unavailable
const MODELS = [
    "gemini-2.0-flash",
    "gemini-2.5-pro",
    "gemini-flash-latest",
    "gemini-pro-latest",
];

const GEN_CONFIG = {
    temperature: 0.2,
    topK: 32,
    topP: 1,
    maxOutputTokens: 8192,
};

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
        return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("[gemini-proxy] GEMINI_API_KEY env var is not set!");
        return NextResponse.json({ error: "Gemini API key not configured on server." }, { status: 500 });
    }

    console.log(`[gemini-proxy] Key prefix: ${apiKey.slice(0, 8)}... Prompt chars: ${prompt.length}`);

    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: GEN_CONFIG,
    };

    let lastError = "";

    for (const model of MODELS) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        console.log(`[gemini-proxy] Trying model: ${model}`);

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            // Always read the body so we can log it
            const data = await res.json();

            if (!res.ok) {
                // Extract the real error message from Gemini's response
                const geminiMsg = data?.error?.message || data?.error?.status || JSON.stringify(data).slice(0, 200);
                console.error(`[gemini-proxy] ${model} returned HTTP ${res.status}: ${geminiMsg}`);

                if (res.status === 403) {
                    return NextResponse.json({ error: `API key rejected (403): ${geminiMsg}` }, { status: 403 });
                }
                if (res.status === 429) {
                    // Don't die on 429, try next model!
                    lastError = "Too many requests. Please wait 30 seconds and try again.";
                    continue;
                }
                if (res.status === 400) {
                    return NextResponse.json({ error: `Bad request (400): ${geminiMsg}` }, { status: 400 });
                }

                // For 404 (model not found) or 500, try next model
                lastError = `${model} failed: HTTP ${res.status} — ${geminiMsg}`;
                continue;
            }

            // Safety block
            if (!data?.candidates || data.candidates.length === 0) {
                const blockReason = data?.promptFeedback?.blockReason;
                console.warn(`[gemini-proxy] ${model} blocked. Reason: ${blockReason}`);
                return NextResponse.json({
                    error: blockReason
                        ? `Request blocked by safety filters (${blockReason}).`
                        : "Gemini returned an empty response. Please try again.",
                }, { status: 422 });
            }

            const candidate = data.candidates[0];
            if (candidate?.finishReason === "SAFETY") {
                return NextResponse.json({ error: "Response blocked by safety filters. Please try a different document." }, { status: 422 });
            }

            const text = candidate?.content?.parts?.[0]?.text ?? "";
            if (!text) {
                return NextResponse.json({ error: "Gemini returned an empty response. Please try again." }, { status: 422 });
            }

            console.log(`[gemini-proxy] ${model} succeeded. Response chars: ${text.length}`);
            return NextResponse.json({ text });

        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error(`[gemini-proxy] ${model} network error: ${msg}`);
            lastError = `${model} network error: ${msg}`;
            continue;
        }
    }

    // All models failed
    console.error(`[gemini-proxy] All models failed. Last error: ${lastError}`);
    return NextResponse.json({ error: `All Gemini models failed. Last error: ${lastError}` }, { status: 500 });
}
