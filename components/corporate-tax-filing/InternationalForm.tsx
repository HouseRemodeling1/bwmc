"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

export default function TaxFilingForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "Corporate Tax Filing",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const payload = {
                // Mapping consistent with our API interface
                businessName: formData.company,
                contactName: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                mobile: formData.phone,
                businessActivity: formData.service, // Mapped to Interested service
                jurisdiction: "UAE Tax Compliance",
                country: "UAE",
                message: formData.message
            };

            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                // Trigger Google Ads Conversion
                if (typeof window !== "undefined") {
                    console.log("Form check: Attempting to trigger conversion");
                    if ((window as any).gtag_report_conversion) {
                        console.log("Form check: Calling global function");
                        (window as any).gtag_report_conversion();
                    }
                }

                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", service: "Corporate Tax Filing", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="consultation-form" className="py-24 bg-navy relative">
            <div className="absolute inset-0 bg-royal-blue/10"></div>


            <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
                {/* Right Form */}
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="text-xl font-bold text-navy mb-6">Book Your Tax Consultation</h3>

                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center py-12"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="text-xl font-bold text-navy mb-2">Request Received!</h4>
                                <p className="text-gray-600">
                                    Thank you for your interest. One of our tax experts will contact you shortly.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 text-royal-blue font-semibold hover:underline"
                                >
                                    Send another request
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                        placeholder="Your Business Name"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                            placeholder="+971 50 123 4567"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Interested Services</label>
                                    <select
                                        value={formData.service}
                                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all bg-white text-black"
                                    >
                                        <option value="Corporate Tax Filing">Corporate Tax Filing</option>
                                        <option value="Tax Registration">Tax Registration</option>
                                        <option value="Tax Advisory">Tax Advisory</option>
                                        <option value="VAT Services">VAT Services</option>
                                        <option value="Audit & Assurance">Audit & Assurance</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows={3}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                        placeholder="Tell us about your requirements..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full bg-gold hover:bg-yellow-600 text-navy font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === "submitting" ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Schedule Consultation
                                        </>
                                    )}
                                </button>

                                {status === "error" && (
                                    <p className="text-red-600 text-sm text-center mt-2">
                                        Something went wrong. Please try again or contact us directly.
                                    </p>
                                )}
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section >
    );
}
