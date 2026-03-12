// ─── Gemini prompt builders ─────────────────────────────────────────────────────

export function buildMainReportPrompt(extractedText: string): string {
    return `You are a senior financial analyst with 20 years of experience working with SMEs in the UAE. Analyze the following financial data and return ONLY a valid JSON object. No markdown, no explanation, no backticks. Just raw JSON.

Financial Data:
${extractedText.slice(0, 10000)}

Return this exact JSON structure:
{
  "healthScore": <number 0-100>,
  "subScores": {
    "profitability": <number 0-100>,
    "cashFlow": <number 0-100>,
    "costEfficiency": <number 0-100>,
    "growthTrend": <number 0-100>
  },
  "summary": "<4-5 plain English sentences, no jargon>",
  "redFlags": [
    {
      "severity": "critical|warning|watch",
      "title": "<string>",
      "whyItMatters": "<string>",
      "whatToDo": "<string>"
    }
  ],
  "topMoneyDrains": [
    {
      "category": "<string>",
      "theirPercentage": <number>,
      "industryAverage": <number>
    }
  ],
  "monthlyTrend": [
    {
      "month": "<string>",
      "revenue": <number>,
      "expenses": <number>
    }
  ],
  "vatExposure": {
    "status": "safe|approaching|exceeded",
    "estimatedAnnualRevenue": <number>,
    "explanation": "<string>"
  },
  "cashRunwayMonths": <number or null>,
  "recommendations": [
    {
      "title": "<string>",
      "explanation": "<string>",
      "difficulty": "Easy|Medium|Needs Expert Help"
    }
  ],
  "pointsFromPerfect": <number>
}

Rules:
- Use AED as currency
- UAE SME benchmarks apply
- Write all text for a non-accountant business owner
- Be specific with numbers from the data provided`;
}

export function buildLeakagePrompt(extractedText: string): string {
    return `You are a forensic accountant specializing in UAE SMEs. Analyze the following financial data for profit leakage. Return ONLY raw JSON, no markdown, no backticks.

Financial Data:
${extractedText.slice(0, 10000)}

Return this exact JSON structure:
{
  "waterfallData": [
    { "label": "Total Revenue", "amount": <number>, "percentOfRevenue": 100.0, "type": "revenue" },
    { "label": "Cost of Sales", "amount": <number>, "percentOfRevenue": <number>, "type": "deduction" },
    { "label": "Gross Profit", "amount": <number>, "percentOfRevenue": <number>, "type": "subtotal" },
    { "label": "Operating Costs", "amount": <number>, "percentOfRevenue": <number>, "type": "deduction" },
    { "label": "Staff & Salaries", "amount": <number>, "percentOfRevenue": <number>, "type": "deduction" },
    { "label": "Owner Withdrawal", "amount": <number>, "percentOfRevenue": <number>, "type": "deduction" },
    { "label": "Tax & Compliance", "amount": <number>, "percentOfRevenue": <number>, "type": "deduction" },
    { "label": "Hidden/Other Costs", "amount": <number>, "percentOfRevenue": <number>, "type": "deduction" },
    { "label": "Net Profit", "amount": <number>, "percentOfRevenue": <number>, "type": "profit" }
  ],
  "topLeaks": [
    { "rank": 1, "category": "<string>", "monthlyAmount": <number>, "percentOfRevenue": <number>, "whyItsProblem": "<string>", "industryStandard": "<string>", "severity": "critical|high|medium" },
    { "rank": 2, "category": "<string>", "monthlyAmount": <number>, "percentOfRevenue": <number>, "whyItsProblem": "<string>", "industryStandard": "<string>", "severity": "critical|high|medium" },
    { "rank": 3, "category": "<string>", "monthlyAmount": <number>, "percentOfRevenue": <number>, "whyItsProblem": "<string>", "industryStandard": "<string>", "severity": "critical|high|medium" }
  ],
  "benchmarks": [
    { "metric": "Gross Margin", "yourValue": <number>, "uaeAverage": <number>, "healthyTarget": <number> },
    { "metric": "Net Margin", "yourValue": <number>, "uaeAverage": <number>, "healthyTarget": <number> },
    { "metric": "Operating Expense Ratio", "yourValue": <number>, "uaeAverage": <number>, "healthyTarget": <number> },
    { "metric": "Salary Ratio", "yourValue": <number>, "uaeAverage": <number>, "healthyTarget": <number> },
    { "metric": "Owner Withdrawal Ratio", "yourValue": <number>, "uaeAverage": <number>, "healthyTarget": <number> }
  ],
  "benchmarkInsight": "<one bold sentence comparing net margin to UAE average with AED monthly impact>",
  "recoveryOpportunity": {
    "totalMonthly": <number>,
    "totalAnnual": <number>,
    "breakdown": [
      { "leak": "<string>", "monthlyRecovery": <number> },
      { "leak": "<string>", "monthlyRecovery": <number> },
      { "leak": "<string>", "monthlyRecovery": <number> }
    ]
  },
  "roadmap": {
    "month1": [
      { "action": "<specific action>", "type": "DIY|Needs Help" },
      { "action": "<specific action>", "type": "DIY|Needs Help" }
    ],
    "month2": [
      { "action": "<specific action>", "type": "DIY|Needs Help" },
      { "action": "<specific action>", "type": "DIY|Needs Help" }
    ],
    "month3": [
      { "action": "<specific action>", "type": "DIY|Needs Help" },
      { "action": "<specific action>", "type": "DIY|Needs Help" }
    ]
  }
}

Rules:
- UAE SME benchmarks: net margin 10-15%, gross margin 30-50%, salary ratio max 30%, operating expense max 25%
- Use AED as currency
- Be specific to their actual numbers
- Write for a non-accountant`;
}

export function buildSimulatorPrompt(
    extractedText: string,
    reportJSON: object,
    sliders: {
        revenueGrowth: number;
        expenseReduction: number;
        salaryChange: number;
        oneTimeCost: number;
        collectionDays: number;
        ownerWithdrawal: number;
    }
): string {
    return `You are a UAE-based financial advisor. A small business owner has modeled a financial scenario using a simulator. Return ONLY raw JSON, no markdown, no backticks.

Original financial data:
${extractedText.slice(0, 4000)}

Original report summary:
${JSON.stringify(reportJSON).slice(0, 2000)}

Simulator scenario settings:
- Revenue change: +${sliders.revenueGrowth}%
- Expense change: -${sliders.expenseReduction}%
- Salary change: ${sliders.salaryChange >= 0 ? "+" : ""}${sliders.salaryChange}%
- One-time cost: AED ${sliders.oneTimeCost.toLocaleString()}
- Payment collection faster by: ${sliders.collectionDays} days
- Owner withdrawal reduction: -${sliders.ownerWithdrawal}%

Return this exact JSON structure:
{
  "verdict": "positive|risky|neutral",
  "headline": "<bold one-line summary>",
  "explanation": "<3-4 plain English sentences>",
  "biggestRisk": "<one sentence>",
  "biggestOpportunity": "<one sentence>",
  "recommendation": "<one actionable sentence>"
}

Be direct and honest. Do not sugarcoat bad scenarios. Use AED as currency.`;
}

export function buildChatPrompt(
    extractedText: string,
    reportJSON: object,
    question: string
): string {
    return `You are a friendly UAE financial advisor helping a small business owner understand their financial report. Answer their question in plain English with no jargon. Be concise (3-5 sentences max). Use AED as currency.

Their financial data:
${extractedText.slice(0, 4000)}

Their full report:
${JSON.stringify(reportJSON).slice(0, 2000)}

Their question:
${question}

Reply conversationally as if talking to a non-accountant. If you reference numbers, always use AED format.`;
}
