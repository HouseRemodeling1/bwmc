import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a senior financial analyst with 20 years of experience working with SMEs in the UAE. You are given raw financial data from a small business. Analyze it and return ONLY a valid JSON object with this exact structure — no markdown, no explanation, just the JSON:

{
  "healthScore": 0,
  "subScores": {
    "profitability": 0,
    "cashFlow": 0,
    "costEfficiency": 0,
    "growthTrend": 0
  },
  "summary": "4-5 plain English sentences, no jargon",
  "redFlags": [
    {
      "severity": "critical",
      "title": "string",
      "whyItMatters": "string",
      "whatToDo": "string"
    }
  ],
  "topMoneyDrains": [
    {
      "category": "string",
      "theirPercentage": 0,
      "industryAverage": 0
    }
  ],
  "monthlyTrend": [
    {
      "month": "string",
      "revenue": 0,
      "expenses": 0
    }
  ],
  "vatExposure": {
    "status": "safe",
    "estimatedAnnualRevenue": 0,
    "explanation": "string"
  },
  "cashRunwayMonths": null,
  "recommendations": [
    {
      "title": "string",
      "explanation": "string",
      "difficulty": "Easy"
    }
  ],
  "pointsFromPerfect": 0
}

Rules:
- Be specific to UAE business context. Use AED as currency.
- Keep all text simple enough for a non-accountant to understand.
- healthScore, subScores: numbers 0-100.
- redFlags severity: only "critical" | "warning" | "watch".
- vatExposure status: only "safe" | "approaching" | "exceeded". UAE VAT threshold is AED 375,000/year.
- recommendations difficulty: only "Easy" | "Medium" | "Needs Expert Help".
- cashRunwayMonths: a number or null if data is insufficient.
- monthlyTrend: only include months where data is available. If single month, return array with one entry.
- topMoneyDrains: 3-5 categories max.
- recommendations: exactly 5 items.
- pointsFromPerfect = 100 - healthScore.
- Return ONLY the raw JSON. No text before or after. No markdown code blocks.`;

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const manualData = formData.get("manualData") as string | null;

        let extractedText = "";

        if (file) {
            // Enforce 10MB limit
            if (file.size > 10 * 1024 * 1024) {
                return NextResponse.json({ error: "File size exceeds 10MB limit." }, { status: 400 });
            }

            const fileName = file.name.toLowerCase();
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            if (fileName.endsWith(".pdf")) {
                try {
                    // pdf-parse is CJS — use require() to avoid ESM .default issues
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;
                    const pdfData = await pdfParse(buffer);
                    extractedText = pdfData.text;
                } catch {
                    return NextResponse.json({ error: "Could not read the PDF. Please ensure it contains selectable text (not a scanned image)." }, { status: 400 });
                }
            } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls") || fileName.endsWith(".csv")) {
                try {
                    const XLSX = (await import("xlsx")).default;
                    const workbook = XLSX.read(buffer, { type: "buffer" });
                    const sheets: string[] = [];
                    workbook.SheetNames.forEach((sheetName: string) => {
                        const sheet = workbook.Sheets[sheetName];
                        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                        sheets.push(`Sheet: ${sheetName}\n${JSON.stringify(json)}`);
                    });
                    extractedText = sheets.join("\n\n");
                } catch {
                    return NextResponse.json({ error: "Could not read the spreadsheet file. Please ensure it is a valid Excel or CSV file." }, { status: 400 });
                }
            } else {
                return NextResponse.json({ error: "Unsupported file type. Please upload a PDF, Excel (.xlsx), or CSV file." }, { status: 400 });
            }
        } else if (manualData) {
            extractedText = manualData;
        } else {
            return NextResponse.json({ error: "No file or manual data provided." }, { status: 400 });
        }

        if (!extractedText || extractedText.trim().length < 20) {
            return NextResponse.json({ error: "The file appears to be empty or contains no readable financial data." }, { status: 400 });
        }

        // Truncate if too long (keep within token limits)
        const truncated = extractedText.slice(0, 12000);

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key is not configured." }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        const prompt = `Here is the raw financial data from a UAE business. Analyze it and return the JSON report:\n\n${truncated}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        // Strip any accidental markdown fences
        const cleaned = responseText.replace(/^```json?\s*/i, "").replace(/\s*```\s*$/, "").trim();

        let report;
        try {
            report = JSON.parse(cleaned);
        } catch {
            console.error("Failed to parse AI response:", cleaned.slice(0, 500));
            return NextResponse.json({ error: "The AI could not generate a structured report from this file. Please try a different file or use manual input." }, { status: 422 });
        }

        // discardData is automatic — we never stored extractedText anywhere persistent
        return NextResponse.json({ report });

    } catch (error: unknown) {
        console.error("Financial health API error:", error);
        const msg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: `Analysis failed: ${msg}` }, { status: 500 });
    }
}
