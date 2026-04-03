import { NextRequest, NextResponse } from "next/server";

import { 
    buildMainReportPrompt, buildLeakagePrompt, 
    getIFRSPrompt, getRatiosPrompt, getComprehensivePrompt 
} from "@/lib/gemini-prompts";
import { extractJSON } from "@/lib/gemini-client";

// Try models in order — fall back if one is unavailable
// Try models in order — fall back if one is unavailable or rate-limited
const GEMINI_MODELS = [
    "gemini-3-flash-preview",
    "gemini-2.5-pro",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-1.5-flash",
    "gemini-pro-latest",
];

const GEN_CONFIG = {
    temperature: 0.1, // Lower temperature for more stable financial data
    topK: 32,
    topP: 1,
    maxOutputTokens: 8192,
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function tryAnthropic(prompt: string, apiKey: string) {
    const endpoint = "https://api.anthropic.com/v1/messages";
    console.log("[gemini-proxy] Trying Anthropic (Claude 4.6) fallback...");
    
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: "claude-sonnet-4.6",
            max_tokens: 4096,
            messages: [
                { role: "user", content: prompt }
            ],
            system: "You are a professional financial analyst. Return raw JSON ONLY. Do not include markdown fences in the output.",
            temperature: 0.1
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(`Anthropic failed: ${JSON.stringify(error)}`);
    }

    const data = await res.json();
    return data.content?.[0]?.text || "";
}

async function tryMoonshot(prompt: string, apiKey: string) {
    // Try both international and China endpoints
    const endpoints = [
        "https://api.moonshot.ai/v1/chat/completions",
        "https://api.moonshot.cn/v1/chat/completions"
    ];

    let lastError = "";
    for (const endpoint of endpoints) {
        try {
            console.log(`[gemini-proxy] Trying Moonshot at ${endpoint}...`);
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

            if (res.ok) {
                const data = await res.json();
                return data.choices?.[0]?.message?.content || "";
            }

            const error = await res.json();
            lastError = JSON.stringify(error);
            console.warn(`[gemini-proxy] Moonshot at ${endpoint} failed: ${lastError}`);
        } catch (err) {
            lastError = err instanceof Error ? err.message : String(err);
            console.error(`[gemini-proxy] Moonshot at ${endpoint} network error: ${lastError}`);
        }
    }
    throw new Error(`All Moonshot endpoints failed: ${lastError}`);
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
    } else if (mode === "comprehensive" && extractedText) {
        finalPrompt = getComprehensivePrompt(extractedText);
    }

    if (!finalPrompt || typeof finalPrompt !== "string") {
        return NextResponse.json({ error: "Missing prompt or extractedText/mode" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const kimiKey = process.env.KIMI_API_KEY; 
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

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
                    
                    // Add cool-off delay after rate limits
                    if (res.status === 429) await delay(1000);
                    
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

    // ── STEP 2: TRY ANTHROPIC FALLBACK ──────────────────────────────────
    if (anthropicKey) {
        try {
            const text = await tryAnthropic(finalPrompt, anthropicKey);
            console.log("[gemini-proxy] Anthropic (Claude) succeeded.");
            return processAIResponse(text, mode);
        } catch (err) {
            console.error("[gemini-proxy] Anthropic failed:", err);
            lastError += ` | Anthropic: ${err instanceof Error ? err.message : String(err)}`;
        }
    }

    // ── STEP 3: TRY KIMI (MOONSHOT) FALLBACK ────────────────────────────
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

    // ── STEP 4: ALL HAVE FAILED ─────────────────────────────────────────
    console.error(`[gemini-proxy] Critical failure: ${lastError}`);
    return NextResponse.json({ 
        error: "Financial analysis engine is currently over capacity. Please try again soon.",
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
