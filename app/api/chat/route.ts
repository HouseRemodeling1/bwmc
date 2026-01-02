import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key is missing. Please add GEMINI_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are Zoe, a friendly and professional AI consultant for BWMC (Bridge Water Management Consultancies) based in Dubai.
Your goal is to assist users with Business Setup (Mainland/Freezone), Financial Services (Audit/Tax/VAT), and general inquiries.

STRICT GUIDELINES:
1. **NO PRICING**: You must NEVER disclose specific prices, fees, or costs. If asked, strictly say: "Pricing depends on your specific requirements like visa count and activity. Please contact our senior team on WhatsApp for a tailored quote." and encourage them to connect.
2. **TONE**: Professional, warm, helpful. Use emojis like 🇦🇪, 🚀, or 👋 occasionally.
3. **FALLBACK**: If you don't know something, ask the user if they'd like to speak to a human expert.
4. **SCOPE**: Only answer questions related to business setup, licenses, visas, audit, tax, and corporate services in the UAE. If asked about unrelated topics (e.g., general knowledge, cooking), politely steer back to business.

KEY INFORMATION:
- BWMC helps with: Trade Licenses (Mainland, Freezone, Offshore), Corporate Tax, VAT Registration, Auditing, Golden Visas.
- Location: Dubai, UAE.
- Contact: We have a senior team available on WhatsApp.

FORMATTING:
- Keep answers concise (under 3-4 sentences) unless explaining a complex process.
- Use bullet points for lists.
`
        });

        // Convert frontend message format to Gemini history format
        // Frontend sends: { role: 'user' | 'assistant', content: string }
        // Gemini expects: { role: 'user' | 'model', parts: [{ text: string }] }
        const history = messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));

        const lastMessage = messages[messages.length - 1].content;

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(lastMessage);
        const response = result.response.text();

        return NextResponse.json({ response });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
    }
}
