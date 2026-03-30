"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload, FileText, Table, BarChart2, AlertTriangle, CheckCircle,
    ChevronRight, Download, Mail, RefreshCw, MessageCircle, Send,
    TrendingUp, TrendingDown, Shield, ArrowRight, X, Activity, Zap, ShieldCheck, Calculator
} from "lucide-react";
import WhatIfSimulator from "@/components/financial-health/WhatIfSimulator";
import ProfitLeakageReport from "@/components/financial-health/ProfitLeakageReport";
import IFRSReportView from "@/components/financial-health/IFRSReportView";
import RatiosReportView from "@/components/financial-health/RatiosReportView";
import { callGemini, callGeminiJSON, parseFileToText } from "@/lib/gemini-client";
import { buildMainReportPrompt, buildLeakagePrompt, buildChatPrompt } from "@/lib/gemini-prompts";
import LockForm from "@/components/financial-health/LockForm";

import {
    FinancialReport, SubScoreDetail, SubScores, RedFlag, CostBreakdownItem,
    WaterfallRow, LeakItem, StrategicRecommendation, ActionPlanItem, IFRSReport, RatiosReport
} from "./financial-types";

interface ChatMessage { role: "user" | "ai"; text: string; }

type PageState = "hero" | "upload" | "processing" | "report";
type AnalysisMode = "ifrs" | "ratios" | "health" | null;

const PROCESSING_STEPS = [
    "Reading your numbers...",
    "Spotting patterns...",
    "Building your report...",
];

// ─── Helper Components ─────────────────────────────────────────────────────────

function SectionCard({ title, icon: Icon, children, accentColor = "bg-royal-blue/10", textColor = "text-navy" }: { title: string; icon: React.ElementType; children: React.ReactNode; accentColor?: string; textColor?: string }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 last:mb-0">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                <div className={`w-8 h-8 rounded-lg ${accentColor} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-royal-blue" />
                </div>
                <h3 className={`font-bold ${textColor} text-base uppercase tracking-widest`}>{title}</h3>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

function ScoreCard({ subScore, color }: { subScore: SubScoreDetail, color: string }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-royal-blue/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{subScore.label}</span>
                <span className="text-xl font-black text-navy">{subScore.score}<span className="text-[10px] text-gray-400">/100</span></span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${subScore.score}%`, backgroundColor: color }} 
                />
            </div>
            <p className="text-[10px] leading-relaxed text-gray-500 font-medium italic">"{subScore.commentary}"</p>
        </div>
    );
}

function StatusBadge({ status }: { status: "healthy" | "watch" | "critical" | string }) {
    const s = status.toLowerCase();
    const config = {
        healthy: "bg-green-100 text-green-700 border-green-200",
        safe: "bg-green-100 text-green-700 border-green-200",
        watch: "bg-amber-100 text-amber-700 border-amber-200",
        approaching: "bg-amber-100 text-amber-700 border-amber-200",
        critical: "bg-red-100 text-red-700 border-red-200",
        exceeded: "bg-red-100 text-red-700 border-red-200",
    }[s] ?? "bg-gray-100 text-gray-700 border-gray-200";
    
    return (
        <span className={`px-2 py-0.5 text-[9px] font-black rounded-full border uppercase tracking-tighter ${config}`}>
            {status}
        </span>
    );
}

function CFOReportCover({ meta, summary, health }: { meta: FinancialReport['reportMeta'], summary: FinancialReport['executiveSummary'], health: FinancialReport['healthScore'] }) {
    return (
        <div className="bg-navy rounded-3xl p-10 text-white relative overflow-hidden mb-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-royal-blue/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-blue/10 rounded-full -ml-10 -mb-10 blur-2xl" />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-1 bg-sky-blue rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-blue">Confidential Briefing</span>
                        </div>
                        <h1 className="text-4xl font-black mb-1">Financial Health Case Briefing</h1>
                        <p className="text-white/50 text-xs font-medium uppercase tracking-widest">{meta.periodAnalyzed} • Prepared {meta.reportDate}</p>
                    </div>
                    <div className="text-right">
                        <div className="inline-block p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Consolidated Health Grade</p>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-6xl font-black ${
                                    summary.grade === 'A' ? 'text-green-400' : summary.grade === 'B' ? 'text-amber-400' : 'text-red-400'
                                }`}>{summary.grade}</span>
                                <span className="text-xs text-white/30 font-medium">/ UAE SME Benchmark</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-sky-blue/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-sky-blue" />
                        </div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight italic">"{summary.headline}"</h2>
                    </div>
                    <p className="text-white/70 leading-relaxed text-sm font-medium">{summary.narrative}</p>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    <ScoreCard subScore={health.subScores.profitability} color="#22c55e" />
                    <ScoreCard subScore={health.subScores.cashFlow} color="#3b82f6" />
                    <ScoreCard subScore={health.subScores.costEfficiency} color="#f59e0b" />
                    <ScoreCard subScore={health.subScores.growthTrend} color="#8b5cf6" />
                </div>
            </div>
        </div>
    );
}

function AdvancedInsightCard({ title, icon: Icon, value, status, children }: { title: string; icon: any; value: string | number | null; status?: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-royal-blue/5 flex items-center justify-center group-hover:bg-royal-blue group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5 text-royal-blue group-hover:text-white" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</h4>
                </div>
                {status && <StatusBadge status={status} />}
            </div>
            <div className="mb-3">
                <span className="text-3xl font-black text-navy">{value ?? "N/A"}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-500 font-medium italic">"{children}"</p>
        </div>
    );
}

function StrategicRoadmapTimeline({ plan }: { plan: FinancialReport['actionPlan'] }) {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {[
                { month: 'Month 1', items: plan.month1, color: 'border-royal-blue' },
                { month: 'Month 2', items: plan.month2, color: 'border-sky-blue' },
                { month: 'Month 3', items: plan.month3, color: 'border-navy' }
            ].map(({ month, items, color }) => (
                <div key={month} className={`bg-gray-50/50 rounded-2xl p-5 border-t-4 ${color}`}>
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex justify-between">
                        {month}
                        <span className="text-navy">{items.length} ACTIONS</span>
                    </h5>
                    <div className="space-y-3">
                        {items?.map((item, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative group overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-royal-blue/20 group-hover:bg-royal-blue transition-colors" />
                                <div className="flex justify-between items-start mb-1.5">
                                    <span className="text-[9px] font-bold text-royal-blue">{item.week ?? item.type}</span>
                                </div>
                                <p className="text-[11px] font-bold text-navy leading-tight mb-1">{item.action}</p>
                                <p className="text-[9px] text-gray-500 leading-snug italic">"{item.why}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}


const SAMPLE_REPORT: FinancialReport = {
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

export default function FinancialHealthClient() {
    const [pageState, setPageState] = useState<PageState>("hero");
    const [report, setReport] = useState<FinancialReport | null>(null);
    const [ifrsReport, setIfrsReport] = useState<IFRSReport | null>(null);
    const [ratiosReport, setRatiosReport] = useState<RatiosReport | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [extractedText, setExtractedText] = useState("");
    const [extractedSummary, setExtractedSummary] = useState("");
    const [processingStep, setProcessingStep] = useState(0);
    const [showManual, setShowManual] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    // Premium Lock State
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isSkipped, setIsSkipped] = useState(false);
    const [isViewingSample, setIsViewingSample] = useState(false);
    const [analysisMode, setAnalysisMode] = useState<AnalysisMode>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);


    // Load session state on mount
    useEffect(() => {
        const returningName = sessionStorage.getItem("bwmc_unlockedName");
        if (returningName) {
            setIsUnlocked(true);
        }
    }, []);

    // Dismiss toast after 4s
    useEffect(() => {
        if (toastMessage) {
            const t = setTimeout(() => setToastMessage(null), 4000);
            return () => clearTimeout(t);
        }
    }, [toastMessage]);

    // Leakage state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [leakageData, setLeakageData] = useState<any>(null);
    const [leakageLoading, setLeakageLoading] = useState(false);
    const [leakageError, setLeakageError] = useState<string | null>(null);

    const handleViewSample = () => {
        setIsViewingSample(true);
        setReport(SAMPLE_REPORT);
        setPageState("report");
        setExtractedSummary("Sample Report: Nova Trading LLC");
        setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
    };

    // ── Core: run Comprehensive CFO Analysis ─────────────────────────────────────
    const runAnalysis = async (text: string) => {
        setIsViewingSample(false);
        setExtractedText(text);
        const mode = analysisMode === "ifrs" ? "ifrs" : analysisMode === "ratios" ? "ratios" : "health";
        
        runProcessingAnimation(async () => {
            try {
                const res = await fetch("/api/gemini-proxy", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ extractedText: text, mode }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Analysis failed");

                if (mode === "ifrs") {
                    setIfrsReport(data.report);
                } else if (mode === "ratios") {
                    setRatiosReport(data.report);
                } else {
                    setReport(data.report);
                }
                
                setPageState("report");
                setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
                setPageState("upload");
            }
        });
    };

    // Chat state
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);

    // Manual form state
    const [manualForm, setManualForm] = useState({ revenue: "", expenses: "", assets: "", liabilities: "" });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadRef = useRef<HTMLDivElement>(null);
    const reportRef = useRef<HTMLDivElement>(null);

    const scrollToUpload = () => {
        setPageState("upload");
        setTimeout(() => uploadRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const runProcessingAnimation = (fn: () => Promise<void>) => {
        setPageState("processing");
        setProcessingStep(0);
        const timers: ReturnType<typeof setTimeout>[] = [];
        timers.push(setTimeout(() => setProcessingStep(1), 1800));
        timers.push(setTimeout(() => setProcessingStep(2), 3600));
        fn().then(() => {
            timers.forEach(clearTimeout);
        }).catch(() => {
            timers.forEach(clearTimeout);
        });
    };

    const analyzeFile = useCallback(async (file: File) => {
        setError(null);
        if (file.size > 10 * 1024 * 1024) { setError("File is too large. Maximum size is 10MB."); return; }
        try {
            const text = await parseFileToText(file);
            setExtractedSummary(file.name);
            await runAnalysis(text);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to read your file. Please try a different format.");
        }
    }, []);

    const analyzeManual = async () => {
        if (!manualForm.revenue && !manualForm.expenses) {
            setError("Please enter at least your monthly revenue and expenses."); return;
        }
        setError(null);
        const text = `Manual financial input for UAE business:
Monthly Revenue: AED ${manualForm.revenue || "Not provided"}
Monthly Expenses: AED ${manualForm.expenses || "Not provided"}
Total Assets: AED ${manualForm.assets || "Not provided"}
Total Liabilities: AED ${manualForm.liabilities || "Not provided"}
Annualized Revenue: AED ${manualForm.revenue ? (parseFloat(manualForm.revenue) * 12).toFixed(0) : "Unknown"}`;
        setExtractedSummary(text.slice(0, 500));
        await runAnalysis(text);
    };

    // Drag-and-drop handlers
    const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const onDragLeave = () => setIsDragging(false);
    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) analyzeFile(file);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) analyzeFile(file);
    };

    // Chat — direct Gemini call
    const sendChat = async () => {
        if (!chatInput.trim() || chatLoading || !report) return;
        const question = chatInput.trim();
        setChatInput("");
        setChatMessages(prev => [...prev.slice(-9), { role: "user", text: question }]);
        setChatLoading(true);
        try {
            const answer = await callGemini(buildChatPrompt(extractedText, report, question));
            setChatMessages(prev => [...prev, { role: "ai", text: answer || "Sorry, I couldn't answer that." }]);
        } catch (err: unknown) {
            setChatMessages(prev => [...prev, { role: "ai", text: err instanceof Error ? err.message : "Sorry, I had trouble connecting." }]);
        } finally {
            setChatLoading(false);
        }
    };

    const resetPage = () => {
        setReport(null);
        setIfrsReport(null);
        setRatiosReport(null);
        setError(null);
        setChatMessages([]);
        setManualForm({ revenue: "", expenses: "", assets: "", liabilities: "" });
        setShowManual(false);
        setEmailInput("");
        setEmailSent(false);
        setLeakageData(null);
        setLeakageError(null);
        setExtractedText("");
        setExtractedSummary("");
        setIsViewingSample(false);
        setAnalysisMode(null);
        setPageState("upload");
        setTimeout(() => uploadRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const handlePrint = () => window.print();

    return (
        <main className="min-h-screen bg-white print:bg-white">

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="bg-navy relative overflow-hidden py-24 px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-sky-blue/10 pointer-events-none" />

                {/* floating decorative blobs */}
                <div className="absolute top-10 right-10 w-72 h-72 bg-sky-blue/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-royal-blue/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8">
                            <Activity className="w-4 h-4 text-sky-blue" />
                            <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">Free Financial Health Check</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Know Exactly Where Your Business{" "}
                            <span className="text-sky-blue">Stands</span> — In 30 Seconds
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Upload your P&amp;L, bank statement or balance sheet. Our AI reads your numbers and gives you a full financial health report in plain English. <strong className="text-white">Free. No signup. No jargon.</strong>
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            {["No signup required", "Your data is never stored", "Results in under 30 seconds"].map((badge) => (
                                <div key={badge} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-white/90 text-sm font-medium">{badge}</span>
                                </div>
                            ))}
                        </div>

                        {/* Dual Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                            <button
                                onClick={handleViewSample}
                                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] text-navy font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-[#D4AF37]/30 hover:shadow-2xl transform hover:-translate-y-0.5 text-lg w-full sm:w-auto"
                            >
                                <FileText className="w-5 h-5" />
                                View Sample Report →
                            </button>
                            <button
                                onClick={scrollToUpload}
                                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all w-full sm:w-auto text-lg"
                            >
                                Analyse My Business
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm font-medium text-white/60">
                            See exactly what your report will look like before uploading anything.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── UPLOAD ───────────────────────────────────────────────────── */}
            <section ref={uploadRef} className="py-20 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-navy mb-3">
                            {analysisMode === "ifrs" ? "IFRS Review Setup" : 
                             analysisMode === "ratios" ? "Ratio Analysis Setup" : 
                             analysisMode === "health" ? "Health Check Setup" : 
                             "Select Your Analysis Mode"}
                        </h2>
                        <p className="text-gray-600">
                            {analysisMode ? "Upload your documents to begin the AI-powered analysis." : "Choose how you want our AI to analyze your business financials."}
                        </p>
                    </div>

                    {!analysisMode ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-royal-blue transition-all shadow-sm flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-royal-blue/10 flex items-center justify-center mb-6 group-hover:bg-royal-blue transition-colors">
                                    <Table className="w-8 h-8 text-royal-blue group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-2">Trial Balance & IFRS Review</h3>
                                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                    Upload your trial balance. We classify every account to IFRS, generate your P&L and Balance Sheet, and flag compliance issues.
                                </p>
                                <button 
                                    onClick={() => setAnalysisMode("ifrs")}
                                    className="mt-auto w-full py-3 bg-navy text-white font-bold rounded-xl hover:bg-royal-blue transition-colors"
                                >
                                    Select Mode
                                </button>
                            </motion.div>

                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-royal-blue transition-all shadow-sm flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-sky-blue/10 flex items-center justify-center mb-6 group-hover:bg-sky-blue transition-colors">
                                    <BarChart2 className="w-8 h-8 text-sky-blue group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-2">Full Financial Analysis</h3>
                                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                    Upload your financials. We calculate liquidity, profitability, leverage, working capital ratios and trend analysis.
                                </p>
                                <button 
                                    onClick={() => setAnalysisMode("ratios")}
                                    className="mt-auto w-full py-3 bg-navy text-white font-bold rounded-xl hover:bg-royal-blue transition-colors"
                                >
                                    Select Mode
                                </button>
                            </motion.div>

                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-royal-blue transition-all shadow-sm flex flex-col items-center text-center group md:col-span-2"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                                    <Activity className="w-8 h-8 text-green-500 group-hover:text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-2">Standard Health Check</h3>
                                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                    Our classic AI analysis for a general overview of your business health, profit leakage, and key performance metrics.
                                </p>
                                <button 
                                    onClick={() => setAnalysisMode("health")}
                                    className="mt-auto px-12 py-3 bg-navy text-white font-bold rounded-xl hover:bg-royal-blue transition-colors"
                                >
                                    Select Mode
                                </button>
                            </motion.div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <button 
                                    onClick={() => setAnalysisMode(null)}
                                    className="text-sm font-bold text-royal-blue hover:text-navy flex items-center gap-1 transition-colors"
                                >
                                    ← Change Mode
                                </button>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                    Mode: {analysisMode.toUpperCase()}
                                </span>
                            </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 flex items-start gap-3"
                        >
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold">Analysis Failed</p>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                            <button onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
                        </motion.div>
                    )}

                    {/* Drag & Drop Zone */}
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all duration-200 bg-white ${isDragging ? "border-royal-blue bg-royal-blue/5 scale-[1.01]" : "border-gray-200 hover:border-royal-blue/50 hover:bg-gray-50/50"}`}
                    >
                        <input ref={fileInputRef} type="file" accept=".pdf,.xlsx,.xls,.csv" onChange={onFileChange} className="hidden" />
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors ${isDragging ? "bg-royal-blue" : "bg-gray-100"}`}>
                            <Upload className={`w-8 h-8 transition-colors ${isDragging ? "text-white" : "text-gray-400"}`} />
                        </div>
                        <p className="text-lg font-bold text-navy mb-2">
                            {isDragging ? "Drop it here!" : "Drag & drop your file here"}
                        </p>
                        <p className="text-gray-500 mb-5">or click to browse your files</p>
                        <span className="inline-block bg-royal-blue text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-navy transition-colors">
                            Select File
                        </span>
                        <p className="mt-4 text-xs text-gray-400">Maximum file size: 10MB</p>
                    </div>

                    {/* Accepted file types */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {[
                            { icon: FileText, label: "P&L Statement", ext: "PDF · XLSX" },
                            { icon: BarChart2, label: "Bank Statement", ext: "PDF · CSV" },
                            { icon: Table, label: "Balance Sheet", ext: "PDF · XLSX" },
                        ].map(({ icon: Icon, label, ext }) => (
                            <div key={label} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                                <Icon className="w-6 h-6 text-royal-blue mx-auto mb-2" />
                                <p className="font-semibold text-navy text-sm">{label}</p>
                                <p className="text-xs text-gray-400 mt-1">{ext}</p>
                            </div>
                        ))}
                    </div>

                    {/* Privacy note */}
                    <p className="text-center text-sm text-gray-400 mt-5 flex items-center justify-center gap-1.5">
                        <Shield className="w-4 h-4 text-green-500" />
                        Your file is analyzed instantly and <strong>never stored</strong>. All data is discarded immediately after your report is generated.
                    </p>

                    {/* Manual input toggle */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setShowManual(!showManual)}
                            className="text-royal-blue hover:text-navy underline underline-offset-4 text-sm font-medium transition-colors"
                        >
                            {showManual ? "Hide manual entry" : "Don't have a file? Enter numbers manually"}
                        </button>
                    </div>

                    {/* Manual input form */}
                    <AnimatePresence>
                        {showManual && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-4 space-y-4">
                                    <h3 className="font-bold text-navy mb-4">Enter Your Numbers (AED)</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { key: "revenue", label: "Monthly Revenue", placeholder: "e.g. 150000" },
                                            { key: "expenses", label: "Monthly Expenses", placeholder: "e.g. 120000" },
                                            { key: "assets", label: "Total Assets", placeholder: "e.g. 500000" },
                                            { key: "liabilities", label: "Total Liabilities", placeholder: "e.g. 200000" },
                                        ].map(({ key, label, placeholder }) => (
                                            <div key={key}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                                                <input
                                                    type="number"
                                                    placeholder={placeholder}
                                                    value={manualForm[key as keyof typeof manualForm]}
                                                    onChange={(e) => setManualForm(prev => ({ ...prev, [key]: e.target.value }))}
                                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={analyzeManual}
                                        className="w-full bg-royal-blue text-white font-bold py-3.5 rounded-xl hover:bg-navy transition-colors mt-2"
                                    >
                                        Analyze My Numbers
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    </section>

            {/* ── PROCESSING ───────────────────────────────────────────────── */}
            <AnimatePresence>
                {pageState === "processing" && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-navy/90 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        <div className="text-center">
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1E40AF" strokeWidth="8" strokeOpacity="0.3" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#4F9BD9" strokeWidth="8" strokeDasharray="60 190" strokeLinecap="round" />
                                </svg>
                                <Activity className="absolute inset-0 m-auto w-10 h-10 text-white" />
                            </div>
                            <div className="space-y-3">
                                {PROCESSING_STEPS.map((step, i) => (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: processingStep >= i ? 1 : 0.3, x: 0 }}
                                        className="flex items-center justify-center gap-3"
                                    >
                                        {processingStep > i ? (
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                        ) : processingStep === i ? (
                                            <div className="w-5 h-5 rounded-full border-2 border-sky-blue border-t-transparent animate-spin" />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-white/20" />
                                        )}
                                        <span className={`text-lg font-medium ${processingStep >= i ? "text-white" : "text-white/40"}`}>{step}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* ── REPORT DASHBOARD ─────────────────────────────────────────── */}
            <AnimatePresence>
                {pageState === "report" && (report || ifrsReport || ratiosReport) && (
                    <motion.div
                        ref={reportRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="py-12 px-6 lg:px-8 bg-gray-50 print:py-4 print:px-4 relative"
                        id="report-content"
                    >
                        {isViewingSample && (
                            <div className="sticky top-4 z-50 mb-8 max-w-4xl mx-auto">
                                <div className="bg-[#D4AF37] text-navy font-bold p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-white/20 backdrop-blur-md">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-navy" />
                                        </div>
                                        <p className="text-sm">👁 You are viewing a sample report — Nova Trading LLC, Dubai</p>
                                    </div>
                                    <button 
                                        onClick={scrollToUpload}
                                        className="bg-navy text-white hover:bg-black font-bold px-6 py-2 rounded-xl text-xs transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                    >
                                        Analyse My Own Business
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="max-w-4xl mx-auto space-y-8">

                            {analysisMode === "ifrs" && ifrsReport ? (
                                <IFRSReportView report={ifrsReport} />
                            ) : analysisMode === "ratios" && ratiosReport ? (
                                <RatiosReportView report={ratiosReport} />
                            ) : report ? (
                                <>
                                    {/* CFO Cover Page & Executive Summary */}
                                    <CFOReportCover 
                                        meta={report.reportMeta} 
                                        summary={report.executiveSummary} 
                                        health={report.healthScore}
                                    />

                                    <div className="flex items-center justify-between flex-wrap gap-4 px-2">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-3 h-3 text-royal-blue" />
                                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">BWMC FinSight AI • Reference #{Math.random().toString(36).substring(7).toUpperCase()}</p>
                                        </div>
                                        <button
                                            onClick={resetPage}
                                            className="flex items-center gap-2 text-xs text-royal-blue font-bold px-4 py-2 hover:bg-royal-blue/5 rounded-lg transition-colors print:hidden"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                            New Analysis
                                        </button>
                                    </div>

                                    {/* Analyst Note */}
                                    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl shadow-sm">
                                        <div className="flex items-center gap-2 mb-2 text-amber-800 uppercase tracking-widest text-[10px] font-black">
                                            <MessageCircle className="w-4 h-4" />
                                            Analyst Observation (Marcus Al-Rashidi)
                                        </div>
                                        <p className="text-amber-900 font-serif italic text-lg leading-relaxed">
                                            "{report.reportMeta.analystNote}"
                                        </p>
                                    </div>

                                    {/* Financial Performance Section */}
                                    <SectionCard title="Performance Intelligence" icon={BarChart2}>
                                        <div className="space-y-8">
                                            <div 
                                                className="text-gray-700 leading-relaxed space-y-4"
                                                dangerouslySetInnerHTML={{ 
                                                    __html: report.financialPerformance.narrative.replace(/\*\*(.*?)\*\*/g, '<strong class="text-navy font-bold">$1</strong>').replace(/\n/g, '<br/>') 
                                                }}
                                            />
                                            
                                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {report.financialPerformance.keyMetrics?.map((m, idx) => (
                                                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.metric}</p>
                                                        <p className="text-xl font-black text-navy mb-1">{m.value}</p>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[9px] text-gray-500 italic">Target: {m.benchmark}</span>
                                                            <StatusBadge status={m.status} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="p-4 bg-royal-blue/5 rounded-xl border border-royal-blue/10">
                                                <h4 className="text-[10px] font-black text-royal-blue uppercase tracking-widest mb-2 flex items-center gap-2">
                                                    <Zap className="w-3 h-3" />
                                                    Margin Bridge Story
                                                </h4>
                                                <p className="text-sm italic text-navy leading-relaxed font-serif">"{report.financialPerformance.marginBridge.narrative}"</p>
                                            </div>
                                        </div>
                                    </SectionCard>

                            {/* ── CONSTANT: Determine if this is a sample based on the company name ── */}
                            {(() => {
                                const isSample = isViewingSample || report.reportMeta.companyName?.toLowerCase().includes("nova trading");
                                const showLock = !isSample && !isUnlocked;
                                const contentClass = showLock && !isSkipped ? "filter blur-md pointer-events-none select-none opacity-60 transition-all duration-700 mt-8" : "transition-all duration-700 mt-8";
                                
                                return (
                                    <div className="relative">
                                        {showLock && !isSkipped && (
                                            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-50/0 to-gray-50 z-10" />
                                        )}
                                        
                                        {showLock && (
                                            <div className={`transition-all duration-500 ${isSkipped ? 'fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-auto' : 'absolute top-20 left-0 right-0 z-20 px-4'}`}>
                                                {isSkipped ? (
                                                    <div className="max-w-3xl mx-auto bg-navy text-white rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-[#D4AF37]">
                                                        <div className="flex items-center gap-3">
                                                            <Shield className="w-6 h-6 text-[#D4AF37]" />
                                                            <p className="font-bold text-sm">Unlock your full report — enter 3 details</p>
                                                        </div>
                                                        <button 
                                                            onClick={(() => setIsSkipped(false)) as any} 
                                                            className="bg-[#D4AF37] hover:bg-[#B5952F] text-navy font-bold px-6 py-2 rounded-xl text-sm transition-colors whitespace-nowrap"
                                                        >
                                                            Unlock Now
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <LockForm 
                                                        reportData={report} 
                                                        onUnlock={(n) => { setIsUnlocked(true); setToastMessage(`Welcome ${n.split(' ')[0]} — your full report is unlocked`); }}
                                                        onSkip={() => setIsSkipped(true)}
                                                    />
                                                )}
                                            </div>
                                        )}

                                        <div className={contentClass}>
                                            {/* Cost Intelligence Section */}
                                            <SectionCard title="Cost Structure Intelligence" icon={Activity}>
                                                <div className="space-y-6">
                                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{report.costIntelligence.narrative}"</p>
                                                    
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full text-left">
                                                            <thead>
                                                                <tr className="border-b border-gray-100">
                                                                    <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                                                                    <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                                                                    <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue %</th>
                                                                    <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-50">
                                                                {(report.costIntelligence.costBreakdown || []).map((item, idx) => (
                                                                    <tr key={idx} className="group">
                                                                        <td className="py-4 font-bold text-navy text-sm">{item.category}</td>
                                                                        <td className="py-4 text-sm text-gray-600 font-mono">AED {item.amount.toLocaleString()}</td>
                                                                        <td className="py-4">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-sm font-black text-navy">{item.percentOfRevenue}%</span>
                                                                                <span className="text-[9px] text-gray-400 italic">(Benchmark: {item.benchmark}%)</span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="py-4"><StatusBadge status={item.status} /></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/* Expose Top 2 Red Flags Above the Blur Wall */}
                                                    {report.riskAssessment.redFlags && report.riskAssessment.redFlags.length > 0 && (
                                                        <div className="mt-12 mb-6">
                                                            <div className="flex items-center gap-3 mb-6">
                                                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                                                    <Shield className="w-5 h-5 text-red-600" />
                                                                </div>
                                                                <h3 className="font-bold text-navy text-base uppercase tracking-widest">Immediate Risks Identified</h3>
                                                            </div>
                                                            <div className="grid md:grid-cols-2 gap-6">
                                                                {report.riskAssessment.redFlags.slice(0, 2).map((flag, idx) => (
                                                                    <div key={idx} className="p-5 bg-red-50/50 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                                                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${flag.severity === 'critical' ? 'bg-red-500' : 'bg-amber-400'}`} />
                                                                        <div className="flex justify-between items-start mb-3">
                                                                            <span className="font-bold text-navy text-sm">{flag.title}</span>
                                                                            <StatusBadge status={flag.severity} />
                                                                        </div>
                                                                        <p className="text-xs text-gray-700 leading-relaxed italic mb-4">"{flag.cfoObservation}"</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Profit Leakage Teaser */}
                                                    <div className="mt-8">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                                                            </div>
                                                            <h3 className="font-bold text-navy text-base uppercase tracking-widest">Profit Leakage Warning</h3>
                                                        </div>
                                                        <p className="text-gray-600 font-medium leading-relaxed italic">
                                                            {report.profitLeakage.narrative.split('.')[0]}.
                                                        </p>
                                                        <p className="text-navy font-black mt-3">
                                                            Your top 3 profit leaks are costing you AED {report.profitLeakage.recoveryOpportunity.monthlyAED.toLocaleString()} every month...
                                                        </p>
                                                    </div>
                                                </div>
                                            </SectionCard>

                                            {/* Cost Intelligence Section - Hidden Costs (Moved here) */}
                                            {report.costIntelligence.hiddenCosts.length > 0 && (
                                                <div className="bg-red-50 p-5 rounded-2xl border border-red-100 mb-8 shadow-sm">
                                                    <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-4">Hidden Fiscal Exposure Identified</h4>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {(report.costIntelligence.hiddenCosts || []).map((cost, idx) => (
                                                            <div key={idx} className="bg-white p-3 border border-red-200 rounded-xl shadow-sm">
                                                                <div className="flex justify-between items-start mb-1.5">
                                                                    <span className="font-bold text-navy text-xs">{cost.description}</span>
                                                                    <span className="text-red-600 font-black text-xs">AED {cost.estimatedAnnualImpact.toLocaleString()}/yr</span>
                                                                </div>
                                                                <p className="text-[10px] text-gray-500 italic">"{cost.insight}"</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                            {/* Profit Leakage Section */}
                            <SectionCard title="Recovery Matrix (Profit Leakage)" icon={TrendingDown}>
                                <div className="space-y-8">
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {report.profitLeakage.narrative}
                                    </p>

                                    <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
                                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6">Financial Recovery Opportunity</h4>
                                        <div className="flex flex-col md:flex-row gap-12 items-center">
                                            <div>
                                                <p className="text-[10px] font-bold text-sky-blue uppercase mb-1">Total Leakage Recoverable</p>
                                                <p className="text-5xl font-black text-white">AED {report.profitLeakage.recoveryOpportunity.monthlyAED.toLocaleString()}<span className="text-xs text-white/30 ml-2">/mo</span></p>
                                                <p className="text-xl font-bold text-white/40 mt-1">AED {report.profitLeakage.recoveryOpportunity.annualAED.toLocaleString()}<span className="text-[10px] ml-1 uppercase">Annual potential</span></p>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm flex-1">
                                                <p className="text-sky-blue font-serif italic text-lg">"{report.profitLeakage.recoveryOpportunity.narrative}"</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        {(report.profitLeakage.topLeaks || []).map((leak, idx) => (
                                            <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm relative overflow-hidden">
                                                <div className={`absolute top-0 left-0 w-full h-1 ${
                                                    leak.severity === 'critical' ? 'bg-red-500' : leak.severity === 'high' ? 'bg-amber-500' : 'bg-royal-blue'
                                                }`} />
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-black text-gray-400">RANK #0{leak.rank}</span>
                                                    <StatusBadge status={leak.severity} />
                                                </div>
                                                <h5 className="font-bold text-navy text-sm mb-1">{leak.category}</h5>
                                                <p className="text-[10px] text-red-500 font-black mb-3">AED {leak.monthlyAmount.toLocaleString()} LEAKED ({(leak.monthlyAmount / report.costIntelligence.costBreakdown.reduce((s,c) => s+c.amount, 0) * 100).toFixed(1)}% of Spend)</p>
                                                <p className="text-[10px] text-gray-500 leading-relaxed font-serif italic">"{leak.cfoInsight}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SectionCard>

                            {/* Risk Assessment Section */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <SectionCard title="CFO Risk Assessment" icon={Shield}>
                                    <div className="space-y-6">
                                        {(report.riskAssessment.redFlags?.slice(2) || []).map((flag, idx) => (
                                            <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative group overflow-hidden">
                                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                                                    flag.severity === 'critical' ? 'bg-red-500' : 'bg-amber-400'
                                                }`} />
                                                <div className="flex items-center gap-2 mb-2">
                                                    <StatusBadge status={flag.severity} />
                                                    <span className="font-bold text-navy text-xs">{flag.title}</span>
                                                </div>
                                                <p className="text-[11px] text-gray-700 leading-relaxed mb-3 italic">"{flag.cfoObservation}"</p>
                                                <div className="pt-2 border-t border-gray-200">
                                                    <p className="text-[9px] font-black text-red-600 uppercase mb-1">Immediate Action Required:</p>
                                                    <p className="text-[10px] font-bold text-navy">{flag.immediateAction}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="p-4 bg-navy text-white rounded-xl shadow-lg">
                                            <h5 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Cash Runway Assessment</h5>
                                            <p className="text-3xl font-black mb-1">{report.riskAssessment.cashRunway.months} Months</p>
                                            <p className="text-[11px] text-white/60 font-serif italic leading-relaxed">"{report.riskAssessment.cashRunway.narrative}"</p>
                                        </div>
                                    </div>
                                </SectionCard>

                                <SectionCard title="Tax & Compliance" icon={AlertTriangle}>
                                    <div className="space-y-6">
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">VAT Exposure</h5>
                                                <StatusBadge status={report.riskAssessment.vatExposure.status} />
                                            </div>
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-2xl font-black text-navy">AED {report.riskAssessment.vatExposure.estimatedAnnualRevenue.toLocaleString()}</span>
                                                <span className="text-[10px] text-gray-400">/ Est. Annual Turnover</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 font-serif italic leading-relaxed">"{report.riskAssessment.vatExposure.narrative}"</p>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Corporate Tax (9%)</h5>
                                                <StatusBadge status={report.riskAssessment.corporateTaxExposure.status} />
                                            </div>
                                            <p className="text-[10px] text-gray-500 font-serif italic leading-relaxed">"{report.riskAssessment.corporateTaxExposure.narrative}"</p>
                                        </div>
                                    </div>
                                </SectionCard>
                            </div>

                            {/* Advanced Metrics Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <AdvancedInsightCard 
                                    title="Working Capital" 
                                    icon={Activity} 
                                    value={report.advancedMetrics.workingCapitalRatio.value?.toFixed(2)}
                                    status={report.advancedMetrics.workingCapitalRatio.status}
                                >
                                    {report.advancedMetrics.workingCapitalRatio.narrative}
                                </AdvancedInsightCard>
                                <AdvancedInsightCard 
                                    title="Operating Leverage" 
                                    icon={TrendingUp} 
                                    value={report.advancedMetrics.operatingLeverage.value}
                                >
                                    {report.advancedMetrics.operatingLeverage.narrative}
                                </AdvancedInsightCard>
                                <AdvancedInsightCard 
                                    title="Revenue Quality" 
                                    icon={Shield} 
                                    value={`${report.advancedMetrics.revenueQualityScore.score}%`}
                                >
                                    {report.advancedMetrics.revenueQualityScore.narrative}
                                </AdvancedInsightCard>
                                <AdvancedInsightCard 
                                    title="Seasonality" 
                                    icon={Activity} 
                                    value={report.advancedMetrics.seasonalityDetected ? "Detected" : "Stable"}
                                >
                                    {report.advancedMetrics.seasonalityNarrative || "No seasonal patterns detected in analyzed data."}
                                </AdvancedInsightCard>
                            </div>

                            {/* Strategic Action Plan Section */}
                            <SectionCard title="90-Day Execution Roadmap" icon={Zap} accentColor="bg-royal-blue/10">
                                <div className="space-y-8">
                                    <div className="bg-royal-blue/5 p-6 rounded-2xl border border-royal-blue/10">
                                        <p className="text-royal-blue font-serif italic text-lg leading-relaxed">
                                            "{report.actionPlan.narrative}"
                                        </p>
                                    </div>
                                    <StrategicRoadmapTimeline plan={report.actionPlan} />
                                </div>
                            </SectionCard>

                            {/* Prioritized Recommendations */}
                            <SectionCard title="Prioritized CFO Strategic Actions" icon={ArrowRight}>
                                <div className="space-y-4">
                                    {report.strategicRecommendations.sort((a,b) => a.priority - b.priority).map((rec, idx) => (
                                        <div key={idx} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:border-royal-blue/30 transition-colors">
                                            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-6 h-6 rounded bg-navy text-white text-[10px] flex items-center justify-center font-black">#0{rec.priority}</span>
                                                    <h5 className="font-bold text-navy">{rec.title}</h5>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-[9px] font-black text-royal-blue bg-royal-blue/5 px-2 py-1 rounded uppercase tracking-widest">{rec.timeframe}</span>
                                                    <span className="text-[9px] font-black text-gray-400 bg-gray-100 px-2 py-1 rounded uppercase tracking-widest">Effort: {rec.effort}</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-gray-700 leading-relaxed mb-4 italic">"{rec.cfoRationale}"</p>
                                            <div className="pt-4 border-t border-gray-50 flex flex-col md:flex-row justify-between gap-4">
                                                <div>
                                                    <p className="text-[9px] font-black text-royal-blue uppercase mb-1">Specific Step:</p>
                                                    <p className="text-[11px] font-bold text-navy leading-snug">{rec.specificAction}</p>
                                                </div>
                                                <div className="md:text-right">
                                                    <p className="text-[9px] font-black text-green-600 uppercase mb-1">Expected ROI Impact:</p>
                                                    <p className="text-[11px] font-bold text-navy leading-snug">{rec.expectedImpact}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>

                            {/* ── WHAT-IF SIMULATOR ────────────────────────── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="print:hidden"
                            >
                                <WhatIfSimulator report={report} extractedSummary={extractedSummary} extractedText={extractedText} />
                                <div className="mt-8">
                                    <ProfitLeakageReport
                                        leakage={report.profitLeakage}
                                        loading={false}
                                        error={null}
                                    />
                                </div>
                            </motion.div>

                            {/* AI Chat Section */}
                            <SectionCard title="Direct CFO Query Access" icon={MessageCircle} accentColor="bg-navy/5">
                                <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {chatMessages.length === 0 && (
                                        <div className="text-center py-8">
                                            <p className="text-gray-400 text-xs italic font-serif">"I have studied your numbers. Ask me specifically about any metric or strategy in this report."</p>
                                        </div>
                                    )}
                                    {chatMessages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                                                msg.role === "user" ? "bg-navy text-white rounded-tr-none shadow-md" : "bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm"
                                            }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {chatLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && sendChat()}
                                        placeholder="Type your question for Marcus Al-Rashidi..."
                                        disabled={chatLoading}
                                        className="flex-1 border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all"
                                    />
                                    <button
                                        onClick={sendChat}
                                        disabled={chatLoading || !chatInput.trim()}
                                        className="bg-navy text-white px-5 py-3 rounded-xl hover:bg-black disabled:opacity-50 transition-all shadow-md active:scale-95"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </SectionCard>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Final Closing Statement & Signature */}
                            <div className="pt-20 pb-12 text-center space-y-6">
                                <div className="w-32 h-px bg-gray-200 mx-auto" />
                                <div className="space-y-2">
                                    <p className="font-serif italic text-navy text-xl leading-relaxed max-w-2xl mx-auto">
                                        &quot;{report.closingStatement.narrative}&quot;
                                    </p>
                                </div>
                                <div className="pt-6">
                                    <div className="inline-block p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-6">
                                            <div className="text-left">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Potential 90-Day Score</p>
                                                <p className="text-3xl font-black text-navy">{report.closingStatement.potentialScore}<span className="text-xs text-green-500 ml-1">↑ +{report.closingStatement.potentialScore - report.healthScore.overall}</span></p>
                                            </div>
                                            <ArrowRight className="text-gray-200 w-6 h-6" />
                                            <div className="text-left">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] font-sans">Current Delta</p>
                                                <p className="text-3xl font-black text-gray-400">{report.closingStatement.pointsFromPerfect} pts</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-12 text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black mb-1">Authenticated Advisory Sign-Off</p>
                                    <p className="font-serif text-navy italic text-lg mb-1">{report.closingStatement.signOff}</p>
                                    <p className="text-[9px] text-gray-300 max-w-sm mx-auto leading-relaxed mt-4">
                                        This proprietary report was generated by BWMC FinSight AI Layer. Numerical analysis performed by BWMC UAE &amp; GCC Advisory Panel. 2026 Copyright BWMC Dubai.
                                    </p>
                                </div>
                            </div>

                            {/* ── SAVE & SHARE ─────────────────────────────── */}
                            <div className="bg-navy rounded-3xl p-12 text-center print:hidden shadow-3xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-blue via-royal-blue to-navy animate-pulse" />
                                <div className="relative z-10">
                                    <p className="text-sky-blue text-[10px] uppercase tracking-[0.4em] font-black mb-4">Strategic Advisory Path</p>
                                    <h3 className="text-4xl font-serif text-white mb-6 leading-tight max-w-3xl mx-auto">
                                        Your business potential is clear, but the implementation gap is currently costing you <span className="text-sky-blue font-black underline decoration-sky-blue/30 underline-offset-8 italic">AED {report.profitLeakage.recoveryOpportunity.monthlyAED.toLocaleString()}</span> monthly.
                                    </h3>
                                    <p className="text-white/60 mb-10 max-w-xl mx-auto leading-relaxed text-sm">
                                        Marcus and the BWMC senior team can work directly inside your finance function to recapture this leakage and stabilize your 90-day trajectory.
                                    </p>

                                    <div className="flex flex-wrap gap-5 justify-center">
                                        <button
                                            onClick={handlePrint}
                                            className="flex items-center gap-3 bg-white text-navy font-black px-10 py-5 rounded-2xl hover:bg-sky-blue hover:text-navy transition-all shadow-2xl group active:scale-95"
                                        >
                                            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Download CFO Briefing
                                        </button>
                                        <button
                                            onClick={() => window.location.href = '/contact'}
                                            className="flex items-center gap-3 bg-royal-blue text-white font-black px-10 py-5 rounded-2xl hover:bg-sky-blue hover:text-navy transition-all shadow-2xl active:scale-95"
                                        >
                                            <Mail className="w-5 h-5" />
                                            Schedule Advisory Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Print styles */}
            <style>{`
                @media print {
                    .print\\:hidden { display: none !important; }
                    .print\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                    .print\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
                    .print\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                    header, footer, nav { display: none !important; }
                    body { background: white !important; }
                }
            `}</style>
        </main>
    );
}
