"use client";

import { motion } from "framer-motion";
import { Building2, Users, Calendar, CheckCircle2, Download, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getPrice, FREEZONES } from "@/lib/calculatorPricing";

interface Step3FreeZoneProps {
    formData: {
        freezone: string;
        officeType: string;
        visaCount: number;
        contractYears: number;
    };
    onUpdate: (data: Partial<Step3FreeZoneProps["formData"]>) => void;
    onBack: () => void;
    onSubmit: () => void;
}

export default function Step3FreeZone({ formData, onUpdate, onBack, onSubmit }: Step3FreeZoneProps) {
    const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

    // Calculate price whenever inputs change
    useEffect(() => {
        const price = getPrice(
            formData.freezone,
            formData.officeType,
            "Standard License",
            formData.visaCount,
            formData.contractYears
        );
        setCalculatedPrice(price);
    }, [formData]);

    const getAvailableOfficeTypes = () => {
        switch (formData.freezone) {
            case "ANC_FZ":
            case "SHAMS":
            case "SPC":
                return ["Virtual Office"];
            case "AJMAN":
                return ["Freelancer", "Virtual Office", "Standard Office"];
            case "RAKEZ":
                return ["Virtual Office", "Serviced Office", "Standard Office"];
            default:
                return ["Virtual Office"];
        }
    };

    const getMaxVisas = () => {
        if (formData.freezone === "SHAMS" || formData.freezone === "SPC") return 10;
        if (formData.freezone === "RAKEZ" && formData.officeType === "Virtual Office") return 4;
        if (formData.freezone === "RAKEZ") return 2;
        if (formData.freezone === "ANC_FZ") return 7;
        if (formData.freezone === "AJMAN" && formData.officeType === "Freelancer") return 1;
        if (formData.freezone === "AJMAN" && formData.officeType === "Virtual Office") return 4;
        return 4;
    };

    const getAvailableYears = () => {
        if (formData.freezone === "RAKEZ" || formData.freezone === "SPC" || formData.freezone === "SHAMS") {
            return [1, 2, 3, 5, 10];
        }
        return [1];
    };

    const whatsappNumber = "+971501234567"; // Replace with actual number
    const whatsappMessage = encodeURIComponent(
        `Hi! I'm interested in the ${formData.freezone} Free Zone setup package (${calculatedPrice?.toLocaleString()} AED). Can you provide more details?`
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-navy mb-3">
                        Your Free Zone Setup Package
                    </h2>
                    <p className="text-gray-600">
                        Customize your package and get instant pricing
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Configuration */}
                    <div className="space-y-6">
                        {/* Freezone Selection */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                                <Building2 className="w-4 h-4 text-royal-blue" />
                                Select Free Zone
                            </label>
                            <select
                                value={formData.freezone}
                                onChange={(e) => onUpdate({ freezone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-navy focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                            >
                                <option value="SHAMS">SHAMS (Sharjah Media City)</option>
                                <option value="SPC">SPC (Sharjah Publishing City)</option>
                                <option value="RAKEZ">RAKEZ (Ras Al Khaimah)</option>
                                <option value="AJMAN">Ajman Free Zone</option>
                                <option value="ANC_FZ">ANC FZ (Ajman NuVentures)</option>
                            </select>
                        </div>

                        {/* Office Type */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <label className="text-sm font-semibold text-navy mb-3 block">
                                Office Type
                            </label>
                            <div className="grid gap-2">
                                {getAvailableOfficeTypes().map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => onUpdate({ officeType: type })}
                                        className={`px-4 py-3 rounded-md text-sm font-medium transition-all text-left ${formData.officeType === type
                                                ? "bg-royal-blue text-white shadow-md"
                                                : "bg-gray-50 text-navy hover:bg-gray-100"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Visa Count */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                                <Users className="w-4 h-4 text-royal-blue" />
                                Number of Visas: {formData.visaCount}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max={getMaxVisas()}
                                value={formData.visaCount}
                                onChange={(e) => onUpdate({ visaCount: parseInt(e.target.value) })}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-royal-blue"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0</span>
                                <span>{getMaxVisas()}</span>
                            </div>
                        </div>

                        {/* Contract Period */}
                        {getAvailableYears().length > 1 && (
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                                    <Calendar className="w-4 h-4 text-royal-blue" />
                                    Contract Period
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {getAvailableYears().map((years) => (
                                        <button
                                            key={years}
                                            type="button"
                                            onClick={() => onUpdate({ contractYears: years })}
                                            className={`py-2 px-3 rounded-md text-sm font-semibold transition-all ${formData.contractYears === years
                                                    ? "bg-royal-blue text-white shadow-md"
                                                    : "bg-gray-50 text-navy hover:bg-gray-100"
                                                }`}
                                        >
                                            {years}Y
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Pricing Display */}
                    <div className="bg-gradient-to-br from-navy to-royal-blue p-8 rounded-lg text-white shadow-xl">
                        <div className="mb-6">
                            <p className="text-sm text-white/70 mb-2">Premium Free Zone Setup</p>
                            <h3 className="text-5xl font-bold text-white mb-2">
                                {calculatedPrice ? `${calculatedPrice.toLocaleString()}` : "—"}
                                <span className="text-2xl ml-2">AED</span>
                            </h3>
                            <p className="text-sm text-white/60">
                                {formData.contractYears === 1 ? "Total for 1 year" : `Total for ${formData.contractYears} years`}
                            </p>
                        </div>

                        {/* Value Stack */}
                        <div className="space-y-3 mb-6 pb-6 border-b border-white/20">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-300" />
                                <span>0% Corporate Tax on Qualifying Income</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-300" />
                                <span>100% Foreign Ownership</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-300" />
                                <span>Fast-Track Processing (7-10 days)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-300" />
                                <span>100% Profit Repatriation</span>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="space-y-2 mb-6 text-sm">
                            <div className="flex justify-between">
                                <span className="text-white/70">Free Zone:</span>
                                <span className="font-semibold">{formData.freezone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Office Type:</span>
                                <span className="font-semibold">{formData.officeType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Visas:</span>
                                <span className="font-semibold">{formData.visaCount}</span>
                            </div>
                            {formData.contractYears > 1 && (
                                <div className="flex justify-between">
                                    <span className="text-white/70">Multi-Year Discount:</span>
                                    <span className="font-semibold text-green-300">
                                        {formData.contractYears === 2 ? "2%" : formData.contractYears === 3 ? "3%" : formData.contractYears === 5 ? "5%" : "10%"}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* CTAs */}
                        <div className="space-y-3">
                            <button
                                onClick={onSubmit}
                                className="w-full bg-white text-navy font-bold py-3 rounded-md hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download Full Quote (PDF)
                            </button>
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition-all flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Talk to Expert on WhatsApp
                            </a>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-white/50 mt-6">
                            * Prices subject to specific activity approvals and visa allocations. Health insurance charged separately. Terms and conditions apply.
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-8">
                    <button
                        onClick={onBack}
                        className="bg-gray-100 hover:bg-gray-200 text-navy font-semibold px-8 py-3 rounded-md transition-all"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
