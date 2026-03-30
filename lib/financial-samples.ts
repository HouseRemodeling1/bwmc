import { FinancialReport, IFRSReport, RatiosReport } from "@/app/financial-health-check/financial-types";

export const SAMPLE_REPORT: FinancialReport = {
    reportMeta: {
        companyName: "Nova Trading LLC",
        periodAnalyzed: "January – August 2024",
        dataConfidence: "High",
        confidenceReason: "8 months of complete data",
        reportDate: "September 2024",
        analystNote: "Strong revenue growth but profit is being heavily eroded by three controllable cost categories."
    },
    executiveSummary: {
        grade: "C",
        gradeReason: "Revenue healthy but margin critically below sector average",
        headline: "You are generating AED 185,000 monthly but keeping only AED 14,800 of it",
        narrative: "Nova Trading has demonstrated consistent revenue growth of 12% across the analysis period, which is a genuine strength in the current UAE trading environment. However, the business is retaining just 8% of every dirham earned — against a sector average of 15% — meaning the growth is largely benefiting costs rather than the owner. The primary threat is a compounding cost structure where salaries, owner withdrawals and marketing have expanded faster than revenue in each consecutive quarter. Addressing the top three cost leaks identified in this report could recover AED 28,400 per month without touching revenue at all."
    },
    healthScore: {
        overall: 61,
        grade: "C",
        subScores: {
            profitability: { score: 48, label: "Below Average", commentary: "Net margin of 8% sits 7 points below the UAE trading sector average of 15%. Gross margin is healthy at 40% — the problem is operational cost absorption between gross and net." },
            cashFlow: { score: 65, label: "Moderate", commentary: "Cash generation is positive but thinning month on month as cost commitments grow. At current trajectory runway pressure will emerge within 2 quarters." },
            costEfficiency: { score: 52, label: "Needs Attention", commentary: "Three cost lines are running above sector benchmarks simultaneously — salary ratio, owner withdrawals and marketing — a combination that compounds margin pressure." },
            growthTrend: { score: 74, label: "Positive", commentary: "Revenue grew consistently from AED 142,000 in January to AED 185,000 in August — a 30% improvement over 8 months that signals real market traction." }
        }
    },
    financialPerformance: {
        narrative: "Nova Trading is at a critical inflection point. While top-line growth is impressive, the 'bridge' between gross and net profit is collapsing under the weight of escalating operational overheads.",
        keyMetrics: [
            { metric: "Monthly Revenue", value: "AED 185,000", benchmark: "AED 160,000", status: "healthy", gap: "+15%" },
            { metric: "Net Profit Margin", value: "8.0%", benchmark: "15.0%", status: "critical", gap: "-7%" },
            { metric: "OPEX Ratio", value: "32.0%", benchmark: "25.0%", status: "watch", gap: "+7%" },
            { metric: "Gross Margin", value: "60.0%", benchmark: "55.0%", status: "healthy", gap: "+5%" }
        ],
        marginBridge: {
            narrative: "Your strong 60% gross margin is being consumed by a 52% operating cost load, leaving only 8% at the bottom. The leak is occurring post-gross profit."
        }
    },
    costIntelligence: {
        narrative: "Analysis identifies three primary zones of cost inflation that are decoupled from revenue growth.",
        costBreakdown: [
            { category: "Salaries & Staff", amount: 45000, percentOfRevenue: 24.3, benchmark: 21, status: "watch", commentary: "Staff costs expanded mid-year without revenue offset." },
            { category: "Marketing & Ads", amount: 16000, percentOfRevenue: 8.6, benchmark: 5, status: "critical", commentary: "Spend has doubled with unclear attribution." },
            { category: "Owner Withdrawals", amount: 30000, percentOfRevenue: 16.2, benchmark: 11, status: "critical", commentary: "Largest controllable leak in the business." }
        ],
        hiddenCosts: []
    },
    profitLeakage: {
        narrative: "Nova Trading is generating a healthy gross profit of AED 111,000 per month — but by the time operational costs, salaries and owner withdrawals are accounted for, only AED 14,800 remains. This is not a revenue problem. The business is winning customers and growing its top line. The issue is entirely on the cost side, where three categories have expanded beyond sector norms and are collectively absorbing AED 28,400 per month more than they should.",
        waterfallData: [
            { label: "Total Revenue", amount: 185000, percentOfRevenue: 100, type: "revenue" },
            { label: "Cost of Sales", amount: -74000, percentOfRevenue: 40, type: "deduction" },
            { label: "Gross Profit", amount: 111000, percentOfRevenue: 60, type: "subtotal" },
            { label: "Salaries & Staff", amount: -45000, percentOfRevenue: 24.3, type: "deduction" },
            { label: "Operations & Rent", amount: -18000, percentOfRevenue: 9.7, type: "deduction" },
            { label: "Marketing & Ads", amount: -16000, percentOfRevenue: 8.6, type: "deduction" },
            { label: "Owner Withdrawals", amount: -30000, percentOfRevenue: 16.2, type: "deduction" },
            { label: "Other Costs", amount: -7200, percentOfRevenue: 3.9, type: "deduction" },
            { label: "Net Profit", amount: 14800, percentOfRevenue: 8, type: "profit" }
        ],
        topLeaks: [
            { rank: 1, category: "Owner Withdrawals", monthlyAmount: 30000, percentOfRevenue: 16.2, cfoInsight: "At 16.2% of revenue, owner withdrawals are the single largest controllable cost leak. Sector benchmark is 10-12% — bringing this in line would recover AED 7,800 per month immediately.", industryBenchmark: "10-12% of revenue", severity: "critical" },
            { rank: 2, category: "Marketing Spend", monthlyAmount: 16000, percentOfRevenue: 8.6, cfoInsight: "Marketing is running at 8.6% of revenue against a sector average of 5%. Without a clear cost-per-acquisition metric, this spend is uncontrolled. Optimising to benchmark recovers AED 6,700 per month.", industryBenchmark: "5% of revenue", severity: "high" },
            { rank: 3, category: "Salary Ratio", monthlyAmount: 45000, percentOfRevenue: 24.3, cfoInsight: "Staff costs at 24.3% are approaching the 25% warning threshold. The mid-year salary increase has not yet translated into proportional revenue growth — this needs a 90-day performance review.", industryBenchmark: "20-22% of revenue", severity: "high" }
        ],
        recoveryOpportunity: {
            monthlyAED: 28400,
            annualAED: 340800,
            narrative: "Bringing the three identified cost leaks to sector benchmarks would recover AED 28,400 per month — without acquiring a single new customer or changing the pricing structure. Annualised, this represents AED 340,800 in additional retained profit.",
            breakdown: [
                { leak: "Owner Withdrawals", monthlyRecovery: 7800 },
                { leak: "Marketing Optimization", monthlyRecovery: 6700 },
                { leak: "Salary Efficiency", monthlyRecovery: 13900 }
            ]
        }
    },
    riskAssessment: {
        narrative: "The business faces immediate regulatory and liquidity risks that must be addressed to protect the growth achieved to date.",
        redFlags: [
            {
                severity: "critical",
                title: "Owner withdrawals at 16% of revenue",
                cfoObservation: "Owner withdrawals totalled AED 202,000 over 8 months — consuming 16% of total revenue against a recommended ceiling of 15%. This is the single largest controllable leak in the business.",
                consequence: "At current withdrawal rates, the business cannot build a meaningful cash reserve — leaving it vulnerable to any unexpected cost or revenue dip.",
                immediateAction: "Cap monthly owner withdrawals at AED 22,000 until net margin exceeds 12%."
            },
            {
                severity: "warning",
                title: "Marketing costs doubled in 8 months",
                cfoObservation: "Marketing spend grew from AED 8,500 in January to AED 16,000 in August — an 88% increase — while revenue grew 30% in the same period. The return on this spend is not yet justified by revenue acceleration.",
                consequence: "Unchecked marketing inflation will push the operating expense ratio above 30% within two quarters.",
                immediateAction: "Require a cost-per-acquisition calculation before approving any further marketing budget increases."
            },
            {
                severity: "warning",
                title: "Salary costs jumped 18% mid-year",
                cfoObservation: "Staff costs increased from AED 38,000 to AED 45,000 between April and May — an 18% jump — with no corresponding revenue spike in the same period.",
                consequence: "If the new headcount does not generate measurable revenue uplift within 90 days, the salary ratio will permanently compress margins.",
                immediateAction: "Set a 90-day revenue target for the expanded team and review in October."
            }
        ],
        vatExposure: {
            status: "exceeded",
            estimatedAnnualRevenue: 1924000,
            threshold: 375000,
            narrative: "Nova Trading's annualised revenue of approximately AED 1.92M significantly exceeds the UAE VAT registration threshold of AED 375,000. VAT registration is mandatory and non-compliance carries substantial penalties from the FTA."
        },
        corporateTaxExposure: {
            status: "approaching",
            threshold: 375000,
            rate: "9%",
            narrative: "With profits projected over AED 375k annually, corporate tax planning is required."
        },
        cashRunway: {
            months: 4,
            narrative: "At the current net profit level of AED 14,800 per month against fixed monthly commitments of AED 121,000, the business has approximately 4 months of runway if revenue were to stop. This is below the recommended minimum of 6 months."
        }
    },
    advancedMetrics: {
        workingCapitalRatio: {
            value: 1.2,
            benchmark: 1.5,
            status: "watch",
            narrative: "Working capital is slightly tight, limiting reinvestment capability."
        },
        operatingLeverage: {
            value: "Medium",
            narrative: "Fixed costs are significant, meaning profits will accelerate quickly once the cost leaks are plugged."
        },
        revenueQualityScore: {
            score: 75,
            recurringVsOneOff: "Mixed",
            concentration: "Low",
            narrative: "Revenue is well-distributed but lacks a high percentage of recurring contracts."
        },
        seasonalityDetected: true,
        seasonalityNarrative: "Slight uptick in Q2 trading observed."
    },
    strategicRecommendations: [
        { priority: 1, title: "Cap owner withdrawals immediately", cfoRationale: "This is the fastest and most impactful action available. Reducing monthly withdrawals from AED 30,000 to AED 22,000 recovers AED 7,800 per month with zero operational disruption.", specificAction: "Set a standing instruction to limit owner withdrawal to AED 22,000 per month starting next month. Review after 3 months.", expectedImpact: "AED 7,800/month recovered — net margin improves from 8% to 12%", timeframe: "This week", effort: "Low", impact: "High" },
        { priority: 2, title: "Audit marketing spend ROI", cfoRationale: "Marketing doubled in 8 months with no clear revenue attribution. Before spending another dirham, establish what each AED is returning.", specificAction: "List every active marketing channel. Calculate revenue attributed to each. Cut any channel that cannot demonstrate a return within 60 days.", expectedImpact: "AED 4,000–6,700/month recovered", timeframe: "This month", effort: "Medium", impact: "High" },
        { priority: 3, title: "Register for VAT immediately", cfoRationale: "With annualised revenue of AED 1.92M, VAT registration is not optional. FTA penalties for late registration can reach AED 20,000.", specificAction: "Contact a UAE VAT consultant this week and begin the FTA registration process. Deadline is immediate.", expectedImpact: "Avoids penalties of AED 10,000–20,000", timeframe: "This week", effort: "Low", impact: "High" },
        { priority: 4, title: "Set 90-day revenue targets for new hires", cfoRationale: "The salary increase in April added AED 7,000/month in fixed costs. These hires need to demonstrably contribute to revenue growth.", specificAction: "Assign each new team member a measurable revenue or efficiency target. Review performance in October.", expectedImpact: "Protects AED 7,000/month in salary investment", timeframe: "This month", effort: "Low", impact: "Medium" },
        { priority: 5, title: "Build a 6-month cash reserve", cfoRationale: "Current runway of 4 months is below the recommended minimum. One slow month could create serious liquidity pressure.", specificAction: "Ring-fence AED 10,000 per month into a separate business reserve account until 6 months of operating costs are covered.", expectedImpact: "Eliminates liquidity risk within 6 months", timeframe: "Next 90 days", effort: "Low", impact: "High" }
    ],
    actionPlan: {
        narrative: "Focus on cost containment in Month 1 to stabilize margin, followed by efficiency audits in Month 2.",
        month1: [
            { action: "Cap owner withdrawals at AED 22k", type: "DIY", why: "Stops the largest cash leak immediately." },
            { action: "Initiate VAT registration", type: "Needs Expert Help", why: "Mandatory compliance requirement." }
        ],
        month2: [
            { action: "Perform marketing ROI audit", type: "DIY", why: "Identifies non-performing spend." },
            { action: "Review staff productivity vs targets", type: "DIY", why: "Ensures mid-year hires are ROI positive." }
        ],
        month3: [
            { action: "Review Q3 financial performance", type: "Needs Expert Help", why: "Verify effectiveness of cost controls." }
        ]
    },
    closingStatement: {
        narrative: "Nova Trading is a genuinely growing business with real market traction — but it is leaving AED 28,400 on the table every single month through three controllable cost leaks. The priority is not more revenue — it is keeping more of the revenue already being earned. Act on the top three recommendations this month and this business will look materially different by year end.",
        pointsFromPerfect: 39,
        potentialScore: 78,
        signOff: "This report was prepared by FinSight AI, BWMC's proprietary financial intelligence engine. For a personal advisory session contact BWMC."
    }
};

export const SAMPLE_IFRS_REPORT: IFRSReport = {
    balanceCheck: {
        totalDebits: 1250000,
        totalCredits: 1250000,
        isBalanced: true,
        discrepancy: 0
    },
    classification: {
        assets: [
            { accountName: "Cash & Cash Equivalents", amount: 80000, ifrsCategory: "Current Assets", ifrsStandard: "IAS 7", notes: "Verified bank balance" },
            { accountName: "Trade Receivables", amount: 150000, ifrsCategory: "Current Assets", ifrsStandard: "IFRS 9", notes: "Gross value before ECL" },
            { accountName: "Inventory", amount: 220000, ifrsCategory: "Current Assets", ifrsStandard: "IAS 2", notes: "Lower of cost or NRV" },
            { accountName: "Property, Plant & Equipment", amount: 300000, ifrsCategory: "Non-current Assets", ifrsStandard: "IAS 16", notes: "Net book value" }
        ],
        liabilities: [
            { accountName: "Trade Payables", amount: 120000, ifrsCategory: "Current Liabilities", ifrsStandard: "IFRS 9", notes: "Standard credit terms" },
            { accountName: "VAT Payable", amount: 45000, ifrsCategory: "Current Liabilities", ifrsStandard: "IAS 37", notes: "Q3 Estimate" },
            { accountName: "Long-term Bank Loan", amount: 200000, ifrsCategory: "Non-current Liabilities", ifrsStandard: "IFRS 9", notes: "Secured loan" }
        ],
        equity: [
            { accountName: "Share Capital", amount: 100000, ifrsCategory: "Equity", ifrsStandard: "IAS 1", notes: "1,000 shares at 100 AED" },
            { accountName: "Retained Earnings", amount: 285000, ifrsCategory: "Equity", ifrsStandard: "IAS 1", notes: "Accumulated profits" }
        ],
        revenue: [
            { accountName: "Sales Revenue", amount: 450000, ifrsCategory: "Revenue", ifrsStandard: "IFRS 15", notes: "Recognized at point of sale" }
        ],
        expenses: [
            { accountName: "Cost of Goods Sold", amount: 180000, ifrsCategory: "Expenses", ifrsStandard: "IAS 2", notes: "Direct costs" },
            { accountName: "Salaries & Benefits", amount: 120000, ifrsCategory: "Expenses", ifrsStandard: "IAS 19", notes: "Staff costs" },
            { accountName: "Rent expense", amount: 60000, ifrsCategory: "Expenses", ifrsStandard: "IFRS 16", notes: "Operating lease" }
        ]
    },
    generatedPL: {
        revenue: 450000,
        costOfSales: 180000,
        grossProfit: 270000,
        operatingExpenses: 180000,
        ebit: 90000,
        netProfit: 90000
    },
    generatedBalanceSheet: {
        totalAssets: 750000,
        totalLiabilities: 365000,
        totalEquity: 385000,
        isBalanced: true
    },
    complianceFlags: [
        {
            severity: "critical",
            standard: "IFRS 16",
            issue: "Lease recognized as simple expense instead of Right-of-Use (ROU) asset.",
            affectedAccounts: ["Rent expense", "Lease Liability", "ROU Asset"],
            recommendation: "Calculate present value of future lease payments and recognize as ROU Asset and corresponding Liability."
        },
        {
            severity: "warning",
            standard: "IFRS 9",
            issue: "Lack of Expected Credit Loss (ECL) provision for Trade Receivables.",
            affectedAccounts: ["Trade Receivables", "Bad Debt Expense"],
            recommendation: "Implement an ECL matrix based on historical aging to comply with IFRS 9 impairment requirements."
        },
        {
            severity: "info",
            standard: "IAS 16",
            issue: "Straight-line depreciation consistency check.",
            affectedAccounts: ["PPE", "Accumulated Depreciation"],
            recommendation: "Ensure residual value and useful life estimates are reviewed annually."
        }
    ],
    summary: {
        overallComplianceScore: 78,
        criticalIssues: 1,
        warnings: 1,
        keyFindings: [
            "Trial balance is mathematically balanced.",
            "Mandatory IFRS 16 transition needed for office lease.",
            "Inventory valuation follows IAS 2 guidelines correctly."
        ]
    }
};

export const SAMPLE_RATIOS_REPORT: RatiosReport = {
    liquidity: {
        currentRatio: 1.8,
        quickRatio: 1.2,
        cashRatio: 0.5,
        analysis: "The business maintains a healthy liquidity position with a current ratio of 1.8, which is above the SME benchmark of 1.5. You have sufficient current assets to cover your short-term obligations comfortably."
    },
    profitability: {
        grossMargin: 42.0,
        netMargin: 18.2,
        ebitdaMargin: 24.5,
        roa: 12.4,
        roe: 22.1,
        analysis: "Profitability is a core strength. The 18.2% net margin is in the top decile for the UAE logistics sector. Retained profits are fueling growth without the need for external financing."
    },
    leverage: {
        debtToEquity: 0.65,
        debtToAssets: 0.38,
        interestCoverageRatio: 8.4,
        analysis: "Leverage is well-managed. An interest coverage ratio of 8.4x indicates that the business generates more than enough earnings to sustain its current debt service requirements."
    },
    workingCapital: {
        workingCapital: 320000,
        workingCapitalRatio: 2.1,
        daysReceivable: 45,
        daysPayable: 60,
        cashConversionCycle: 15,
        analysis: "Working capital management is efficient. A 45-day collection period paired with 60-day supplier terms creates a positive cash cycle, minimizing the need for working capital loans."
    },
    roi: {
        returnOnInvestment: 15.5,
        returnOnCapitalEmployed: 21.8,
        analysis: "An ROCE of 21.8% demonstrates that management is deploying capital effectively to generate high returns."
    },
    trends: [
        { period: "Q1 vs Q2", metric: "Revenue", value: 450000, change: 15.2, direction: "up" },
        { period: "Q1 vs Q2", metric: "Net Profit", value: 82000, change: 12.1, direction: "up" },
        { period: "Q1 vs Q2", metric: "Operating Margin", value: 24.5, change: -1.2, direction: "down" }
    ],
    benchmarks: [
        { metric: "Current Ratio", userValue: 1.8, uaeAverage: 1.5, rating: "strong" },
        { metric: "Net Profit Margin", userValue: 18.2, uaeAverage: 12.5, rating: "strong" },
        { metric: "Debt-to-Equity", userValue: 0.65, uaeAverage: 1.0, rating: "average" }
    ],
    executiveSummary: {
        overallRating: "excellent",
        topStrengths: [
            "Exceptional net profit margins compared to sector average.",
            "Efficient cash conversion cycle driven by strong supplier terms.",
            "Low debt-to-equity ratio providing significant future borrowing capacity."
        ],
        topRisks: [
            "Revenue concentration: Top 3 clients represent 60% of turnover.",
            "Increasing logistics costs due to global fuel price volatility.",
            "Tightening quick ratio indicates high inventory dependency."
        ],
        priorityActions: [
            "Diversify client base to reduce revenue concentration risk.",
            "Lock in fuel surcharges with long-term transport partners.",
            "Optimize inventory levels based on current sales velocity."
        ]
    }
};
