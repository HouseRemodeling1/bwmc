"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CheckCircle, AlertTriangle, AlertCircle, ChevronDown, ChevronUp, 
    Table, FileText, Shield, Activity, ArrowRight, Info
} from "lucide-react";
import { IFRSReport, AccountLine } from "@/app/financial-health-check/financial-types";

interface Props {
    report: IFRSReport;
}

const formatCurr = (val: number) => 
    new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(val);

function PLRow({ label, value, type }: { label: string, value: number, type: "subtotal" | "minus" | "result" | "final" }) {
    return (
        <div className={`flex justify-between items-center py-1 ${
            type === "final" ? "text-lg font-black text-navy mt-2 pt-2 border-t-2 border-navy" :
            type === "result" ? "font-bold text-navy" : "text-sm text-gray-500"
        }`}>
            <span>{label}</span>
            <span className={type === "minus" ? "text-red-500" : ""}>
                {type === "minus" ? `(${new Intl.NumberFormat().format(Math.abs(value))})` : new Intl.NumberFormat().format(value)}
            </span>
        </div>
    );
}

function AccountCategory({ id, title, accounts, expanded, onToggle }: { id: string, title: string, accounts: AccountLine[], expanded: boolean, onToggle: () => void }) {
    if (!accounts || accounts.length === 0) return null;
    
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button 
                onClick={onToggle}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Table className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-navy text-sm">{title}</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{accounts.length} Accounts Classified</p>
                    </div>
                </div>
                {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-2">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm min-w-[500px]">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-3 font-black text-[10px] text-gray-400 uppercase tracking-widest">Account Name</th>
                                            <th className="py-3 font-black text-[10px] text-gray-400 uppercase tracking-widest">Amount</th>
                                            <th className="py-3 font-black text-[10px] text-gray-400 uppercase tracking-widest">IFRS Standard</th>
                                            <th className="py-3 font-black text-[10px] text-gray-400 uppercase tracking-widest">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {accounts.map((acc, idx) => (
                                            <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3 font-bold text-navy">{acc.accountName}</td>
                                                <td className="py-3 font-mono font-medium text-gray-600">{new Intl.NumberFormat().format(acc.amount)}</td>
                                                <td className="py-3">
                                                    <span className="text-[10px] font-black bg-royal-blue/10 text-royal-blue px-2 py-1 rounded">
                                                        {acc.ifrsStandard}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-xs text-gray-500 italic">{acc.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function IFRSReportView({ report }: Props) {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        assets: true,
        compliance: true
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 1. Balance Check Banner */}
            <div className={`p-6 rounded-2xl border-2 flex items-center justify-between ${
                report.balanceCheck.isBalanced 
                ? "bg-green-50 border-green-200 text-green-800" 
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        report.balanceCheck.isBalanced ? "bg-green-500" : "bg-red-500"
                    }`}>
                        {report.balanceCheck.isBalanced ? <CheckCircle className="w-7 h-7 text-white" /> : <AlertTriangle className="w-7 h-7 text-white" />}
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight">
                            {report.balanceCheck.isBalanced ? "Trial Balance is Balanced" : "Balance Discrepancy Detected"}
                        </h2>
                        <p className="text-sm opacity-80 font-medium">
                            Total Debits: {formatCurr(report.balanceCheck.totalDebits)} | Total Credits: {formatCurr(report.balanceCheck.totalCredits)}
                        </p>
                    </div>
                </div>
                {!report.balanceCheck.isBalanced && (
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase opacity-60">Variance Amount</p>
                        <p className="text-2xl font-black">{formatCurr(report.balanceCheck.discrepancy)}</p>
                    </div>
                )}
            </div>

            {/* 2. Executive Compliance Score */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-navy rounded-2xl p-6 text-white md:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Shield className="w-24 h-24" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-blue mb-4">IFRS Compliance Score</p>
                    <div className="flex items-end gap-3 mb-4">
                        <span className="text-6xl font-black leading-none">{report.summary.overallComplianceScore}</span>
                        <span className="text-xl font-bold opacity-40 mb-1">/100</span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed max-w-md">
                        Based on your trial balance classification and flag analysis, your business alignment with IFRS standards is rated as {
                            report.summary.overallComplianceScore >= 80 ? "Exemplary" : 
                            report.summary.overallComplianceScore >= 60 ? "Satisfactory" : "Requires Attention"
                        }.
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center text-center">
                    <p className="text-[10px] font-black uppercase text-red-500 mb-1">Critical Issues</p>
                    <p className="text-4xl font-black text-navy">{report.summary.criticalIssues}</p>
                    <div className="mt-2 flex justify-center">
                        <div className="w-8 h-1 bg-red-500 rounded-full" />
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center text-center">
                    <p className="text-[10px] font-black uppercase text-amber-500 mb-1">Compliance Warnings</p>
                    <p className="text-4xl font-black text-navy">{report.summary.warnings}</p>
                    <div className="mt-2 flex justify-center">
                        <div className="w-8 h-1 bg-amber-400 rounded-full" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3. Generated Financials */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Generated P&L */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-royal-blue" />
                                <h3 className="font-bold text-navy uppercase tracking-wider text-sm">Generated Profit & Loss</h3>
                            </div>
                        </div>
                        <div className="p-6 space-y-3">
                            <PLRow label="Total Revenue" value={report.generatedPL.revenue} type="subtotal" />
                            <PLRow label="Cost of Sales" value={report.generatedPL.costOfSales} type="minus" />
                            <div className="my-2 border-t border-dashed border-gray-200" />
                            <PLRow label="Gross Profit" value={report.generatedPL.grossProfit} type="result" />
                            <PLRow label="Operating Expenses" value={report.generatedPL.operatingExpenses} type="minus" />
                            <div className="my-2 border-t border-dashed border-gray-200" />
                            <PLRow label="EBIT (Operating Profit)" value={report.generatedPL.ebit} type="result" />
                            <PLRow label="Net Profit" value={report.generatedPL.netProfit} type="final" />
                        </div>
                    </div>

                    {/* Generated Balance Sheet */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-royal-blue" />
                                <h3 className="font-bold text-navy uppercase tracking-wider text-sm">Statement of Financial Position</h3>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                report.generatedBalanceSheet.isBalanced ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                                {report.generatedBalanceSheet.isBalanced ? "Balanced" : "Out of Balance"}
                            </div>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <ArrowRight className="w-6 h-6 text-gray-300" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Total Assets</p>
                                <p className="text-3xl font-black text-navy">{formatCurr(report.generatedBalanceSheet.totalAssets)}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Liabilities + Equity</p>
                                <p className="text-3xl font-black text-navy">{formatCurr(report.generatedBalanceSheet.totalLiabilities + report.generatedBalanceSheet.totalEquity)}</p>
                                <p className="text-[10px] text-gray-500 mt-2 text-right">
                                    Liab: {formatCurr(report.generatedBalanceSheet.totalLiabilities)} | Equity: {formatCurr(report.generatedBalanceSheet.totalEquity)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Categorized Accounts */}
                    <div className="space-y-4">
                        <AccountCategory id="assets" title="Assets" accounts={report.classification.assets} expanded={expandedSections.assets} onToggle={() => toggleSection("assets")} />
                        <AccountCategory id="liabilities" title="Liabilities" accounts={report.classification.liabilities} expanded={expandedSections.liabilities} onToggle={() => toggleSection("liabilities")} />
                        <AccountCategory id="equity" title="Equity" accounts={report.classification.equity} expanded={expandedSections.equity} onToggle={() => toggleSection("equity")} />
                        <AccountCategory id="revenue" title="Revenue" accounts={report.classification.revenue} expanded={expandedSections.revenue} onToggle={() => toggleSection("revenue")} />
                        <AccountCategory id="expenses" title="Expenses" accounts={report.classification.expenses} expanded={expandedSections.expenses} onToggle={() => toggleSection("expenses")} />
                    </div>
                </div>

                {/* 5. Compliance Flags & Findings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
                        <div className="bg-navy px-6 py-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-sky-blue" />
                            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Compliance Audit</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Key Findings */}
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Core Findings</h4>
                                <ul className="space-y-3">
                                    {report.summary.keyFindings.map((finding, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-navy font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-royal-blue mt-1.5 shrink-0" />
                                            {finding}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="h-px bg-gray-100" />

                            {/* Flags */}
                             <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Detailed Flags</h4>
                                <div className="space-y-4">
                                    {report.complianceFlags.map((flag, idx) => (
                                        <div key={idx} className={`p-4 rounded-xl border-l-4 ${
                                            flag.severity === "critical" ? "bg-red-50 border-red-500" :
                                            flag.severity === "warning" ? "bg-amber-50 border-amber-400" :
                                            "bg-blue-50 border-blue-400"
                                        }`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                {flag.severity === "critical" ? <AlertCircle className="w-4 h-4 text-red-500" /> :
                                                 flag.severity === "warning" ? <AlertTriangle className="w-4 h-4 text-amber-500" /> :
                                                 <Info className="w-4 h-4 text-blue-500" />}
                                                <span className="text-[10px] font-black uppercase text-navy/40 tracking-tighter">{flag.standard}</span>
                                            </div>
                                            <p className="text-sm font-bold text-navy mb-1 leading-snug">{flag.issue}</p>
                                            <p className="text-xs text-gray-600 mb-3 leading-relaxed">{flag.recommendation}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {flag.affectedAccounts.map(acc => (
                                                    <span key={acc} className="text-[9px] px-1.5 py-0.5 bg-white/50 border border-gray-200 rounded text-gray-500 uppercase font-black tracking-tighter">
                                                        {acc}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
