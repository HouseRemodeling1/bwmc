"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Building2, FileText, Users, Calendar, DollarSign, CheckCircle2 } from "lucide-react";
import { getPrice, FREEZONES, OFFICE_TYPES, LICENSE_TYPES } from "@/lib/calculatorPricing";

export default function BusinessCalculator() {
    const [freezone, setFreezone] = useState("SHAMS");
    const [officeType, setOfficeType] = useState("Virtual Office");
    const [licenseType, setLicenseType] = useState("Media License");
    const [visaCount, setVisaCount] = useState(1);
    const [contractYears, setContractYears] = useState(1);
    const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

    // Available options based on selected freezone
    const getAvailableOfficeTypes = () => {
        switch (freezone) {
            case "ANC_FZ":
                return ["Virtual Office"];
            case "AJMAN":
                return ["Freelancer", "Virtual Office", "Standard Office"];
            case "RAKEZ":
                return ["Virtual Office", "Serviced Office", "Standard Office"];
            case "SHAMS":
            case "SPC":
                return ["Virtual Office"];
            default:
                return ["Virtual Office"];
        }
    };

    const getAvailableLicenseTypes = () => {
        if (freezone === "SHAMS") return ["Standard License", "Media License"];
        if (freezone === "SPC") return ["Standard License", "Publishing License"];
        return ["Standard License"];
    };

    const getAvailableContractYears = () => {
        if (freezone === "RAKEZ" || freezone === "SPC") return [1, 2, 3, 5, 10];
        if (freezone === "SHAMS") return [1, 2, 3, 5, 10];
        return [1];
    };

    const getMaxVisas = () => {
        if (freezone === "SHAMS" || freezone === "SPC") return 10;
        if (freezone === "RAKEZ" && officeType === "Virtual Office") return 4;
        if (freezone === "RAKEZ") return 2;
        if (freezone === "ANC_FZ") return 7;
        if (freezone === "AJMAN" && officeType === "Freelancer") return 1;
        if (freezone === "AJMAN" && officeType === "Virtual Office") return 4;
        return 4;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    // Calculate price whenever inputs change
    useEffect(() => {
        const price = getPrice(freezone, officeType, licenseType, visaCount, contractYears);
        setCalculatedPrice(price);
    }, [freezone, officeType, licenseType, visaCount, contractYears]);

    // Reset dependent fields when freezone changes
    useEffect(() => {
        const availableOffices = getAvailableOfficeTypes();
        if (!availableOffices.includes(officeType)) {
            setOfficeType(availableOffices[0]);
        }

        const availableLicenses = getAvailableLicenseTypes();
        if (!availableLicenses.includes(licenseType)) {
            setLicenseType(availableLicenses[0]);
        }

        const availableYears = getAvailableContractYears();
        if (!availableYears.includes(contractYears)) {
            setContractYears(availableYears[0]);
        }

        const maxVisas = getMaxVisas();
        if (visaCount > maxVisas) {
            setVisaCount(maxVisas);
        }
    }, [freezone]);

    const handleGetQuote = () => {
        setIsModalOpen(true);
        setSubmitStatus("idle");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    quoteDetails: {
                        freezone,
                        officeType,
                        licenseType,
                        visaCount,
                        contractYears,
                        price: calculatedPrice
                    }
                }),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setTimeout(() => {
                    setIsModalOpen(false);
                    setFormData({ name: "", email: "", phone: "" });
                    setSubmitStatus("idle");
                }, 3000);
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Input Form */}
                <div className="space-y-6">
                    {/* Freezone Selection */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                            <Building2 className="w-4 h-4 text-royal-blue" />
                            Select Freezone
                        </label>
                        <select
                            value={freezone}
                            onChange={(e) => setFreezone(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-[4px] bg-white text-navy focus:outline-none focus:border-royal-blue transition-colors"
                        >
                            <option value="ANC_FZ">ANC FZ (Ajman NuVentures)</option>
                            <option value="AJMAN">Ajman Free Zone</option>
                            <option value="RAKEZ">RAKEZ (Ras Al Khaimah)</option>
                            <option value="SHAMS">SHAMS (Sharjah Media City)</option>
                            <option value="SPC">SPC (Sharjah Publishing City)</option>
                        </select>
                    </div>

                    {/* Office Type */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                            <FileText className="w-4 h-4 text-royal-blue" />
                            Office Type
                        </label>
                        <select
                            value={officeType}
                            onChange={(e) => setOfficeType(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-[4px] bg-white text-navy focus:outline-none focus:border-royal-blue transition-colors"
                        >
                            {getAvailableOfficeTypes().map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* License Type */}
                    {getAvailableLicenseTypes().length > 1 && (
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                                <CheckCircle2 className="w-4 h-4 text-royal-blue" />
                                License Type
                            </label>
                            <select
                                value={licenseType}
                                onChange={(e) => setLicenseType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-[4px] bg-white text-navy focus:outline-none focus:border-royal-blue transition-colors"
                            >
                                {getAvailableLicenseTypes().map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Visa Count */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                            <Users className="w-4 h-4 text-royal-blue" />
                            Number of Visas: {visaCount}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max={getMaxVisas()}
                            value={visaCount}
                            onChange={(e) => setVisaCount(parseInt(e.target.value))}
                            className="w-full h-2 bg-neutral rounded-lg appearance-none cursor-pointer accent-royal-blue"
                        />
                        <div className="flex justify-between text-xs text-navy/50 mt-1">
                            <span>0</span>
                            <span>{getMaxVisas()}</span>
                        </div>
                    </div>

                    {/* Contract Period */}
                    {getAvailableContractYears().length > 1 && (
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
                                <Calendar className="w-4 h-4 text-royal-blue" />
                                Contract Period
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {getAvailableContractYears().map((years) => (
                                    <button
                                        key={years}
                                        onClick={() => setContractYears(years)}
                                        className={`py-2 px-3 rounded-[4px] text-sm font-semibold transition-all ${contractYears === years
                                            ? "bg-royal-blue text-white shadow-md"
                                            : "bg-neutral text-navy/70 hover:bg-neutral/80"
                                            }`}
                                    >
                                        {years}Y
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Price Display */}
                <div className="bg-gradient-to-br from-navy to-royal-blue p-8 rounded-[4px] text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/10 rounded-full">
                                <Calculator className="w-8 h-8 text-sky-blue" />
                            </div>
                            <h3 className="text-2xl font-bold">Estimated Cost</h3>
                        </div>

                        {calculatedPrice !== null ? (
                            <motion.div
                                key={calculatedPrice}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-6xl font-bold text-sky-blue">
                                            {calculatedPrice.toLocaleString()}
                                        </span>
                                        <span className="text-2xl font-semibold">AED</span>
                                    </div>
                                    <p className="text-white/70 text-sm">
                                        {contractYears === 1
                                            ? "Total cost for 1 year"
                                            : `Total cost for ${contractYears} years contract`}
                                    </p>
                                </div>

                                <div className="space-y-3 pt-6 border-t border-white/20">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/70">Freezone:</span>
                                        <span className="font-semibold">{freezone === "ANC_FZ" ? "ANC FZ" : freezone}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/70">Office Type:</span>
                                        <span className="font-semibold">{officeType}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/70">Visas:</span>
                                        <span className="font-semibold">{visaCount}</span>
                                    </div>
                                    {contractYears > 1 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/70">Multi-Year Discount:</span>
                                            <span className="font-semibold text-green-300">
                                                {contractYears === 2 ? "2%" : contractYears === 3 ? "3%" : contractYears === 5 ? "5%" : "10%"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-white/70">Configuration not available</p>
                                <p className="text-sm text-white/50 mt-2">Please adjust your selections</p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-white/20">
                            <p className="text-xs text-white/60 mb-4">
                                * Price includes license, visa processing, and standard fees. Health insurance and optional add-ons are separate.
                            </p>
                            <button
                                onClick={handleGetQuote}
                                className="w-full bg-sky-blue hover:bg-white hover:text-navy text-white font-semibold py-3 rounded-[4px] transition-all"
                            >
                                Get Detailed Quote
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-navy mb-2">Get Your Detailed Quote</h3>
                            <p className="text-sm text-gray-500">
                                Enter your details to receive the full breakdown via email.
                            </p>
                        </div>

                        {submitStatus === "success" ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="text-lg font-bold text-navy mb-2">Thank You!</h4>
                                <p className="text-gray-600">
                                    Your detailed quote has been sent to your email. Our team will contact you shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-[4px] focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-[4px] focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-[4px] focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none"
                                        placeholder="+971 50 123 4567"
                                    />
                                </div>

                                {submitStatus === "error" && (
                                    <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-royal-blue hover:bg-navy text-white font-bold py-3 rounded-[4px] transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : "Send Me The Quote"}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </>
    );
}
