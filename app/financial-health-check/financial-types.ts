export interface SubScoreDetail {
    score: number;
    label: string;
    commentary: string;
}

export interface SubScores {
    profitability: SubScoreDetail;
    cashFlow: SubScoreDetail;
    costEfficiency: SubScoreDetail;
    growthTrend: SubScoreDetail;
}

export interface RedFlag {
    severity: "critical" | "warning" | "watch";
    title: string;
    cfoObservation: string;
    consequence: string;
    immediateAction: string;
}

export interface CostBreakdownItem {
    category: string;
    amount: number;
    percentOfRevenue: number;
    benchmark: number;
    status: "healthy" | "watch" | "critical";
    commentary: string;
}

export interface WaterfallRow {
    label: string;
    amount: number;
    percentOfRevenue: number;
    type: "revenue" | "deduction" | "subtotal" | "profit";
}

export interface LeakItem {
    rank: number;
    category: string;
    monthlyAmount: number;
    percentOfRevenue: number;
    cfoInsight: string;
    industryBenchmark: string;
    severity: "critical" | "high" | "medium";
}

export interface StrategicRecommendation {
    priority: number;
    title: string;
    cfoRationale: string;
    specificAction: string;
    expectedImpact: string;
    timeframe: "This week" | "This month" | "Next 90 days" | "Next 6 months";
    effort: "Low" | "Medium" | "High";
    impact: "Low" | "Medium" | "High";
}

export interface ActionPlanItem {
    week?: string;
    action: string;
    type: "DIY" | "Needs Expert Help";
    why: string;
}

export interface FinancialReport {
    reportMeta: {
        companyName: string;
        periodAnalyzed: string;
        dataConfidence: "Low" | "Medium" | "High";
        confidenceReason: string;
        reportDate: string;
        analystNote: string;
    };
    executiveSummary: {
        grade: "A" | "B" | "C" | "D";
        gradeReason: string;
        headline: string;
        narrative: string;
    };
    healthScore: {
        overall: number;
        grade: "A" | "B" | "C" | "D";
        subScores: SubScores;
    };
    financialPerformance: {
        narrative: string;
        keyMetrics: Array<{
            metric: string;
            value: string;
            benchmark: string;
            status: "healthy" | "watch" | "critical";
            gap: string;
        }>;
        marginBridge: {
            narrative: string;
        };
        monthlyTrend?: Array<{
            month: string;
            revenue: number;
            expenses: number;
        }>;
    };
    costIntelligence: {
        narrative: string;
        costBreakdown: CostBreakdownItem[];
        hiddenCosts: Array<{
            description: string;
            estimatedAnnualImpact: number;
            insight: string;
        }>;
    };
    profitLeakage: {
        narrative: string;
        waterfallData: WaterfallRow[];
        topLeaks: LeakItem[];
        recoveryOpportunity: {
            monthlyAED: number;
            annualAED: number;
            narrative: string;
            breakdown: Array<{ leak: string; monthlyRecovery: number }>;
        };
    };
    riskAssessment: {
        narrative: string;
        redFlags: RedFlag[];
        vatExposure: {
            status: "safe" | "approaching" | "exceeded";
            estimatedAnnualRevenue: number;
            threshold: number;
            narrative: string;
        };
        corporateTaxExposure: {
            status: "safe" | "approaching" | "exceeded";
            threshold: number;
            rate: string;
            narrative: string;
        };
        cashRunway: {
            months: number | null;
            narrative: string;
        };
    };
    advancedMetrics: {
        workingCapitalRatio: {
            value: number;
            benchmark: number;
            status: "healthy" | "watch" | "critical";
            narrative: string;
        };
        operatingLeverage: {
            value: string | null;
            narrative: string;
        };
        revenueQualityScore: {
            score: number;
            recurringVsOneOff: string;
            concentration: string;
            narrative: string;
        };
        seasonalityDetected: boolean;
        seasonalityNarrative: string | null;
    };
    strategicRecommendations: StrategicRecommendation[];
    actionPlan: {
        narrative: string;
        month1: ActionPlanItem[];
        month2: ActionPlanItem[];
        month3: ActionPlanItem[];
    };
    closingStatement: {
        narrative: string;
        pointsFromPerfect: number;
        potentialScore: number;
        signOff: string;
    };
}

export interface AccountLine {
    accountName: string;
    amount: number;
    ifrsCategory: string;
    ifrsStandard: string;
    notes: string;
}

export interface IFRSReport {
    balanceCheck: {
        totalDebits: number;
        totalCredits: number;
        isBalanced: boolean;
        discrepancy: number;
    };
    classification: {
        assets: AccountLine[];
        liabilities: AccountLine[];
        equity: AccountLine[];
        revenue: AccountLine[];
        expenses: AccountLine[];
    };
    generatedPL: {
        revenue: number;
        costOfSales: number;
        grossProfit: number;
        operatingExpenses: number;
        ebit: number;
        netProfit: number;
    };
    generatedBalanceSheet: {
        totalAssets: number;
        totalLiabilities: number;
        totalEquity: number;
        isBalanced: boolean;
    };
    complianceFlags: {
        severity: "critical" | "warning" | "info";
        standard: string;
        issue: string;
        affectedAccounts: string[];
        recommendation: string;
    }[];
    summary: {
        overallComplianceScore: number;
        criticalIssues: number;
        warnings: number;
        keyFindings: string[];
    };
}

export interface RatiosReport {
    liquidity: {
        currentRatio: number;
        quickRatio: number;
        cashRatio: number;
        analysis: string;
    };
    profitability: {
        grossMargin: number;
        netMargin: number;
        ebitdaMargin: number;
        roa: number;
        roe: number;
        analysis: string;
    };
    leverage: {
        debtToEquity: number;
        debtToAssets: number;
        interestCoverageRatio: number;
        analysis: string;
    };
    workingCapital: {
        workingCapital: number;
        workingCapitalRatio: number;
        daysReceivable: number;
        daysPayable: number;
        cashConversionCycle: number;
        analysis: string;
    };
    roi: {
        returnOnInvestment: number;
        returnOnCapitalEmployed: number;
        analysis: string;
    };
    trends: {
        period: string;
        metric: string;
        value: number;
        change: number;
        direction: "up" | "down" | "flat";
    }[];
    benchmarks: {
        metric: string;
        userValue: number;
        uaeAverage: number;
        rating: "strong" | "average" | "weak";
    }[];
    executiveSummary: {
        overallRating: "excellent" | "good" | "fair" | "poor";
        topStrengths: string[];
        topRisks: string[];
        priorityActions: string[];
    };
}
