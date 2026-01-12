"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, CheckCircle2, Calculator, Loader2, Send, Check } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const payload = {
                businessName: "Global Hero Lead: " + (formData.country || "Unknown"),
                contactName: formData.name,
                email: formData.email,
                mobile: formData.phone,
                businessActivity: "International Inquiry (Hero)",
                jurisdiction: "International Setup",
                country: formData.country,
                message: formData.message
            };

            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", country: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center bg-gray-50 overflow-hidden pt-20 pb-20 lg:pt-28">
            {/* Background elements - Subtle/Lighter */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 text-royal-blue mb-6">
                            <Globe className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-wide uppercase">Global Business Gateway</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-navy leading-tight mb-6">
                            Launch Your UAE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-purple-600">
                                Business from Anywhere.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed font-medium">
                            Unlock the UAE's thriving economy with 0% personal tax, 100% foreign ownership, and expert guidance. No need to relocate to get started.
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>Fast remote setup (7-10 days)</span>
                            </div>
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>100% Application Success Rate</span>
                            </div>
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>Multi-currency Corporate Banking</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#hero-form"
                                className="px-8 py-4 bg-navy hover:bg-royal-blue text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Connect with an Expert
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <Link
                                href="/calculator"
                                className="px-8 py-4 bg-white border border-gray-200 hover:border-gold/50 text-navy font-bold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                            >
                                <Calculator className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                                Cost Calculator
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Lead Capture Form */}
                    <motion.div
                        id="hero-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-navy mb-2">Get Your Free Consultation</h3>
                                <p className="text-gray-500 text-sm">Fill out the form below and our experts will contact you within 24 hours.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {status === "success" ? (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h4 className="text-xl font-bold text-navy mb-2">Request Sent!</h4>
                                        <p className="text-gray-600 mb-6">
                                            We've received your inquiry. Check your email for a confirmation.
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="text-royal-blue font-bold hover:underline"
                                        >
                                            Submit another request
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Country</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.country}
                                                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                                                    placeholder="United Kingdom"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                                                placeholder="john@company.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                                                placeholder="+44 7911 123456"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full bg-gold hover:bg-yellow-600 text-navy font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {status === "submitting" ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Get My Free Consultation
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-xs text-center text-gray-400 mt-4">
                                            By submitting this form, you agree to our privacy policy. Your information is secure.
                                        </p>
                                    </>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
