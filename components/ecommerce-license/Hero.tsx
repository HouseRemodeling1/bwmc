"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, MessageCircle, Check, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const [showContactOptions, setShowContactOptions] = useState(false);

    return (
        <section className="relative min-h-[90vh] flex items-center bg-gray-50 pt-28 pb-20 lg:pt-36">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
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
                            <span className="text-sm font-bold tracking-wide uppercase">Launch Your Online Business in 24 Hours</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-navy leading-tight mb-6">
                            Start Your E-Commerce Business in Dubai from <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-purple-600">
                                AED 3,999
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed font-medium">
                            100% Online Process | No Hidden Fees | Free Consultation | Bank Account Assistance Included.
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>License Issued Within 24 Hours</span>
                            </div>
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>Transparent Pricing - No Surprises</span>
                            </div>
                            <div className="flex items-center gap-3 text-navy font-medium">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span>End-to-End Setup Support</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-navy hover:bg-royal-blue text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Get Free Consultation
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <div className="relative">
                                <button
                                    onClick={() => setShowContactOptions(!showContactOptions)}
                                    className="px-8 py-4 bg-white border border-gray-200 hover:border-gold/50 text-navy font-bold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group w-full sm:w-auto"
                                >
                                    Connect with an Expert
                                    <ArrowRight className={`w-5 h-5 transition-transform ${showContactOptions ? "rotate-90" : ""}`} />
                                </button>

                                {showContactOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                                    >
                                        <div className="p-2 space-y-1">
                                            <a
                                                href="tel:+97145488184"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-navy font-medium transition-colors"
                                            >
                                                <div className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Phone className="w-5 h-5 text-royal-blue" />
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-bold">Call Now</span>
                                                    <span className="text-xs text-gray-500">+971 4 548 8184</span>
                                                </div>
                                            </a>
                                            <a
                                                href="https://wa.me/971543097850"
                                                target="_blank"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-navy font-medium transition-colors"
                                            >
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <MessageCircle className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-bold">WhatsApp</span>
                                                    <span className="text-xs text-gray-500">Chat with us</span>
                                                </div>
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Lead Capture Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <HeroForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function HeroForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const payload = {
                businessName: "N/A",
                contactName: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                mobile: formData.phone,
                businessActivity: "E-Commerce License",
                jurisdiction: "Dubai/UAE",
                country: "UAE",
                message: "Interested in E-Commerce License (AED 3,999)"
            };

            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", phone: "" });
                // Trigger Google Ads Conversion if applicable
                if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
                    (window as any).gtag_report_conversion();
                }
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100" id="ecommerce-form">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-navy mb-2">Start Your License Today</h3>
                <p className="text-gray-500 text-sm">Fill out the form to get your free consultation and quote.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {status === "success" ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-xl font-bold text-navy mb-2">Request Sent!</h4>
                        <p className="text-gray-600 mb-6">
                            We've received your request. An expert will contact you shortly.
                        </p>
                        <button onClick={() => setStatus("idle")} className="text-royal-blue font-bold hover:underline">
                            Submit another request
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                    placeholder="Doe"
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
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
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
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all text-black"
                                placeholder="+971 50 123 4567"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-gold hover:bg-yellow-600 text-navy font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
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
                    </>
                )}
            </form>
        </div>
    );
}
