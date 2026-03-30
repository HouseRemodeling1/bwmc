"use client";

import { 
    TrendingUp, TrendingDown, Target, Zap, ShieldAlert, CheckCircle, 
    ArrowUpRight, ArrowDownRight, Minus, BarChart3, PieChart, Activity
} from "lucide-react";
import { RatiosReport } from "@/app/financial-health-check/financial-types";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface Props {
    report: RatiosReport;
}

const formatPct = (val: number) => 
    new Intl.NumberFormat("en-AE", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val / 100);

const formatNum = (val: number) => 
    new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

const formatAED = (val: number) => 
    new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(val);

export default function RatiosReportView({ report }: Props) {
    
    const ratingColors = {
        excellent: "bg-green-500",
        good: "bg-blue-500",
        fair: "bg-amber-500",
        poor: "bg-red-500"
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 1. Executive Summary Card */}
            <div className="bg-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-royal-blue/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <p className="text-sky-blue text-[10px] font-black uppercase tracking-[0.3em] mb-2">CFO Executive Summary</p>
                            <h2 className="text-3xl md:text-4xl font-black">Financial Performance Analysis</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Overall Rating</span>
                            <div className={`${ratingColors[report.executiveSummary.overallRating]} px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm shadow-xl`}>
                                {report.executiveSummary.overallRating}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Strengths */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4 text-green-400">
                                <TrendingUp className="w-5 h-5" />
                                <h4 className="font-black uppercase text-[10px] tracking-widest">Key Strengths</h4>
                            </div>
                            <ul className="space-y-3">
                                {report.executiveSummary.topStrengths.map((s, i) => (
                                    <li key={i} className="text-sm font-medium flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500/50 shrink-0 mt-0.5" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Risks */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4 text-red-400">
                                <ShieldAlert className="w-5 h-5" />
                                <h4 className="font-black uppercase text-[10px] tracking-widest">Risk Factors</h4>
                            </div>
                            <ul className="space-y-3">
                                {report.executiveSummary.topRisks.map((r, i) => (
                                    <li key={i} className="text-sm font-medium flex items-start gap-2">
                                        <ShieldAlert className="w-4 h-4 text-red-500/50 shrink-0 mt-0.5" />
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4 text-sky-blue">
                                <Zap className="w-5 h-5" />
                                <h4 className="font-black uppercase text-[10px] tracking-widest">Priority Actions</h4>
                            </div>
                            <ul className="space-y-3">
                                {report.executiveSummary.priorityActions.map((a, i) => (
                                    <li key={i} className="text-sm font-medium flex items-start gap-2">
                                        <div className="w-4 h-4 rounded-full bg-sky-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-[10px] font-black text-sky-blue">{i+1}</span>
                                        </div>
                                        {a}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Core Ratio Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Liquidity */}
                <RatioCategoryCard 
                    title="Liquidity" 
                    subtitle="Ability to pay short-term debt"
                    analysis={report.liquidity.analysis}
                    metrics={[
                        { label: "Current Ratio", value: report.liquidity.currentRatio, format: "num" },
                        { label: "Quick Ratio", value: report.liquidity.quickRatio, format: "num" },
                        { label: "Cash Ratio", value: report.liquidity.cashRatio, format: "num" }
                    ]}
                    icon={<Activity className="w-5 h-5" />}
                />

                {/* Profitability */}
                <RatioCategoryCard 
                    title="Profitability" 
                    subtitle="Efficiency in generating profit"
                    analysis={report.profitability.analysis}
                    metrics={[
                        { label: "Gross Margin", value: report.profitability.grossMargin, format: "pct" },
                        { label: "Net Margin", value: report.profitability.netMargin, format: "pct" },
                        { label: "ROA", value: report.profitability.roa, format: "pct" }
                    ]}
                    icon={<TrendingUp className="w-5 h-5" />}
                />

                {/* Leverage */}
                <RatioCategoryCard 
                    title="Leverage" 
                    subtitle="Financial risk and debt structure"
                    analysis={report.leverage.analysis}
                    metrics={[
                        { label: "Debt-to-Equity", value: report.leverage.debtToEquity, format: "num" },
                        { label: "Debt-to-Assets", value: report.leverage.debtToAssets, format: "num" },
                        { label: "Interest Coverage", value: report.leverage.interestCoverageRatio, format: "num" }
                    ]}
                    icon={<Zap className="w-5 h-5" />}
                />

                {/* Working Capital */}
                <RatioCategoryCard 
                    title="Efficiency" 
                    subtitle="Operational & cash cycle metrics"
                    analysis={report.workingCapital.analysis}
                    metrics={[
                        { label: "CCC (Days)", value: report.workingCapital.cashConversionCycle, format: "num" },
                        { label: "Receivable Days", value: report.workingCapital.daysReceivable, format: "num" },
                        { label: "Days Payable", value: report.workingCapital.daysPayable, format: "num" }
                    ]}
                    icon={<BarChart3 className="w-5 h-5" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3. Benchmarks Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-navy uppercase text-sm tracking-wider">
                            <Target className="w-5 h-5 text-royal-blue" />
                            UAE SME Benchmarks
                        </div>
                    </div>
                    <div className="p-6">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                    <th className="pb-4">Metric</th>
                                    <th className="pb-4">Your Value</th>
                                    <th className="pb-4">UAE Average</th>
                                    <th className="pb-4 text-right">Rating</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {report.benchmarks.map((b, i) => (
                                    <tr key={i} className="group">
                                        <td className="py-4 font-bold text-navy text-sm">{b.metric}</td>
                                        <td className="py-4 font-mono font-medium">{b.userValue > 1 ? formatNum(b.userValue) : formatPct(b.userValue * 100)}</td>
                                        <td className="py-4 font-mono text-gray-400">{b.uaeAverage > 1 ? formatNum(b.uaeAverage) : formatPct(b.uaeAverage * 100)}</td>
                                        <td className="py-4 text-right">
                                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                                                b.rating === "strong" ? "bg-green-100 text-green-700" :
                                                b.rating === "average" ? "bg-amber-100 text-amber-700" :
                                                "bg-red-100 text-red-700"
                                            }`}>
                                                {b.rating}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 4. ROI Section */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <PieChart className="w-20 h-20" />
                        </div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Return on Investment</p>
                        <p className="text-5xl font-black text-navy mb-2">{formatPct(report.roi.returnOnInvestment)}</p>
                        <p className="text-xs text-gray-500 font-medium">Efficiency of capital deployment</p>
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">ROCE</p>
                            <p className="text-2xl font-bold text-navy">{formatPct(report.roi.returnOnCapitalEmployed)}</p>
                        </div>
                    </div>

                    <div className="bg-sky-blue rounded-2xl p-6 text-navy">
                        <h4 className="font-black text-xs uppercase tracking-wider mb-2">CFO Insight</h4>
                        <p className="text-sm font-medium leading-relaxed opacity-80">{report.roi.analysis}</p>
                    </div>
                </div>
            </div>

            {/* 5. Trends Table (If exists) */}
            {report.trends && report.trends.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                         <div className="flex items-center gap-2 font-black text-navy uppercase text-sm tracking-[0.2em]">
                            <TrendingUp className="w-5 h-5 text-royal-blue" />
                            Trend Analysis (MoM / QoQ)
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {report.trends.map((t, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                        t.direction === "up" ? "bg-green-100" :
                                        t.direction === "down" ? "bg-red-100" : "bg-gray-100"
                                    }`}>
                                        {t.direction === "up" ? <ArrowUpRight className="w-6 h-6 text-green-600" /> :
                                         t.direction === "down" ? <ArrowDownRight className="w-6 h-6 text-red-600" /> :
                                         <Minus className="w-6 h-6 text-gray-400" />}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.metric}</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-navy">{t.value > 1000 ? formatAED(t.value) : formatNum(t.value)}</span>
                                            <span className={`text-xs font-black ${t.change > 0 ? "text-green-600" : "text-red-600"}`}>
                                                {t.change > 0 ? "+" : ""}{t.change}%
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 font-bold">{t.period}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function RatioCategoryCard({ title, subtitle, analysis, metrics, icon }: { title: string, subtitle: string, analysis: string, metrics: any[], icon: any }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col group hover:border-royal-blue transition-all">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-royal-blue group-hover:bg-royal-blue group-hover:text-white transition-all">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-navy leading-none mb-1">{title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{subtitle}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-1 truncate">{m.label}</p>
                        <p className="text-lg font-bold text-navy">
                            {m.format === "pct" ? formatPct(m.value) : formatNum(m.value)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-50 text-sm italic text-gray-600 leading-relaxed">
                "{analysis}"
            </div>
        </div>
    );
}
