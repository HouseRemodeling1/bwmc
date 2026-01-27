"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LeadCaptureForm() {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        revenue: "",
        employees: "",
        industry: "",
        taxSituation: "current-year",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            // Combine extra fields into the message for Zoho Description
            const detailedMessage = `
Revenue Range: ${formData.revenue}
Industry: ${formData.industry}
Tax Situation: ${formData.taxSituation}

Message:
${formData.message}
            `.trim();

            const payload = {
                contactName: formData.name,
                email: formData.email,
                mobile: formData.phone,
                businessName: formData.company,
                businessActivity: "Corporate Tax Filing", // Fixed value for this form
                jurisdiction: "Corporate Tax Page",
                message: detailedMessage,
                country: "Unknown"
            };

            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({
                    name: "", company: "", email: "", phone: "",
                    revenue: "", employees: "", industry: "",
                    taxSituation: "current-year", message: ""
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-8 shadow-xl text-center h-full flex flex-col items-center justify-center min-h-[400px]"
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a4d6f] mb-2">Request Received!</h3>
                <p className="text-gray-600 mb-6">
                    Thank you. A corporate tax specialist will review your details and contact you within 24 hours.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-[#f4a460] font-semibold hover:underline"
                >
                    Submit another response
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-[#f4a460]">
            <h3 className="text-xl font-bold text-[#1a4d6f] mb-2">Get Your Free Consultation</h3>
            <p className="text-gray-500 text-sm mb-6">Speak with a corporate tax expert today.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                        <input
                            required
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d6a8f] outline-none text-sm text-black"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Company Name *</label>
                        <input
                            required
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d6a8f] outline-none text-sm text-black"
                            placeholder="Acme Corp"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                        <input
                            required
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d6a8f] outline-none text-sm text-black"
                            placeholder="john@acme.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Phone *</label>
                        <input
                            required
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d6a8f] outline-none text-sm text-black"
                            placeholder="+971 50 000 0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Annual Revenue</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d6a8f] outline-none text-sm bg-white text-black"
                            value={formData.revenue}
                            onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                        >
                            <option value="">Select Range</option>
                            <option value="Under $1M">Under $1M</option>
                            <option value="$1M - $5M">$1M - $5M</option>
                            <option value="$5M - $10M">$5M - $10M</option>
                            <option value="$10M - $25M">$10M - $25M</option>
                            <option value="$25M - $50M">$25M - $50M</option>
                            <option value="Over $50M">Over $50M</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Industry</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d6a8f] outline-none text-sm bg-white text-black"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        >
                            <option value="">Select Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Professional Services">Professional Services</option>
                            <option value="Retail">Retail</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Current Tax Situation</label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Need to file current year", "Need catch-up filing", "Ongoing support", "Just exploring"].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-xs text-black cursor-pointer">
                                <input
                                    type="radio"
                                    name="taxSituation"
                                    value={opt}
                                    checked={formData.taxSituation === opt}
                                    onChange={(e) => setFormData({ ...formData, taxSituation: e.target.value })}
                                    className="text-[#f4a460] focus:ring-[#f4a460]"
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Additional Comments</label>
                    <textarea
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d6a8f] outline-none text-sm"
                        placeholder="Any specific concerns?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-[#f4a460] hover:bg-[#e08945] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                    {status === "submitting" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        "Get My Free Consultation"
                    )}
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                    We respect your privacy. Your information is secure.
                </p>
            </form>
        </div>
    );
}
