"use client";

import { motion } from "framer-motion";
import { Building2, User, Mail, Phone } from "lucide-react";

interface Step1Props {
    formData: {
        businessName: string;
        contactName: string;
        mobile: string;
        email: string;
    };
    onUpdate: (data: Partial<Step1Props["formData"]>) => void;
    onNext: () => void;
}

export default function Step1LeadCapture({ formData, onUpdate, onNext }: Step1Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    const isValid = formData.businessName && formData.contactName && formData.mobile && formData.email;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-navy mb-3">
                        Let's Get Started
                    </h2>
                    <p className="text-gray-600">
                        We'll tailor your business setup estimate based on your specific needs
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    {/* Business Name */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-2">
                            <Building2 className="w-4 h-4 text-royal-blue" />
                            Business Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.businessName}
                            onChange={(e) => onUpdate({ businessName: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-navy focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                            placeholder="e.g., Tech Innovations LLC"
                        />
                    </div>

                    {/* Contact Name */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-2">
                            <User className="w-4 h-4 text-royal-blue" />
                            Your Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.contactName}
                            onChange={(e) => onUpdate({ contactName: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-navy focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                            placeholder="e.g., Ahmed Al Mansoori"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-2">
                            <Phone className="w-4 h-4 text-royal-blue" />
                            Mobile Number (WhatsApp)
                        </label>
                        <input
                            type="tel"
                            required
                            value={formData.mobile}
                            onChange={(e) => onUpdate({ mobile: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-navy focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                            placeholder="+971 50 123 4567"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            We'll send your quote via WhatsApp for instant access
                        </p>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-2">
                            <Mail className="w-4 h-4 text-royal-blue" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => onUpdate({ email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-navy focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                            placeholder="ahmed@company.com"
                        />
                    </div>

                    {/* Privacy Note */}
                    <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                        <p className="text-xs text-blue-900">
                            🔒 Your information is secure and will only be used to provide your personalized quote.
                            We respect your privacy and never share your data with third parties.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="w-full bg-royal-blue hover:bg-navy text-white font-bold py-4 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        Continue to Business Details →
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
