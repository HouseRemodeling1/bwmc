"use client";

import { useState } from "react";
import { Shield, ArrowRight, CheckCircle } from "lucide-react";

import { FinancialReport } from "../../app/financial-health-check/financial-types";

interface LockFormProps {
    reportData: FinancialReport;
    onUnlock: (name: string) => void;
    onSkip: () => void;
}

export default function LockForm({ reportData, onUnlock, onSkip }: LockFormProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("+971 ");
    const [company, setCompany] = useState("");
    const [errors, setErrors] = useState<{ name?: string; phone?: string; company?: string }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrs: typeof errors = {};
        if (name.trim().length < 2) newErrs.name = "Name must be at least 2 characters";
        const phoneDigits = phone.replace(/\D/g, "");
        if (phoneDigits.length < 10) newErrs.phone = "Enter a valid phone number (min 10 digits)";
        if (company.trim().length < 2) newErrs.company = "Company name is required";
        setErrors(newErrs);
        return Object.keys(newErrs).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    leadData: {
                        name,
                        phone,
                        companyName: company,
                    },
                    reportData
                }),
            });
        } catch (e) {
            console.error("Zoho lead submission failed, but unlocking anyway", e);
        } finally {
            setLoading(false);
            console.log("unlock_form_submitted");
            sessionStorage.setItem("bwmc_unlockedName", name);
            onUnlock(name);
        }
    };

    const FEATURES = [
        "Complete Profit Leakage breakdown",
        "All Red Flags with fix instructions",
        "Your 90-Day Action Plan",
        "VAT & Corporate Tax exposure check",
        "What-If financial simulator",
        "Ask AI anything about your report",
    ];

    return (
        <div className="bg-white rounded-2xl border-2 border-[#D4AF37] p-8 shadow-2xl max-w-lg mx-auto relative z-10 w-full">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[#D4AF37]" />
                </div>
            </div>
            <h3 className="text-2xl font-black text-navy text-center mb-2">Your full report is ready</h3>
            <p className="text-gray-500 text-center mb-6">Unlock the complete analysis — free</p>

            <div className="space-y-3 mb-8">
                {FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                        <span className="text-sm font-medium text-navy">{feature}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <input
                        type="text"
                        placeholder="Full Name (e.g. Ahmed Al Mansoori)"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${
                            errors.name ? "border-red-500" : "border-gray-200"
                        }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 px-1">{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="+971 50 123 4567"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${
                            errors.phone ? "border-red-500" : "border-gray-200"
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 px-1">{errors.phone}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Your company name"
                        value={company}
                        onChange={(e) => {
                            setCompany(e.target.value);
                            if (errors.company) setErrors((p) => ({ ...p, company: undefined }));
                        }}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${
                            errors.company ? "border-red-500" : "border-gray-200"
                        }`}
                    />
                    {errors.company && <p className="text-red-500 text-xs mt-1 px-1">{errors.company}</p>}
                </div>

                <div className="relative group">
                    <label className="flex items-center gap-3 w-full border border-dashed border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-pointer hover:bg-gray-50 transition-all">
                        <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Upload Business Cover Photo (Optional)</span>
                        <input type="file" className="hidden" accept="image/*" />
                    </label>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#B5952F] text-navy font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        Unlock My Full Report <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-3 mb-6">
                BWMC may follow up with relevant insights for your business.
            </p>

            <div className="text-center">
                <button
                    onClick={() => {
                        console.log("unlock_skipped");
                        onSkip();
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
                >
                    Skip — view limited report only
                </button>
            </div>
        </div>
    );
}
