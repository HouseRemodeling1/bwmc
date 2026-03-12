"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingDown, AlertTriangle, Sparkles, CheckCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface WaterfallRow {
    label: string;
    amount: number;
    percentOfRevenue: number;
    type: "revenue" | "deduction" | "subtotal" | "profit";
}
interface LeakItem {
    rank: 1 | 2 | 3;
    category: string;
    monthlyAmount: number;
    percentOfRevenue: number;
    whyItsProblem: string;
    industryStandard: string;
    severity: "critical" | "high" | "medium";
}
interface BenchmarkRow {
    metric: string;
    yourValue: number;
    uaeAverage: number;
    healthyTarget: number;
}
interface LeakageData {
    waterfallData: WaterfallRow[];
    topLeaks: LeakItem[];
    benchmarks: BenchmarkRow[];
    benchmarkInsight: string;
    recoveryOpportunity: {
        totalMonthly: number;
        totalAnnual: number;
        breakdown: Array<{ leak: string; monthlyRecovery: number }>;
    };
    roadmap: {
        month1: Array<{ action: string; type: "DIY" | "Needs Help" }>;
        month2: Array<{ action: string; type: "DIY" | "Needs Help" }>;
        month3: Array<{ action: string; type: "DIY" | "Needs Help" }>;
    };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) => `AED ${Math.abs(Math.round(n)).toLocaleString()}`;
const pct = (n: number) => `${Math.abs(n).toFixed(1)}%`;

const WATERFALL_CONFIG: Record<string, { bg: string; text: string; border: string }> = {
    revenue: { bg: "bg-royal-blue", text: "text-white", border: "border-royal-blue" },
    deduction: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
    subtotal: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
    profit: { bg: "", text: "", border: "" }, // handled dynamically
};

const SEVERITY_CONFIG = {
    critical: { badge: "bg-red-100 text-red-700", border: "border-l-red-500", label: "Critical" },
    high: { badge: "bg-orange-100 text-orange-700", border: "border-l-orange-400", label: "High" },
    medium: { badge: "bg-yellow-100 text-yellow-700", border: "border-l-yellow-400", label: "Medium" },
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const LOADING_MSGS = [
    "Analyzing where your profit is going...",
    "Comparing against UAE industry benchmarks...",
    "Calculating your recovery opportunity...",
];

function SkeletonLoader() {
    const [msgIdx, setMsgIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setMsgIdx(i => (i + 1) % LOADING_MSGS.length), 2000);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="py-12 px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-5 h-5 rounded-full border-2 border-royal-blue border-t-transparent animate-spin" />
                <motion.p
                    key={msgIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-600 font-medium"
                >{LOADING_MSGS[msgIdx]}</motion.p>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
                {[80, 60, 90, 50, 70].map((w, i) => (
                    <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" style={{ width: `${w}%`, margin: "0 auto" }} />
                ))}
            </div>
        </div>
    );
}

// ─── Waterfall Row ────────────────────────────────────────────────────────────
function WaterfallRow({ row, maxAbs, idx, total }: { row: WaterfallRow; maxAbs: number; idx: number; total: number }) {
    const [hovered, setHovered] = useState(false);
    const [animated, setAnimated] = useState(false);
    useEffect(() => { const t = setTimeout(() => setAnimated(true), idx * 80); return () => clearTimeout(t); }, [idx]);

    const isProfit = row.type === "profit";
    const isRevenue = row.type === "revenue";
    const isPositiveProfit = isProfit && row.amount >= 0;
    const barWidth = maxAbs > 0 ? (Math.abs(row.amount) / maxAbs) * 100 : 0;

    let rowBg = "bg-white";
    let amtColor = "text-gray-700";
    let barColor = "#e5e7eb";

    if (isRevenue) { rowBg = "bg-royal-blue"; amtColor = "text-white"; barColor = "#1E40AF"; }
    else if (row.type === "subtotal") { rowBg = "bg-blue-50"; amtColor = "text-blue-800"; barColor = "#3b82f6"; }
    else if (isProfit) {
        rowBg = isPositiveProfit ? "bg-green-50" : "bg-red-50";
        amtColor = isPositiveProfit ? "text-green-700" : "text-red-700";
        barColor = isPositiveProfit ? "#22c55e" : "#ef4444";
    }
    else { barColor = "#ef4444"; } // deduction

    const tooltips: Record<string, string> = {
        "Total Revenue": "All money coming into the business before any costs are taken out.",
        "Cost of Sales": "Direct costs to deliver your product or service (materials, direct labour).",
        "Gross Profit": "What's left after paying for what you sell — before overhead.",
        "Operating Costs": "Day-to-day running costs like rent, utilities, software and marketing.",
        "Staff & Salaries": "All staff wages, benefits and payroll costs.",
        "Owner Withdrawal": "Money taken out by the owner as salary or dividends.",
        "Tax & Compliance": "Corporate tax, VAT obligations and accounting/legal fees.",
        "Hidden/Other Costs": "Miscellaneous, bank charges, depreciation, or unaccounted costs.",
        "Net Profit": "What the business actually keeps after everything is paid.",
    };

    return (
        <div
            className={`relative rounded-xl overflow-hidden transition-all group cursor-default select-none ${rowBg} ${isRevenue || isProfit || row.type === "subtotal" ? "border border-gray-100" : "border border-gray-100"}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-center px-4 py-3 gap-3">
                {/* Label */}
                <div className="flex items-center gap-2 w-44 md:w-52 flex-shrink-0">
                    {row.type === "deduction" && <span className="text-red-400 font-bold text-sm">−</span>}
                    {row.type === "subtotal" && <span className="text-blue-500 font-bold text-sm">=</span>}
                    {isProfit && <span className={`font-bold text-sm ${isPositiveProfit ? "text-green-600" : "text-red-600"}`}>=</span>}
                    <span className={`text-sm font-semibold ${isRevenue ? "text-white" : isProfit ? amtColor : "text-gray-700"} ${isRevenue || row.type === "subtotal" || isProfit ? "font-bold" : ""}`}>
                        {row.label}
                    </span>
                </div>

                {/* Bar */}
                <div className="flex-1 h-5 bg-white/30 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: animated ? `${barWidth}%` : "0%", backgroundColor: barColor, minWidth: barWidth > 0 ? "4px" : 0 }}
                    />
                </div>

                {/* Values */}
                <div className="text-right w-32 md:w-40 flex-shrink-0">
                    <span className={`text-sm font-bold ${isRevenue ? "text-white" : amtColor}`}>
                        {isRevenue ? "" : row.type === "deduction" ? "−" : ""}{fmt(row.amount)}
                    </span>
                    <span className={`text-xs ml-2 ${isRevenue ? "text-white/70" : "text-gray-400"}`}>{pct(row.percentOfRevenue)}</span>
                </div>
            </div>

            {/* Tooltip */}
            {hovered && tooltips[row.label] && (
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-4 mb-2 z-30 bg-navy text-white text-xs rounded-lg px-3 py-2 max-w-xs shadow-xl pointer-events-none"
                >
                    {tooltips[row.label]}
                </motion.div>
            )}

            {/* Progress arrow connector */}
            {idx < total - 1 && row.type !== "revenue" && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-gray-300 text-xs z-10">▼</div>
            )}
        </div>
    );
}

// ─── Recovery Box ─────────────────────────────────────────────────────────────
function RecoveryBox({ data }: { data: LeakageData["recoveryOpportunity"] }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 md:p-8"
        >
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-amber-800 text-sm uppercase tracking-wide">Your Recovery Opportunity</span>
            </div>

            <p className="text-4xl md:text-5xl font-bold text-navy mb-2">
                {fmt(data.totalMonthly)}<span className="text-xl font-normal text-gray-500">/month</span>
            </p>
            <p className="text-gray-600 mb-6">This is how much additional profit you could recover if you brought your top 3 leaks to industry average.</p>

            <div className="space-y-2 mb-5">
                {data.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 px-4 bg-white/70 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-amber-400 text-navy text-[10px] font-black flex items-center justify-center">{i + 1}</span>
                            <span className="text-sm font-medium text-gray-700">Fix {item.leak}</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">+ {fmt(item.monthlyRecovery)}/mo</span>
                    </div>
                ))}
                <div className="flex items-center justify-between py-3 px-4 bg-amber-100 rounded-xl border border-amber-300">
                    <span className="font-bold text-amber-900">Total Recovery Potential</span>
                    <div className="text-right">
                        <div className="font-bold text-amber-900">{fmt(data.totalMonthly)}/month</div>
                        <div className="text-xs text-amber-700">{fmt(data.totalAnnual)}/year</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props {
    leakage: LeakageData | null;
    loading: boolean;
    error: string | null;
}

export default function ProfitLeakageReport({ leakage, loading, error }: Props) {

    if (loading) return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="font-bold text-navy text-lg">Profit Leakage Report</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full uppercase tracking-wide">Pro Insight</span>
                </div>
            </div>
            <SkeletonLoader />
        </div>
    );

    if (error || !leakage) return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-bold text-navy text-lg">Profit Leakage Report</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full uppercase tracking-wide">Pro Insight</span>
            </div>
            <div className="p-8 text-center">
                <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <p className="font-semibold text-navy mb-1">More Detail Needed</p>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    We need a little more detail to calculate your profit leakage. Upload a P&amp;L statement or balance sheet for the full analysis.
                </p>
            </div>
        </div>
    );

    const maxAbs = Math.max(...leakage.waterfallData.map(r => Math.abs(r.amount)));
    const monthlyRevenue = leakage.waterfallData.find(r => r.type === "revenue")?.amount ?? 1;

    const roadmapMonths: Array<{ label: string; key: keyof typeof leakage.roadmap; color: string }> = [
        { label: "Month 1 — Quick Wins", key: "month1", color: "border-t-green-400" },
        { label: "Month 2 — Build Momentum", key: "month2", color: "border-t-blue-400" },
        { label: "Month 3 — Lock It In", key: "month3", color: "border-t-purple-400" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-2 px-6 py-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="font-bold text-navy text-lg">Profit Leakage Report</h3>
                    <span className="px-2.5 py-0.5 text-[10px] font-black bg-amber-100 text-amber-700 rounded-full uppercase tracking-wider border border-amber-200">
                        ✦ Pro Insight
                    </span>
                </div>
            </div>

            <div className="p-6 space-y-10">
                {/* Subtitle */}
                <p className="text-gray-600">
                    Your revenue looks healthy — but where is the profit actually going?{" "}
                    <strong className="text-navy">Here&apos;s exactly what&apos;s eating it.</strong>
                </p>

                {/* ── STEP 1: Waterfall ──────────────────────────────────── */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Step 1 — Revenue Waterfall</p>
                    <div className="space-y-1.5">
                        {leakage.waterfallData.map((row, i) => (
                            <WaterfallRow key={i} row={row} maxAbs={maxAbs} idx={i} total={leakage.waterfallData.length} />
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-3 italic">Hover each row to see what it means in plain English.</p>
                </div>

                {/* ── STEP 2: Top 3 Leaks ───────────────────────────────── */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Step 2 — Your Top 3 Profit Leaks</p>
                    <div className="grid md:grid-cols-3 gap-4">
                        {leakage.topLeaks.map((leak) => {
                            const cfg = SEVERITY_CONFIG[leak.severity];
                            return (
                                <div key={leak.rank} className={`border border-l-4 ${cfg.border} border-gray-100 rounded-xl p-5 space-y-3`}>
                                    <div className="flex items-center justify-between">
                                        <span className="w-8 h-8 rounded-full bg-gray-100 text-navy text-sm font-black flex items-center justify-center">
                                            #{leak.rank}
                                        </span>
                                        <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${cfg.badge}`}>{cfg.label}</span>
                                    </div>
                                    <p className="font-bold text-navy">{leak.category}</p>
                                    <div>
                                        <p className="text-2xl font-black text-red-600">{fmt(leak.monthlyAmount)}<span className="text-sm font-normal text-gray-500">/mo</span></p>
                                        <p className="text-xs text-gray-500">{pct(leak.percentOfRevenue)} of your revenue</p>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed">{leak.whyItsProblem}</p>
                                    <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2"><span className="font-semibold">Industry standard:</span> {leak.industryStandard}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── STEP 3: Benchmarks ────────────────────────────────── */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Step 3 — Industry Benchmark Comparison</p>
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-sm min-w-[480px]">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">Metric</th>
                                    <th className="text-center text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">You</th>
                                    <th className="text-center text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">UAE Average</th>
                                    <th className="text-center text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">Healthy Target</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {leakage.benchmarks.map((row, i) => {
                                    const diff = row.yourValue - row.uaeAverage;
                                    const isGood = diff >= 0;
                                    const isNear = Math.abs(diff) <= 5;
                                    const youCls = isGood
                                        ? "text-green-700 bg-green-50"
                                        : isNear
                                            ? "text-amber-700 bg-amber-50"
                                            : "text-red-700 bg-red-50";
                                    return (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-navy">{row.metric}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${youCls}`}>
                                                    {row.yourValue.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center text-gray-600 font-medium">{row.uaeAverage.toFixed(1)}%</td>
                                            <td className="px-4 py-3 text-center text-green-600 font-medium">{row.healthyTarget.toFixed(1)}%</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {leakage.benchmarkInsight && (
                        <p className="mt-4 px-4 py-3 bg-royal-blue/5 border border-royal-blue/15 rounded-xl text-sm font-medium text-navy">
                            💡 {leakage.benchmarkInsight}
                        </p>
                    )}
                </div>

                {/* ── STEP 4: Recovery Opportunity ─────────────────────── */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Step 4 — Recovery Opportunity</p>
                    <RecoveryBox data={leakage.recoveryOpportunity} />
                </div>

                {/* ── STEP 5: 90-Day Roadmap ────────────────────────────── */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Step 5 — Fix It Roadmap</p>
                    <h4 className="font-bold text-navy mb-4">How to Stop the Leaks — Your 90-Day Plan</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        {roadmapMonths.map(({ label, key, color }) => (
                            <div key={key} className={`border-t-4 ${color} border border-gray-100 rounded-xl p-5`}>
                                <p className="font-bold text-navy text-sm mb-4">{label}</p>
                                <div className="space-y-3">
                                    {leakage.roadmap[key].map((item, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-700 leading-relaxed">{item.action}</p>
                                                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${item.type === "DIY" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footnote */}
                <p className="text-xs text-gray-400 text-center border-t border-gray-100 pt-4">
                    Benchmarks based on UAE SME data. Individual results vary by industry and business model.
                </p>
            </div>
        </div>
    );
}
