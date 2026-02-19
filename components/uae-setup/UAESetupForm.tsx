"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Phone, Mail, MapPin } from "lucide-react";

export default function UAESetupForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        emirate: "Dubai",
        email: "",
        phone: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const payload = {
                businessName: formData.company,
                contactName: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                mobile: formData.phone,
                businessActivity: "UAE Setup Inquiry",
                jurisdiction: "UAE Mainland/Freezone",
                country: formData.emirate,
                message: "Interested in UAE Business Setup Cost Estimate"
            };

            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                // Trigger Google Ads Conversion
                if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
                    (window as any).gtag_report_conversion();
                }

                setStatus("success");
                setFormData({ firstName: "", lastName: "", company: "", emirate: "Dubai", email: "", phone: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="uae-setup-form" className="py-24 bg-navy relative">
            <div className="absolute inset-0 bg-royal-blue/10"></div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left: Contact Info */}
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Get Started? <br />
                            Let's Talk Today.
                        </h2>
                        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                            Our consultants are available Saturday to Thursday, 9AM–6PM. Call us, WhatsApp us, or walk into our Dubai office.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Call Us</h3>
                                    <a href="tel:+97145488184" className="text-gray-300 hover:text-white transition-colors block mt-1">
                                        +971 4 548 8184
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <img src="/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" style={{ filter: "invert(1)" }} /> {/* Using image or icon */}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">WhatsApp</h3>
                                    <a href="https://wa.me/971543097850" target="_blank" className="text-gray-300 hover:text-white transition-colors block mt-1">
                                        +971 54 309 7850
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Visit Us</h3>
                                    <p className="text-gray-300 mt-1 max-w-xs">
                                        Emarat Atrium, 1st Floor, Unit 147, Sheikh Zayed Rd, Dubai
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-2xl font-bold text-navy mb-6">Get Your Free Cost Estimate</h3>

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
                                        Thank you for your interest. One of our experts will contact you shortly with your estimate.
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
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
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
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
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

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Emirate</label>
                                        <select
                                            value={formData.emirate}
                                            onChange={e => setFormData({ ...formData, emirate: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all bg-white text-black"
                                        >
                                            <option value="Dubai">Dubai</option>
                                            <option value="Abu Dhabi">Abu Dhabi</option>
                                            <option value="Sharjah">Sharjah</option>
                                            <option value="Ajman">Ajman</option>
                                            <option value="RAK">RAK</option>
                                            <option value="Fujairah">Fujairah</option>
                                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                                        </select>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
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
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
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

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full bg-gold hover:bg-yellow-600 text-navy font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 !cursor-pointer disabled:!cursor-not-allowed disabled:opacity-70"
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Get My Free Consultation
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-center text-gray-400 mt-4">
                                        By submitting this form, you agree to our privacy policy.
                                    </p>

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
            </div>
        </section>
    );
}
