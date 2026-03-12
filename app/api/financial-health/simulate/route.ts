import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a UAE-based financial advisor. A small business owner has used a simulator to model a financial scenario. Based on their current financials and the scenario they have set, give them a short, honest, plain-English analysis.

Return ONLY a valid JSON object — no markdown, no explanation:
{
  "verdict": "positive" | "risky" | "neutral",
  "headline": "one bold sentence summarizing the scenario outcome",
  "explanation": "3-4 sentences, plain English, no jargon",
  "biggestRisk": "one sentence",
  "biggestOpportunity": "one sentence",
  "recommendation": "one clear action they should take"
}

Be direct. Be honest. Do not sugarcoat bad scenarios.
Use AED as currency. Keep it simple for a non-accountant.`;

export async function POST(req: Request) {
    try {
        const { report, sliders, simulatedMetrics, extractedSummary } = await req.json();

        if (!report || !sliders) {
            return NextResponse.json({ error: "Missing required data." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key is not configured." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        const prompt = `Here is the current financial health report for this business:
Health Score: ${report.healthScore}/100
${JSON.stringify(report, null, 2).slice(0, 2000)}

${extractedSummary ? `Additional context: ${extractedSummary.slice(0, 1000)}` : ""}

The business owner has set the following scenario in the simulator:
- Revenue Growth: ${sliders.revenueGrowth > 0 ? "+" : ""}${sliders.revenueGrowth}%
- Expense Reduction: -${sliders.expenseReduction}%
- Salary/Staff Cost Change: ${sliders.salaryChange > 0 ? "+" : ""}${sliders.salaryChange}%
- New One-Time Cost: AED ${sliders.oneTimeCost.toLocaleString()}
- Payment Collection Speed Improvement: ${sliders.collectionDays} days faster
- Owner Withdrawal Reduction: -${sliders.ownerWithdrawal}%

Simulated Results:
- New Health Score: ${simulatedMetrics.healthScore}/100 (was ${report.healthScore})
- Delta: ${simulatedMetrics.healthScore >= report.healthScore ? "+" : ""}${simulatedMetrics.healthScore - report.healthScore} points
- Projected Monthly Profit: AED ${simulatedMetrics.monthlyProfit.toLocaleString()}
- Projected Cash Runway: ${simulatedMetrics.cashRunway !== null ? simulatedMetrics.cashRunway + " months" : "Unknown"}
- VAT Status: ${simulatedMetrics.vatStatus}

Analyze this scenario and return JSON.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        const cleaned = responseText.replace(/^```json?\s*/i, "").replace(/\s*```\s*$/, "").trim();

        let verdict;
        try {
            verdict = JSON.parse(cleaned);
        } catch {
            return NextResponse.json({ error: "Could not generate scenario analysis. Please try again." }, { status: 422 });
        }

        return NextResponse.json({ verdict });

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: `Simulation failed: ${msg}` }, { status: 500 });
    }
}
