"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload, FileText, Table, BarChart2, AlertTriangle, CheckCircle,
    ChevronRight, Download, Mail, RefreshCw, MessageCircle, Send,
    TrendingUp, TrendingDown, Shield, ArrowRight, X, Activity, Eye, EyeOff, Key
} from "lucide-react";
import WhatIfSimulator from "@/components/financial-health/WhatIfSimulator";
import ProfitLeakageReport from "@/components/financial-health/ProfitLeakageReport";
import { callGemini, callGeminiJSON, parseFileToText } from "@/lib/gemini-client";
import { buildMainReportPrompt, buildLeakagePrompt, buildChatPrompt } from "@/lib/gemini-prompts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SubScores { profitability: number; cashFlow: number; costEfficiency: number; growthTrend: number; }
interface RedFlag { severity: "critical" | "warning" | "watch"; title: string; whyItMatters: string; whatToDo: string; }
interface MoneyDrain { category: string; theirPercentage: number; industryAverage: number; }
interface MonthlyTrend { month: string; revenue: number; expenses: number; }
interface VatExposure { status: "safe" | "approaching" | "exceeded"; estimatedAnnualRevenue: number; explanation: string; }
interface Recommendation { title: string; explanation: string; difficulty: "Easy" | "Medium" | "Needs Expert Help"; }

interface FinancialReport {
    healthScore: number;
    subScores: SubScores;
    summary: string;
    redFlags: RedFlag[];
    topMoneyDrains: MoneyDrain[];
    monthlyTrend: MonthlyTrend[];
    vatExposure: VatExposure;
    cashRunwayMonths: number | null;
    recommendations: Recommendation[];
    pointsFromPerfect: number;
}

interface ChatMessage { role: "user" | "ai"; text: string; }

type PageState = "hero" | "upload" | "processing" | "report";

const PROCESSING_STEPS = [
    "Reading your numbers...",
    "Spotting patterns...",
    "Building your report...",
];

// ─── Helper Components ─────────────────────────────────────────────────────────
function ScoreCircle({ score }: { score: number }) {
    const [animated, setAnimated] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => setAnimated(score), 300);
        return () => clearTimeout(timer);
    }, [score]);
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (animated / 100) * circumference;
    const color = score >= 71 ? "#22c55e" : score >= 41 ? "#f59e0b" : "#ef4444";
    const label = score >= 71 ? "Healthy" : score >= 41 ? "Needs Attention" : "At Risk";

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="14" />
                    <circle
                        cx="90" cy="90" r={radius} fill="none"
                        stroke={color} strokeWidth="14"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-navy">{animated}</span>
                    <span className="text-sm text-gray-500">/ 100</span>
                </div>
            </div>
            <span className="px-4 py-1.5 rounded-full text-sm font-bold text-white" style={{ backgroundColor: color }}>{label}</span>
        </div>
    );
}

function ProgressBar({ value, label, color }: { value: number; label: string; color: string }) {
    const [width, setWidth] = useState(0);
    useEffect(() => { const t = setTimeout(() => setWidth(value), 500); return () => clearTimeout(t); }, [value]);
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">{label}</span>
                <span className="font-semibold text-navy">{value}</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%`, backgroundColor: color }} />
            </div>
        </div>
    );
}

function SeverityBadge({ severity }: { severity: string }) {
    const config = {
        critical: { color: "bg-red-100 text-red-700 border-red-200", label: "Critical" },
        warning: { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Warning" },
        watch: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Watch" },
    }[severity] ?? { color: "bg-gray-100 text-gray-700 border-gray-200", label: severity };
    return <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${config.color}`}>{config.label}</span>;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
    const config: Record<string, string> = {
        "Easy": "bg-green-100 text-green-700",
        "Medium": "bg-amber-100 text-amber-700",
        "Needs Expert Help": "bg-purple-100 text-purple-700",
    };
    return <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${config[difficulty] || "bg-gray-100 text-gray-700"}`}>{difficulty}</span>;
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                <div className="w-9 h-9 rounded-xl bg-royal-blue/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-royal-blue" />
                </div>
                <h3 className="font-bold text-navy text-lg">{title}</h3>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function FinancialHealthClient() {
    const [pageState, setPageState] = useState<PageState>("hero");
    const [isDragging, setIsDragging] = useState(false);
    const [showManual, setShowManual] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);
    const [report, setReport] = useState<FinancialReport | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [emailInput, setEmailInput] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [extractedSummary, setExtractedSummary] = useState<string>("");
    const [extractedText, setExtractedText] = useState<string>(""); // cached for chat & simulator

    // API Key state (in-memory only, never persisted)
    const [apiKey, setApiKey] = useState<string>("");
    const [apiKeyInput, setApiKeyInput] = useState<string>("");
    const [apiKeySaved, setApiKeySaved] = useState(false);
    const [showKeyInput, setShowKeyInput] = useState(false);

    // Leakage state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [leakageData, setLeakageData] = useState<any>(null);
    const [leakageLoading, setLeakageLoading] = useState(false);
    const [leakageError, setLeakageError] = useState<string | null>(null);

    // ── Core: run Main Report + Leakage in parallel ──────────────────────────
    const runAnalysis = async (text: string) => {
        setExtractedText(text);
        runProcessingAnimation(async () => {
            try {
                const [reportResult, leakageResult] = await Promise.allSettled([
                    callGeminiJSON<FinancialReport>(apiKey, buildMainReportPrompt(text)),
                    callGeminiJSON(apiKey, buildLeakagePrompt(text)),
                ]);

                if (reportResult.status === "rejected") {
                    setError(reportResult.reason?.message || "Analysis failed. Please try again.");
                    setPageState("upload");
                    return;
                }

                setReport(reportResult.value);
                setPageState("report");
                setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth" }), 200);

                if (leakageResult.status === "fulfilled") { setLeakageData(leakageResult.value); }
                else { setLeakageError(leakageResult.reason?.message || "Leakage analysis failed."); }
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
                setPageState("upload");
            } finally {
                setLeakageLoading(false);
            }
        });
        setLeakageLoading(true);
        setLeakageError(null);
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
        if (!apiKey) { setError("Please enter your Gemini API key to get started."); return; }
        setError(null);
        if (file.size > 10 * 1024 * 1024) { setError("File is too large. Maximum size is 10MB."); return; }
        try {
            const text = await parseFileToText(file);
            setExtractedSummary(file.name);
            await runAnalysis(text);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to read your file. Please try a different format.");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiKey]);

    const analyzeManual = async () => {
        if (!apiKey) { setError("Please enter your Gemini API key to get started."); return; }
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
            const answer = await callGemini(apiKey, buildChatPrompt(extractedText, report, question));
            setChatMessages(prev => [...prev, { role: "ai", text: answer || "Sorry, I couldn't answer that." }]);
        } catch (err: unknown) {
            setChatMessages(prev => [...prev, { role: "ai", text: err instanceof Error ? err.message : "Sorry, I had trouble connecting." }]);
        } finally {
            setChatLoading(false);
        }
    };

    const resetPage = () => {
        setReport(null);
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
        setPageState("upload");
        setTimeout(() => uploadRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const handlePrint = () => window.print();

    const scoreColor = (s: number) => s >= 71 ? "#22c55e" : s >= 41 ? "#f59e0b" : "#ef4444";
    const subScoreColor = (s: number) => s >= 71 ? "#22c55e" : s >= 41 ? "#f59e0b" : "#ef4444";

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
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                            {["No signup required", "Your data is never stored", "Results in under 30 seconds"].map((badge) => (
                                <div key={badge} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-white/90 text-sm font-medium">{badge}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={scrollToUpload}
                            className="inline-flex items-center gap-2 bg-sky-blue hover:bg-royal-blue text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-sky-blue/30 hover:shadow-2xl transform hover:-translate-y-0.5 text-lg"
                        >
                            Analyze My Financials
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── UPLOAD ───────────────────────────────────────────────────── */}
            <section ref={uploadRef} className="py-20 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-navy mb-3">Upload Your Financial Document</h2>
                        <p className="text-gray-600">PDF, Excel (.xlsx) or CSV — any standard financial document works.</p>
                    </div>

                    {/* ── API KEY PANEL ─────────────────────────────────── */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-royal-blue/10 flex items-center justify-center">
                                <Key className="w-4 h-4 text-royal-blue" />
                            </div>
                            <span className="font-bold text-navy text-sm">Gemini API Key</span>
                        </div>

                        {!apiKeySaved ? (
                            <>
                                <label className="block text-xs font-medium text-gray-600 mb-2">
                                    Enter your Gemini API Key to get started
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type={showKeyInput ? "text" : "password"}
                                            value={apiKeyInput}
                                            onChange={e => setApiKeyInput(e.target.value)}
                                            onKeyDown={e => { if (e.key === "Enter" && apiKeyInput.trim()) { setApiKey(apiKeyInput.trim()); setApiKeySaved(true); } }}
                                            placeholder="AIza..."
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowKeyInput(v => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy"
                                        >
                                            {showKeyInput ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => { if (apiKeyInput.trim()) { setApiKey(apiKeyInput.trim()); setApiKeySaved(true); } }}
                                        className="bg-royal-blue text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-navy transition-colors text-sm whitespace-nowrap"
                                    >
                                        Save Key
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                    <Shield className="w-3 h-3 text-green-500" />
                                    Your API key and financial data are used only to generate your report and are never stored or shared.
                                </p>
                            </>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-sm font-semibold text-green-700">API Key active</span>
                                    <span className="text-xs text-gray-400">({apiKey.slice(0, 6)}...{apiKey.slice(-4)})</span>
                                </div>
                                <button
                                    onClick={() => { setApiKeySaved(false); setApiKeyInput(""); setApiKey(""); }}
                                    className="text-xs text-royal-blue hover:text-navy underline underline-offset-2 font-medium"
                                >
                                    Change key
                                </button>
                            </div>
                        )}
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
                {pageState === "report" && report && (
                    <motion.div
                        ref={reportRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="py-12 px-6 lg:px-8 bg-gray-50 print:py-4 print:px-4"
                        id="report-content"
                    >
                        <div className="max-w-4xl mx-auto space-y-8">

                            {/* Header strip */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-navy">Your Financial Health Report</h2>
                                    <p className="text-gray-500 mt-1">Generated on {new Date().toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })}</p>
                                </div>
                                <button
                                    onClick={resetPage}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy border border-gray-200 bg-white px-4 py-2 rounded-xl transition-colors print:hidden"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Analyze Another File
                                </button>
                            </div>

                            {/* 3A — Health Score */}
                            <SectionCard title="Overall Health Score" icon={Activity}>
                                <div className="flex flex-col md:flex-row items-center gap-10">
                                    <ScoreCircle score={report.healthScore} />
                                    <div className="flex-1 space-y-4 w-full">
                                        <ProgressBar value={report.subScores.profitability} label="Profitability" color={subScoreColor(report.subScores.profitability)} />
                                        <ProgressBar value={report.subScores.cashFlow} label="Cash Flow" color={subScoreColor(report.subScores.cashFlow)} />
                                        <ProgressBar value={report.subScores.costEfficiency} label="Cost Efficiency" color={subScoreColor(report.subScores.costEfficiency)} />
                                        <ProgressBar value={report.subScores.growthTrend} label="Growth Trend" color={subScoreColor(report.subScores.growthTrend)} />
                                    </div>
                                </div>
                            </SectionCard>

                            {/* 3B — Plain English Summary */}
                            <SectionCard title="What This Means For You" icon={MessageCircle}>
                                <p className="text-gray-700 leading-relaxed text-[1.05rem]"
                                    dangerouslySetInnerHTML={{
                                        __html: report.summary.replace(
                                            /\*\*(.*?)\*\*/g,
                                            '<strong class="text-navy font-semibold">$1</strong>'
                                        )
                                    }}
                                />
                            </SectionCard>

                            {/* 3C — Red Flags */}
                            <SectionCard title="Red Flags" icon={AlertTriangle}>
                                {report.redFlags.length === 0 ? (
                                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
                                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-green-800 text-lg">All Clear! 🎉</p>
                                            <p className="text-green-700 text-sm mt-1">No significant financial red flags were detected in your data.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {report.redFlags.map((flag, i) => (
                                            <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <SeverityBadge severity={flag.severity} />
                                                    <p className="font-bold text-navy">{flag.title}</p>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2"><span className="font-semibold text-gray-700">Why it matters: </span>{flag.whyItMatters}</p>
                                                <p className="text-sm text-gray-600"><span className="font-semibold text-royal-blue">What to do: </span>{flag.whatToDo}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </SectionCard>

                            {/* 3D — Top Money Drains */}
                            {report.topMoneyDrains.length > 0 && (
                                <SectionCard title="Top Money Drains" icon={TrendingDown}>
                                    <div className="space-y-5">
                                        {report.topMoneyDrains.map((drain, i) => {
                                            const isHigh = drain.theirPercentage > drain.industryAverage;
                                            return (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium text-navy">{drain.category}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isHigh ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                                                {isHigh ? "Above avg" : "Below avg"}
                                                            </span>
                                                            {isHigh ? <TrendingUp className="w-4 h-4 text-red-500" /> : <TrendingDown className="w-4 h-4 text-green-500" />}
                                                        </div>
                                                    </div>
                                                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                                                        <div
                                                            className="absolute left-0 top-0 h-full rounded-lg transition-all duration-1000 flex items-center"
                                                            style={{ width: `${Math.min(drain.theirPercentage, 100)}%`, backgroundColor: isHigh ? "#ef4444" : "#22c55e" }}
                                                        >
                                                            <span className="text-white text-xs font-bold pl-3">{drain.theirPercentage}%</span>
                                                        </div>
                                                        <div className="absolute top-0 h-full w-0.5 bg-navy/30" style={{ left: `${Math.min(drain.industryAverage, 100)}%` }} />
                                                    </div>
                                                    <p className="text-xs text-gray-400">Industry average: {drain.industryAverage}%</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </SectionCard>
                            )}

                            {/* 3D-PRO — Profit Leakage Report */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                            >
                                <ProfitLeakageReport
                                    leakage={leakageData}
                                    loading={leakageLoading}
                                    error={leakageError}
                                />
                            </motion.div>

                            {/* 3E — Monthly Trend */}
                            {report.monthlyTrend.length > 1 && (() => {
                                const revenues = report.monthlyTrend.map(m => m.revenue);
                                const bestIdx = revenues.indexOf(Math.max(...revenues));
                                const worstIdx = revenues.indexOf(Math.min(...revenues));
                                const max = Math.max(...report.monthlyTrend.flatMap(m => [m.revenue, m.expenses]));
                                return (
                                    <SectionCard title="Month-by-Month Trend" icon={TrendingUp}>
                                        <div className="space-y-3">
                                            {report.monthlyTrend.map((m, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <span className="w-14 text-xs text-gray-500 font-medium">{m.month}</span>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-4 bg-royal-blue/70 rounded-sm" style={{ width: `${(m.revenue / max) * 100}%`, minWidth: "4px" }} />
                                                            <span className="text-xs text-gray-500">Rev {i === bestIdx && <span className="text-green-600 font-bold">↑ Best</span>}{i === worstIdx && <span className="text-red-600 font-bold">↓ Worst</span>}</span>
                                                        </div>
                                                        <div className="h-4 bg-red-400/60 rounded-sm" style={{ width: `${(m.expenses / max) * 100}%`, minWidth: "4px" }} />
                                                    </div>
                                                    <div className="text-right w-28 text-xs text-gray-500">
                                                        <div className="text-royal-blue font-semibold">AED {m.revenue.toLocaleString()}</div>
                                                        <div className="text-red-500">AED {m.expenses.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex gap-4 pt-2 text-xs text-gray-400">
                                                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-royal-blue/70 rounded-sm inline-block" /> Revenue</span>
                                                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400/60 rounded-sm inline-block" /> Expenses</span>
                                            </div>
                                        </div>
                                    </SectionCard>
                                );
                            })()}

                            {/* 3F — VAT Exposure */}
                            <SectionCard title="VAT Exposure Check" icon={Shield}>
                                {(() => {
                                    const v = report.vatExposure;
                                    const config = {
                                        safe: { color: "border-green-200 bg-green-50", dot: "bg-green-500", label: "Safe", text: "text-green-800" },
                                        approaching: { color: "border-amber-200 bg-amber-50", dot: "bg-amber-500", label: "Approaching Threshold", text: "text-amber-800" },
                                        exceeded: { color: "border-red-200 bg-red-50", dot: "bg-red-500", label: "Threshold Exceeded", text: "text-red-800" },
                                    }[v.status];
                                    return (
                                        <div className={`border rounded-xl p-5 ${config.color}`}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`w-3 h-3 rounded-full ${config.dot}`} />
                                                <span className={`font-bold text-sm ${config.text}`}>{config.label}</span>
                                            </div>
                                            <p className={`text-2xl font-bold mb-1 ${config.text}`}>AED {v.estimatedAnnualRevenue.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500 mb-3">Estimated annual revenue vs. AED 375,000 threshold</p>
                                            <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${config.dot}`} style={{ width: `${Math.min((v.estimatedAnnualRevenue / 375000) * 100, 100)}%` }} />
                                            </div>
                                            <p className={`text-sm mt-3 ${config.text}`}>{v.explanation}</p>
                                        </div>
                                    );
                                })()}
                            </SectionCard>

                            {/* 3G — Cash Runway */}
                            {report.cashRunwayMonths !== null && (
                                <SectionCard title="Cash Runway" icon={Activity}>
                                    <div className="text-center py-3">
                                        <p className="text-5xl font-bold text-navy mb-2">
                                            {report.cashRunwayMonths} <span className="text-2xl font-normal text-gray-500">months</span>
                                        </p>
                                        <p className="text-gray-600 mb-6">You have approximately <strong className="text-navy">{report.cashRunwayMonths} months of runway</strong> before cash reserves run out at current spending.</p>
                                        <div className="h-5 bg-gray-100 rounded-full overflow-hidden max-w-sm mx-auto">
                                            {(() => {
                                                const pct = Math.min((report.cashRunwayMonths / 24) * 100, 100);
                                                const color = pct > 60 ? "#22c55e" : pct > 30 ? "#f59e0b" : "#ef4444";
                                                return <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: color }} />;
                                            })()}
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                                            <span>0 mo</span><span>12 mo</span><span>24+ mo</span>
                                        </div>
                                    </div>
                                </SectionCard>
                            )}

                            {/* 3H — Recommendations */}
                            <SectionCard title="Top 5 Recommendations" icon={ChevronRight}>
                                <div className="space-y-4">
                                    {report.recommendations.map((rec, i) => (
                                        <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <span className="w-8 h-8 rounded-full bg-royal-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <p className="font-bold text-navy">{rec.title}</p>
                                                    <DifficultyBadge difficulty={rec.difficulty} />
                                                </div>
                                                <p className="text-sm text-gray-600">{rec.explanation}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>

                            {/* 3I — AI Chat */}
                            <SectionCard title="Ask AI About Your Report" icon={MessageCircle}>
                                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                    {chatMessages.length === 0 && (
                                        <p className="text-gray-400 text-sm text-center py-4">Ask anything about your report...</p>
                                    )}
                                    {chatMessages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-royal-blue text-white rounded-tr-none" : "bg-gray-100 text-gray-800 rounded-tl-none"}`}>
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
                                        placeholder="Ask anything about your report... e.g. Why is my margin low?"
                                        disabled={chatLoading}
                                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue disabled:opacity-50"
                                    />
                                    <button
                                        onClick={sendChat}
                                        disabled={chatLoading || !chatInput.trim()}
                                        className="bg-royal-blue text-white px-4 py-3 rounded-xl hover:bg-navy disabled:opacity-50 transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </SectionCard>

                            {/* ── WHAT-IF SIMULATOR ────────────────────────── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <WhatIfSimulator report={report} extractedSummary={extractedSummary} apiKey={apiKey} extractedText={extractedText} />
                            </motion.div>

                            {/* ── SAVE & SHARE ─────────────────────────────── */}
                            <div className="bg-navy rounded-2xl p-8 text-center print:hidden">
                                <p className="text-white/70 text-sm uppercase tracking-wide mb-2">Your Score Summary</p>
                                <p className="text-2xl font-bold text-white mb-1">
                                    Your business is{" "}
                                    <span className="text-sky-blue">{report.pointsFromPerfect} points</span>{" "}
                                    away from a perfect score.
                                </p>
                                <p className="text-white/70 mb-8">Our team can help you close exactly that gap.</p>

                                <div className="flex flex-wrap gap-3 justify-center mb-8">
                                    <button
                                        onClick={handlePrint}
                                        className="flex items-center gap-2 bg-white text-navy font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={resetPage}
                                        className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                                    >
                                        <RefreshCw className="w-5 h-5" />
                                        Analyze Another File
                                    </button>
                                </div>

                                {/* Email option */}
                                {!emailSent ? (
                                    <div className="flex gap-2 max-w-md mx-auto">
                                        <input
                                            type="email"
                                            placeholder="Enter your email to receive this report"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-xl text-navy text-sm focus:outline-none focus:ring-2 focus:ring-sky-blue"
                                        />
                                        <button
                                            onClick={() => { if (emailInput) setEmailSent(true); }}
                                            className="flex items-center gap-2 bg-sky-blue hover:bg-royal-blue text-white font-semibold px-5 py-3 rounded-xl transition-colors"
                                        >
                                            <Mail className="w-5 h-5" />
                                            Send
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-medium">Report link sent to {emailInput}!</span>
                                    </div>
                                )}
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
