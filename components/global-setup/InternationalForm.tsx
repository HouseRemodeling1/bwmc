"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";

export default function InternationalForm() {
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
            // Reusing the existing send-quote API but sending the form data
            // We'll map it to match the expected schema reasonably well or strict validation?
            // The /api/send-quote expects: businessName, contactName, mobile, email, businessActivity, jurisdiction etc.
            // Since this is a generic contact/lead form, we might need a simpler endpoint or adapt the payload.
            // Let's adapt the payload to fit the existing robust API (or create a new contact API).
            // For now, mapping 'name' to 'contactName', 'country' can be appended to 'businessActivity' or 'jurisdiction' placeholder.

            // NOTE: Ideally we should use a /api/contact or similar. 
            // Reusing send-quote for now as it has the fallback logic we just built.
            const payload = {
                businessName: "International Lead: " + (formData.country || "Unknown"), // Context hacking
                contactName: formData.name,
                email: formData.email,
                mobile: formData.phone,
                businessActivity: "International Inquiry",
                jurisdiction: "International Setup", // Signal to sales team
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
        <section id="consultation-form" className="py-24 bg-navy relative">
            <div className="absolute inset-0 bg-royal-blue/10"></div>


            <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
                {/* Right Form */}
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="text-xl font-bold text-navy mb-6">Schedule Your Free Consultation</h3>

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
                                    Thank you for your interest. One of our international setup experts will contact you shortly.
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
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                                    <textarea
                                        rows={3}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                                        placeholder="Tell us about your business plans..."
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
                                            <Send className="w-5 h-5" />
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
