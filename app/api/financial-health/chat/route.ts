import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { question, reportContext, extractedDataSummary } = await req.json();

        if (!question || !reportContext) {
            return NextResponse.json({ error: "Missing question or report context." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key is not configured." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `You are a friendly senior financial advisor analyzing a UAE SME's finances. 
You have already generated a financial health report for this business. 
Answer the user's question in plain English — no jargon, no bullet points unless absolutely needed.
Keep answers under 4 sentences. Be specific to their data.
Use AED as currency. Be honest but encouraging.`,
        });

        const contextPrompt = `
Here is the financial health report I generated for this business:
${JSON.stringify(reportContext, null, 2)}

${extractedDataSummary ? `Additional context from their file:\n${extractedDataSummary.slice(0, 3000)}` : ""}

The business owner is now asking: "${question}"

Answer their question using only the context above.`;

        const result = await model.generateContent(contextPrompt);
        const answer = result.response.text().trim();

        return NextResponse.json({ answer });

    } catch (error: unknown) {
        console.error("Financial health chat error:", error);
        const msg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: `Chat failed: ${msg}` }, { status: 500 });
    }
}
