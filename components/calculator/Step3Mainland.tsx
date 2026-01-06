"use client";

import { motion } from "framer-motion";
import { Building2, MessageCircle, FileText, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Step3MainlandProps {
    formData: {
        officeType: "physical" | "virtual" | "";
    };
    onUpdate: (data: Partial<Step3MainlandProps["formData"]>) => void;
    onBack: () => void;
    onSubmit: () => void;
}

export default function Step3Mainland({ formData, onUpdate, onBack, onSubmit }: Step3MainlandProps) {
    // Estimated pricing (these are approximate ranges)
    const estimatedLicenseFee = formData.officeType === "physical" ? 18000 : 15000;
    const whatsappNumber = "+971501234567"; // Replace with actual number
    const whatsappMessage = encodeURIComponent(
        `Hi! I'm interested in setting up a Mainland business. Can you provide me with a detailed DED fee breakdown?`
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-navy mb-3">
                        Mainland Business Setup
                    </h2>
                    <p className="text-gray-600">
                        Full market access with no business restrictions
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Office Requirement */}
                    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-4">
                            <Building2 className="w-5 h-5 text-royal-blue" />
                            Do you need a physical office or a virtual desk?
                        </label>

                        <div className="grid md:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => onUpdate({ officeType: "virtual" })}
                                className={`p-6 rounded-lg border-2 transition-all text-left ${formData.officeType === "virtual"
                                        ? "border-royal-blue bg-blue-50 shadow-md"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-bold text-lg text-navy">Virtual Desk</h3>
                                    {formData.officeType === "virtual" && (
                                        <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Cost-effective solution with business address
                                </p>
                                <p className="text-xs text-gray-500">
                                    Starting from AED 15,000/year*
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() => onUpdate({ officeType: "physical" })}
                                className={`p-6 rounded-lg border-2 transition-all text-left ${formData.officeType === "physical"
                                        ? "border-royal-blue bg-blue-50 shadow-md"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-bold text-lg text-navy">Physical Office</h3>
                                    {formData.officeType === "physical" && (
                                        <div className="w-6 h-6 bg-royal-blue rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Dedicated workspace for your team
                                </p>
                                <p className="text-xs text-gray-500">
                                    Starting from AED 18,000/year*
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Estimate Display */}
                    {formData.officeType && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-navy to-royal-blue p-8 rounded-lg text-white shadow-xl"
                        >
                            <h3 className="text-2xl font-bold mb-6">Your Mainland Setup Estimate</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Professional License Estimate:</span>
                                    <span className="text-2xl font-bold">AED {estimatedLicenseFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Government Vouchers (DED):</span>
                                    <span className="text-sm">Subject to Activity</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Local Service Agent:</span>
                                    <span className="text-sm text-green-300">Included in Package</span>
                                </div>
                            </div>

                            {/* Important Note */}
                            <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-6">
                                <div className="flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Transparent Pricing</h4>
                                        <p className="text-sm text-white/80">
                                            DED fees vary based on your specific business activity and location.
                                            Our consultants will provide you with a real-time, accurate breakdown
                                            tailored to your requirements.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3">What You Get:</h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full"></span>
                                        Direct access to UAE local market
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full"></span>
                                        100% foreign ownership (most sectors)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full"></span>
                                        No restrictions on business scope
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full"></span>
                                        Trade anywhere in the UAE
                                    </li>
                                </ul>
                            </div>

                            {/* Primary CTA */}
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-md transition-all flex items-center justify-center gap-2 mb-3"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Get Real-Time DED Fee Breakdown on WhatsApp
                            </a>

                            {/* Secondary CTA */}
                            <button
                                onClick={onSubmit}
                                className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3 rounded-md transition-all flex items-center justify-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                Request Detailed Proposal via Email
                            </button>

                            <p className="text-xs text-white/50 mt-4">
                                * Estimates are indicative. Final pricing depends on activity type, location, and specific DED requirements.
                            </p>
                        </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-4">
                        <button
                            onClick={onBack}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-navy font-semibold py-3 rounded-md transition-all"
                        >
                            ← Back
                        </button>
                        {formData.officeType && (
                            <button
                                onClick={onSubmit}
                                className="flex-1 bg-royal-blue hover:bg-navy text-white font-bold py-3 rounded-md transition-all shadow-lg hover:shadow-xl"
                            >
                                Complete Request →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
