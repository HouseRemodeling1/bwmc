"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "General Inquiry",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const payload = {
                contactName: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                mobile: formData.phone,
                businessName: formData.company,
                businessActivity: formData.service,
                jurisdiction: "Contact Page",
                message: `Subject: ${formData.subject}\n\n${formData.message}`,
                country: "Unknown"
            };

            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", service: "General Inquiry", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 h-full flex flex-col items-center justify-center text-center min-h-[400px]"
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-8 max-w-sm">
                    Thank you for reaching out. Our team has received your message and will get back to you shortly.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-royal-blue font-semibold hover:underline"
                >
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
            <h3 className="text-2xl font-bold text-navy mb-6">Send us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
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
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                        placeholder="Your Business Name"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                            placeholder="+971 50 123 4567"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Interested Service</label>
                    <select
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all bg-white"
                    >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Business Setup Services">Business Setup Services</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Taxation">Taxation</option>
                        <option value="Auditing">Auditing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                        placeholder="Message Subject"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all"
                        placeholder="How can we help you?"
                    />
                </div>

                {status === "error" && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>Something went wrong. Please try again or contact us directly.</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-navy hover:bg-royal-blue text-white font-bold py-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === "submitting" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
