import { NextRequest, NextResponse } from "next/server";

/**
 * Thin proxy for Gemini API calls.
 * The browser cannot call generativelanguage.googleapis.com directly due to CORS.
 * This route forwards the prompt to Gemini and returns the text response.
 * The API key stays server-side and is never exposed to the browser.
 */
export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
        return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("[gemini-proxy] GEMINI_API_KEY is not set in environment variables!");
        return NextResponse.json({ error: "Gemini API key not configured on server." }, { status: 500 });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.2,
            topK: 32,
            topP: 1,
            maxOutputTokens: 8192,
        },
    };

    console.log(`[gemini-proxy] Calling Gemini 1.5 Flash. Key prefix: ${apiKey.slice(0, 8)}... Prompt length: ${prompt.length}`);

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            const msg =
                res.status === 400 ? "Something went wrong reading your file. Try uploading a cleaner PDF or Excel version." :
                res.status === 403 ? "API key is invalid or not authorised. Please contact support." :
                res.status === 429 ? "Too many requests. Please wait 30 seconds and try again." :
                "Gemini is temporarily unavailable. Please try again in a moment.";
            return NextResponse.json({ error: msg }, { status: res.status });
        }

        // Check for safety blocks
        if (!data?.candidates || data.candidates.length === 0) {
            const blockReason = data?.promptFeedback?.blockReason;
            return NextResponse.json({
                error: blockReason
                    ? `Request blocked by safety filters (${blockReason}).`
                    : "Gemini returned an empty response. Please try again.",
            }, { status: 422 });
        }

        const candidate = data.candidates[0];
        const finishReason = candidate?.finishReason;

        if (finishReason === "SAFETY") {
            return NextResponse.json({ error: "Response blocked by safety filters. Please try a different document." }, { status: 422 });
        }

        const text = candidate?.content?.parts?.[0]?.text ?? "";
        if (!text) {
            return NextResponse.json({ error: "Gemini returned an empty response. Please try again." }, { status: 422 });
        }

        return NextResponse.json({ text });
    } catch (err) {
        console.error("[gemini-proxy] fetch error:", err);
        return NextResponse.json({ error: "Failed to reach Gemini API. Please try again." }, { status: 500 });
    }
}
