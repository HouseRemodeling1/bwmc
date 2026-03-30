import { NextRequest, NextResponse } from "next/server";

import { buildMainReportPrompt, getIFRSPrompt, getRatiosPrompt } from "@/lib/gemini-prompts";
import { extractJSON } from "@/lib/gemini-client";

// Try models in order — fall back if one is unavailable
// Try models in order — fall back if one is unavailable or rate-limited
const GEMINI_MODELS = [
    "gemini-2.0-flash",
    "gemini-1.5-flash-002",
    "gemini-1.5-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro-002",
    "gemini-1.5-pro",
    "gemini-pro-latest",
];

const GEN_CONFIG = {
    temperature: 0.1, // Lower temperature for more stable financial data
    topK: 32,
    topP: 1,
    maxOutputTokens: 8192,
};

async function tryMoonshot(prompt: string, apiKey: string) {
    const endpoint = "https://api.moonshot.cn/v1/chat/completions";
    console.log("[gemini-proxy] Trying Moonshot AI (Kimi) fallback...");
    
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "moonshot-v1-32k",
            messages: [
                { role: "system", content: "You are a professional financial analyst. Return raw JSON ONLY." },
                { role: "user", content: prompt }
            ],
            temperature: 0.2
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(`Moonshot failed: ${JSON.stringify(error)}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
}

export async function POST(req: NextRequest) {
    const { prompt: oldPrompt, extractedText, mode } = await req.json();

    let finalPrompt = oldPrompt;

    if (mode === "ifrs" && extractedText) {
        finalPrompt = getIFRSPrompt(extractedText);
    } else if (mode === "ratios" && extractedText) {
        finalPrompt = getRatiosPrompt(extractedText);
    } else if (mode === "health" && extractedText) {
        finalPrompt = buildMainReportPrompt(extractedText);
    }

    if (!finalPrompt || typeof finalPrompt !== "string") {
        return NextResponse.json({ error: "Missing prompt or extractedText/mode" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const kimiKey = process.env.KIMI_API_KEY; // Optional backup

    let lastError = "";

    // ── STEP 1: TRY GEMINI FALLBACK CHAIN ───────────────────────────────
    if (geminiKey) {
        for (const model of GEMINI_MODELS) {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
            console.log(`[gemini-proxy] Trying Gemini: ${model}`);

            try {
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: finalPrompt }] }],
                        generationConfig: GEN_CONFIG,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    const msg = data?.error?.message || data?.error?.status || `HTTP ${res.status}`;
                    console.error(`[gemini-proxy] ${model} failed (${res.status}): ${msg}`);
                    lastError = `Gemini ${model}: ${msg}`;
                    
                    // Don't retry on fatal input errors (400)
                    if (res.status === 400) break;
                    continue;
                }

                const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
                if (!text) {
                    lastError = `${model} returned empty response`;
                    continue;
                }

                return processAIResponse(text, mode);

            } catch (err) {
                lastError = err instanceof Error ? err.message : String(err);
                console.error(`[gemini-proxy] ${model} network error: ${lastError}`);
                continue;
            }
        }
    }

    // ── STEP 2: TRY KIMI (MOONSHOT) FALLBACK ────────────────────────────
    if (kimiKey) {
        try {
            const text = await tryMoonshot(finalPrompt, kimiKey);
            console.log("[gemini-proxy] Moonshot AI succeeded.");
            return processAIResponse(text, mode);
        } catch (err) {
            console.error("[gemini-proxy] Moonshot failed:", err);
            lastError += ` | Moonshot: ${err instanceof Error ? err.message : String(err)}`;
        }
    }

    // ── STEP 3: ALL HAVE FAILED ─────────────────────────────────────────
    console.error(`[gemini-proxy] Critical failure: ${lastError}`);
    return NextResponse.json({ 
        error: "Financial analysis engine is currently over capacity. Please try again in 1-2 minutes.",
        details: lastError 
    }, { status: 503 });
}

/** Centralized AI response processor to handle JSON extraction and formatting */
function processAIResponse(text: string, mode?: string) {
    if (!mode) {
        return NextResponse.json({ text });
    }

    try {
        const jsonStr = extractJSON(text);
        const report = JSON.parse(jsonStr);
        return NextResponse.json({ mode: mode as any, report });
    } catch (parseErr) {
        console.error("[gemini-proxy] JSON Parse Error:", parseErr, "Raw text:", text.slice(0, 200));
        return NextResponse.json({ 
            error: "We had trouble reading the AI response. Please try again.",
            raw: text.slice(0, 100)
        }, { status: 500 });
    }
}
