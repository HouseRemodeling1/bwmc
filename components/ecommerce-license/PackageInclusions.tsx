"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const inclusions = [
    "Trade License Issuance",
    "Company Name Reservation",
    "Legal Documentation",
    "Business Activity Registration",
    "Bank Account Opening Assistance",
    "Corporate Tax Registration",
    "Basic Compliance Guidance",
    "VAT Registration Support (Optional)"
];

export default function PackageInclusions() {
    return (
        <section className="py-24 bg-navy text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-royal-blue rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block bg-gold/20 text-gold px-4 py-2 rounded-full font-bold text-sm mb-6">
                            All-Inclusive Package
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Everything You Need to Start for <span className="text-gold">AED 3,999</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            We've bundled all the essentials into one affordable package so you can focus on building your brand, not dealing with bureaucracy.
                        </p>
                        <a href="#ecommerce-form" className="inline-block bg-gold text-navy font-bold px-8 py-4 rounded-lg hover:bg-yellow-500 transition-colors">
                            Get This Package Now
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-8">What's Included:</h3>
                        <div className="grid gap-4">
                            {inclusions.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-5 h-5 text-green-400" />
                                    </div>
                                    <span className="text-lg font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
