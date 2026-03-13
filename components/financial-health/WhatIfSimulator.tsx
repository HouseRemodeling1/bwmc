"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Zap, TrendingUp, TrendingDown, Info, Loader2 } from "lucide-react";
import { callGeminiJSON } from "@/lib/gemini-client";
import { buildSimulatorPrompt } from "@/lib/gemini-prompts";

// ─── Types ────────────────────────────────────────────────────────────────────
import { FinancialReport, SubScoreDetail } from "../../app/financial-health-check/financial-types";

interface SubScores { profitability: SubScoreDetail; cashFlow: SubScoreDetail; costEfficiency: SubScoreDetail; growthTrend: SubScoreDetail; }

interface Sliders {
    revenueGrowth: number;
    expenseReduction: number;
    salaryChange: number;
    oneTimeCost: number;
    collectionDays: number;
    ownerWithdrawal: number;
}

interface SimulatedMetrics {
    healthScore: number;
    delta: number;
    monthlyProfit: number;
    baseMontlyProfit: number;
    cashRunway: number | null;
    vatStatus: "safe" | "approaching" | "exceeded";
    annualRevenue: number;
}

interface Verdict {
    verdict: "positive" | "risky" | "neutral";
    headline: string;
    explanation: string;
    biggestRisk: string;
    biggestOpportunity: string;
    recommendation: string;
}

interface Props {
    report: FinancialReport;
    extractedSummary: string;
    extractedText: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)); }

function runwayToScore(months: number | null): number {
    if (months === null) return 50;
    if (months <= 0) return 0;
    if (months >= 12) return 100;
    if (months >= 6) return 70 + ((months - 6) / 6) * 30;
    if (months >= 3) return 40 + ((months - 3) / 3) * 30;
    return (months / 3) * 40;
}

function deriveBases(report: FinancialReport) {
    const annualRevenue = report.riskAssessment.vatExposure.estimatedAnnualRevenue || 0;
    const monthlyRevenue = annualRevenue / 12;
    // Derive expenses from profitability score: profitMargin = profScore / 300
    const profitMargin = clamp(report.healthScore.subScores.profitability.score / 300, 0, 0.99);
    const monthlyProfit = monthlyRevenue * profitMargin;
    const monthlyExpenses = Math.max(0, monthlyRevenue - monthlyProfit);
    // Use monthlyTrend if available and richer
    const trend = report.financialPerformance.monthlyTrend;
    if (trend && trend.length > 0) {
        const last = trend[trend.length - 1];
        if (last.revenue > 0) {
            const rev = last.revenue;
            const exp = last.expenses;
            return { monthlyRevenue: rev, monthlyExpenses: exp, monthlySalaries: exp * 0.30 };
        }
    }
    return {
        monthlyRevenue,
        monthlyExpenses,
        monthlySalaries: monthlyExpenses * 0.30,
    };
}

function recalculate(report: FinancialReport, sliders: Sliders, bases: ReturnType<typeof deriveBases>): SimulatedMetrics {
    const { monthlyRevenue, monthlyExpenses, monthlySalaries } = bases;
    const nonSalaryExpenses = monthlyExpenses - monthlySalaries;

    const adjRevenue = monthlyRevenue * (1 + sliders.revenueGrowth / 100);
    const adjNonSalary = nonSalaryExpenses * (1 - sliders.expenseReduction / 100);
    const adjSalaries = monthlySalaries * (1 + sliders.salaryChange / 100);
    const totalExpenses = adjNonSalary + adjSalaries + (sliders.oneTimeCost / 12); // spread one-time over 12 months

    const adjProfit = adjRevenue - totalExpenses;
    const profitMargin = adjRevenue > 0 ? adjProfit / adjRevenue : 0;

    const newProfitabilityScore = clamp(profitMargin * 300, 0, 100);

    // Cash runway: collection speed improvement extends runway
    const baseRunway = report.riskAssessment.cashRunway.months;
    let newRunway: number | null = baseRunway;
    if (baseRunway !== null) {
        const runwayMultiplier = 1 + (sliders.collectionDays / 30) * 0.4 + (sliders.ownerWithdrawal / 100) * 0.3;
        const profitImpact = adjProfit > 0 ? 1 + (adjProfit / Math.max(monthlyExpenses, 1)) * 0.2 : 0.7;
        newRunway = Math.max(0, baseRunway * runwayMultiplier * profitImpact);
        newRunway = Math.round(newRunway * 10) / 10;
    }
    const newCashFlowScore = clamp(runwayToScore(newRunway), 0, 100);

    const expenseRatio = adjRevenue > 0 ? totalExpenses / adjRevenue : 1;
    const newCostEfficiency = clamp((1 - expenseRatio) * 200, 0, 100);

    const newGrowthTrend = clamp(50 + sliders.revenueGrowth * 1.5, 0, 100);

    const newHealthScore = Math.round(
        newProfitabilityScore * 0.35 +
        newCashFlowScore * 0.35 +
        newCostEfficiency * 0.20 +
        newGrowthTrend * 0.10
    );

    const annualRevenue = adjRevenue * 12;
    const vatStatus: "safe" | "approaching" | "exceeded" =
        annualRevenue > 375000 ? "exceeded" : annualRevenue > 300000 ? "approaching" : "safe";

    const baseMontlyProfit = monthlyRevenue - monthlyExpenses;

    return {
        healthScore: clamp(newHealthScore, 0, 100),
        delta: clamp(newHealthScore, 0, 100) - report.healthScore.overall,
        monthlyProfit: Math.round(adjProfit),
        baseMontlyProfit: Math.round(baseMontlyProfit),
        cashRunway: newRunway !== null ? Math.round(newRunway * 10) / 10 : null,
        vatStatus,
        annualRevenue: Math.round(annualRevenue),
    };
}

const DEFAULT_SLIDERS: Sliders = { revenueGrowth: 0, expenseReduction: 0, salaryChange: 0, oneTimeCost: 0, collectionDays: 0, ownerWithdrawal: 0 };

const PRESETS: Array<{ label: string; emoji: string; values: Partial<Sliders> }> = [
    { label: "Aggressive Growth", emoji: "🧪", values: { revenueGrowth: 30, expenseReduction: 0, salaryChange: 10, oneTimeCost: 0 } },
    { label: "Lean & Cut", emoji: "✂️", values: { expenseReduction: 20, salaryChange: -15, ownerWithdrawal: 30 } },
    { label: "Hire & Scale", emoji: "📦", values: { revenueGrowth: 20, salaryChange: 25, oneTimeCost: 20000 } },
    { label: "Stay the Course", emoji: "😌", values: { revenueGrowth: 0, expenseReduction: 0, salaryChange: 0, oneTimeCost: 0, collectionDays: 0, ownerWithdrawal: 0 } },
];

// ─── Animated Number ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const [displayed, setDisplayed] = useState(value);
    const animRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
    const startRef = useRef<{ from: number; to: number; start: number } | null>(null);

    useEffect(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        startRef.current = { from: displayed, to: value, start: performance.now() };
        const duration = 600;
        const step = (now: number) => {
            const elapsed = now - (startRef.current?.start ?? now);
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round((startRef.current?.from ?? value) + ((startRef.current?.to ?? value) - (startRef.current?.from ?? value)) * eased);
            setDisplayed(current);
            if (t < 1) animRef.current = requestAnimationFrame(step);
        };
        animRef.current = requestAnimationFrame(step);
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return <span>{prefix}{displayed.toLocaleString()}{suffix}</span>;
}

// ─── Slider Component ─────────────────────────────────────────────────────────
function SimSlider({
    label, tooltip, value, min, max, step, format, onChange
}: {
    label: string; tooltip: string; value: number; min: number; max: number; step: number;
    format: (v: number) => string; onChange: (v: number) => void;
}) {
    const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
    const isNonZero = value !== 0 && value !== min;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-navy text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 shadow-xl">
                            {tooltip}
                        </div>
                    </div>
                </div>
                <span className={`text-sm font-bold tabular-nums ${isNonZero ? "text-royal-blue" : "text-gray-500"}`}>
                    {format(value)}
                </span>
            </div>
            <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-royal-blue rounded-full transition-all duration-100"
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <input
                    type="range"
                    min={min} max={max} step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
                    style={{ height: "8px" }}
                />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400">
                <span>{format(min)}</span>
                <span>{format(max)}</span>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WhatIfSimulator({ report, extractedSummary, extractedText }: Props) {
    const [sliders, setSliders] = useState<Sliders>(DEFAULT_SLIDERS);
    const [verdict, setVerdict] = useState<Verdict | null>(null);
    const [verdictLoading, setVerdictLoading] = useState(false);
    const [verdictError, setVerdictError] = useState<string | null>(null);

    const bases = deriveBases(report);
    const metrics = recalculate(report, sliders, bases);

    const updateSlider = useCallback((key: keyof Sliders) => (v: number) => {
        setSliders(prev => ({ ...prev, [key]: v }));
        setVerdict(null);
    }, []);

    const applyPreset = (values: Partial<Sliders>) => {
        setSliders({ ...DEFAULT_SLIDERS, ...values });
        setVerdict(null);
    };

    const reset = () => { setSliders(DEFAULT_SLIDERS); setVerdict(null); setVerdictError(null); };

    const analyzeScenario = async () => {
        setVerdictLoading(true);
        setVerdictError(null);
        try {
            const prompt = buildSimulatorPrompt(
                extractedText || extractedSummary,
                report,
                sliders
            );
            const result = await callGeminiJSON<Verdict>(prompt);
            setVerdict(result);
        } catch (err: unknown) {
            setVerdictError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
        } finally {
            setVerdictLoading(false);
        }
    };

    const scoreColor = (s: number) => s >= 71 ? "text-green-600" : s >= 41 ? "text-amber-600" : "text-red-600";
    const scoreBg = (s: number) => s >= 71 ? "bg-green-50 border-green-200" : s >= 41 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";
    const vatConfig = { safe: { label: "Safe", cls: "bg-green-100 text-green-700" }, approaching: { label: "Approaching", cls: "bg-amber-100 text-amber-700" }, exceeded: { label: "Exceeded", cls: "bg-red-100 text-red-700" } };
    const verdictBorder = { positive: "border-green-400", risky: "border-red-400", neutral: "border-gray-400" };
    const verdictHeaderBg = { positive: "bg-green-50", risky: "bg-red-50", neutral: "bg-gray-50" };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-navy to-royal-blue px-6 py-6 md:py-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">What-If Simulator</h2>
                </div>
                <p className="text-white/80 text-sm md:text-base max-w-xl">
                    Test Your Decisions Before You Make Them — move the sliders and instantly see how each decision impacts your financial health score.
                </p>
            </div>

            <div className="p-6 space-y-8">
                {/* Scenario Presets */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Presets</p>
                    <div className="flex flex-wrap gap-2">
                        {PRESETS.map((p) => (
                            <button
                                key={p.label}
                                onClick={() => applyPreset(p.values)}
                                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:border-royal-blue hover:bg-royal-blue/5 hover:text-royal-blue transition-all"
                            >
                                <span>{p.emoji}</span>
                                <span>{p.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main grid: Sliders + Impact Panel */}
                <div className="grid lg:grid-cols-5 gap-8">

                    {/* Sliders — 3 cols */}
                    <div className="lg:col-span-3 space-y-6">
                        <SimSlider
                            label="If my monthly revenue increases by..."
                            tooltip="Simulate winning more clients or growing sales without changing costs."
                            value={sliders.revenueGrowth}
                            min={0} max={50} step={5}
                            format={(v) => `+${v}%`}
                            onChange={updateSlider("revenueGrowth")}
                        />
                        <SimSlider
                            label="If I cut my total expenses by..."
                            tooltip="Simulate renegotiating supplier contracts, reducing waste, or moving to cheaper premises."
                            value={sliders.expenseReduction}
                            min={0} max={40} step={5}
                            format={(v) => `-${v}%`}
                            onChange={updateSlider("expenseReduction")}
                        />
                        <SimSlider
                            label="If I adjust my salary/staff costs by..."
                            tooltip="Simulate hiring (+) or reducing headcount/salaries (-). Affects both costs and operational capacity."
                            value={sliders.salaryChange}
                            min={-30} max={30} step={5}
                            format={(v) => `${v > 0 ? "+" : ""}${v}%`}
                            onChange={updateSlider("salaryChange")}
                        />
                        <SimSlider
                            label="If I add a one-time expense of..."
                            tooltip="Simulate a large investment like equipment, a new lease deposit, or a marketing campaign."
                            value={sliders.oneTimeCost}
                            min={0} max={100000} step={5000}
                            format={(v) => v === 0 ? "AED 0" : `AED ${v.toLocaleString()}`}
                            onChange={updateSlider("oneTimeCost")}
                        />
                        <SimSlider
                            label="If I collect payments faster by..."
                            tooltip="Simulate chasing invoices sooner or switching to upfront payment terms. Improves cash flow."
                            value={sliders.collectionDays}
                            min={0} max={30} step={5}
                            format={(v) => v === 0 ? "0 days" : `${v} days earlier`}
                            onChange={updateSlider("collectionDays")}
                        />
                        <SimSlider
                            label="If I reduce owner withdrawals by..."
                            tooltip="Simulate leaving more money in the business instead of taking it out as owner salary or dividends."
                            value={sliders.ownerWithdrawal}
                            min={0} max={50} step={10}
                            format={(v) => `-${v}%`}
                            onChange={updateSlider("ownerWithdrawal")}
                        />
                    </div>

                    {/* Live Impact Panel — 2 cols */}
                    <div className="lg:col-span-2 space-y-3">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Impact</p>

                        {/* Health Score Card */}
                        <div className={`rounded-xl border p-4 transition-colors duration-300 ${scoreBg(metrics.healthScore)}`}>
                            <p className="text-xs text-gray-500 font-medium mb-1">New Health Score</p>
                            <p className={`text-3xl font-bold tabular-nums ${scoreColor(metrics.healthScore)}`}>
                                <AnimatedNumber value={metrics.healthScore} /><span className="text-lg font-normal text-gray-400">/100</span>
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                                {metrics.delta >= 0
                                    ? <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                                    : <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
                                <span className={`text-xs font-bold ${metrics.delta >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {metrics.delta >= 0 ? "+" : ""}{metrics.delta} points from current
                                </span>
                            </div>
                        </div>

                        {/* Monthly Profit */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <p className="text-xs text-gray-500 font-medium mb-1">Projected Monthly Profit</p>
                            <div className="flex items-end gap-2 flex-wrap">
                                <span className="text-sm text-gray-400 line-through">AED {bases.monthlyRevenue > 0 ? Math.round(metrics.baseMontlyProfit).toLocaleString() : "—"}</span>
                                <span className={`text-xl font-bold ${metrics.monthlyProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    <AnimatedNumber value={metrics.monthlyProfit} prefix="AED " />
                                </span>
                            </div>
                        </div>

                        {/* Cash Runway */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <p className="text-xs text-gray-500 font-medium mb-1">Cash Runway</p>
                            {metrics.cashRunway !== null ? (
                                <div className="flex items-end gap-2 flex-wrap">
                                    {report.riskAssessment.cashRunway.months !== null && (
                                        <span className="text-sm text-gray-400 line-through">{report.riskAssessment.cashRunway.months} mo</span>
                                    )}
                                    <span className={`text-xl font-bold ${metrics.cashRunway >= 6 ? "text-green-600" : metrics.cashRunway >= 3 ? "text-amber-600" : "text-red-600"}`}>
                                        <AnimatedNumber value={metrics.cashRunway} suffix=" months" />
                                    </span>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">Insufficient data</p>
                            )}
                        </div>

                        {/* VAT Status */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <p className="text-xs text-gray-500 font-medium mb-2">VAT Status</p>
                            <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${vatConfig[metrics.vatStatus].cls}`}>
                                    {vatConfig[metrics.vatStatus].label}
                                </span>
                                <span className="text-xs text-gray-500">AED {Math.round(metrics.annualRevenue).toLocaleString()}/yr</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analyze Button + Reset */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                        onClick={analyzeScenario}
                        disabled={verdictLoading}
                        className="flex items-center gap-2 bg-royal-blue hover:bg-navy text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow hover:shadow-lg disabled:opacity-60"
                    >
                        {verdictLoading
                            ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing Scenario...</>
                            : <><Zap className="w-4 h-4" />Analyze This Scenario</>}
                    </button>
                    <button onClick={reset} className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy border border-gray-200 px-5 py-3.5 rounded-xl bg-white hover:border-gray-400 transition-all">
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset Simulator
                    </button>
                </div>

                {/* Error */}
                {verdictError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">{verdictError}</div>
                )}

                {/* Verdict Card */}
                <AnimatePresence>
                    {verdict && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`rounded-2xl border-2 overflow-hidden ${verdictBorder[verdict.verdict]}`}
                        >
                            <div className={`px-6 py-4 ${verdictHeaderBg[verdict.verdict]}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${verdict.verdict === "positive" ? "bg-green-200 text-green-800" : verdict.verdict === "risky" ? "bg-red-200 text-red-800" : "bg-gray-200 text-gray-700"}`}>
                                        {verdict.verdict === "positive" ? "✅ Positive Scenario" : verdict.verdict === "risky" ? "⚠️ Risky Scenario" : "📊 Neutral Scenario"}
                                    </span>
                                </div>
                                <p className="text-lg md:text-xl font-bold text-navy mt-2">{verdict.headline}</p>
                            </div>
                            <div className="px-6 py-5 space-y-4">
                                <p className="text-gray-700 leading-relaxed">{verdict.explanation}</p>

                                <div className="grid md:grid-cols-2 gap-3">
                                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                        <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Biggest Risk</p>
                                        <p className="text-sm text-gray-700">{verdict.biggestRisk}</p>
                                    </div>
                                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                        <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Biggest Opportunity</p>
                                        <p className="text-sm text-gray-700">{verdict.biggestOpportunity}</p>
                                    </div>
                                </div>

                                <div className="bg-royal-blue/5 border border-royal-blue/20 rounded-xl p-4">
                                    <p className="text-xs font-bold text-royal-blue uppercase tracking-wide mb-1">Recommended Action</p>
                                    <p className="text-sm text-navy font-medium">{verdict.recommendation}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Disclaimer */}
                <p className="text-xs text-gray-400 text-center border-t border-gray-100 pt-4">
                    ℹ️ This simulator estimates impact based on your uploaded data. For accurate forecasting, consult a financial advisor.
                </p>
            </div>

            {/* Slider thumb styling */}
            <style>{`
                input[type=range]::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #1E40AF; cursor: pointer; box-shadow: 0 0 0 3px rgba(30,64,175,0.15); }
                input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #1E40AF; cursor: pointer; border: none; }
                input[type=range]:focus { outline: none; }
            `}</style>
        </div>
    );
}
