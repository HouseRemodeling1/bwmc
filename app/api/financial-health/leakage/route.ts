import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a forensic accountant and profit optimization specialist with deep knowledge of UAE SME benchmarks. You have been given the financial data of a small business in the UAE. Your job is to produce a detailed profit leakage analysis.

Return ONLY a valid JSON object with no markdown, no explanation, just the JSON:

{
  "waterfallData": [
    {
      "label": "string",
      "amount": 0,
      "percentOfRevenue": 0.0,
      "type": "revenue"
    }
  ],
  "topLeaks": [
    {
      "rank": 1,
      "category": "string",
      "monthlyAmount": 0,
      "percentOfRevenue": 0.0,
      "whyItsProblem": "string",
      "industryStandard": "string",
      "severity": "critical"
    }
  ],
  "benchmarks": [
    {
      "metric": "string",
      "yourValue": 0.0,
      "uaeAverage": 0.0,
      "healthyTarget": 0.0
    }
  ],
  "benchmarkInsight": "string",
  "recoveryOpportunity": {
    "totalMonthly": 0,
    "totalAnnual": 0,
    "breakdown": [
      {
        "leak": "string",
        "monthlyRecovery": 0
      }
    ]
  },
  "roadmap": {
    "month1": [
      { "action": "string", "type": "DIY" }
    ],
    "month2": [
      { "action": "string", "type": "DIY" }
    ],
    "month3": [
      { "action": "string", "type": "Needs Help" }
    ]
  }
}

Rules:
- Use AED as currency
- UAE SME benchmarks: net margin 10-15%, gross margin 30-50%, salary ratio max 30%, operating expense max 25%
- waterfallData: always include these rows in order: Total Revenue (type='revenue'), Cost of Sales (type='deduction'), Gross Profit (type='subtotal'), Operating Costs (type='deduction'), Staff & Salaries (type='deduction'), Owner Withdrawal (type='deduction'), Tax & Compliance (type='deduction'), Hidden/Other Costs (type='deduction'), Net Profit (type='profit')
- topLeaks: exactly 3 items, rank 1/2/3, severity only 'critical'|'high'|'medium'
- benchmarks: exactly 5 rows — Gross Margin, Net Margin, Operating Expense Ratio, Salary Ratio, Owner Withdrawal Ratio
- benchmarkInsight: one bold sentence comparing their net margin to UAE average with AED monthly impact
- roadmap: each month has exactly 2-3 actions, type only 'DIY'|'Needs Help'
- Be specific with numbers — no ranges, give exact AED figures
- Roadmap actions must be specific to their actual leaks, not generic advice
- Write all text for a non-accountant business owner
- percentOfRevenue values should be to 1 decimal place
- All amounts must be realistic monthly AED values`;

export async function POST(req: Request) {
    try {
        const { report, extractedSummary } = await req.json();

        if (!report) {
            return NextResponse.json({ error: "Missing report data." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key is not configured." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        const prompt = `Here is the financial health report for a UAE business:
${JSON.stringify(report, null, 2).slice(0, 3000)}

${extractedSummary ? `Additional financial data context:\n${extractedSummary.slice(0, 2000)}` : ""}

Produce a detailed profit leakage analysis. Return only the JSON object.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        const cleaned = responseText.replace(/^```json?\s*/i, "").replace(/\s*```\s*$/, "").trim();

        let leakage;
        try {
            leakage = JSON.parse(cleaned);
        } catch {
            console.error("Leakage parse error:", cleaned.slice(0, 500));
            return NextResponse.json({ error: "Could not generate profit leakage report from the available data." }, { status: 422 });
        }

        return NextResponse.json({ leakage });

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: `Leakage analysis failed: ${msg}` }, { status: 500 });
    }
}
