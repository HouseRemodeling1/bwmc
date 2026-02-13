"use client";

import { motion } from "framer-motion";
import { BadgePercent, FileSearch, ShieldCheck, Scale, TrendingUp, HandCoins } from "lucide-react";

const benefits = [
    {
        icon: BadgePercent,
        title: "Maximized Deductions",
        description: "We identify all eligible business expenses to minimize your taxable income and maximize your retained earnings."
    },
    {
        icon: ShieldCheck,
        title: "Full Compliance",
        description: "Stay 100% compliant with UAE Corporate Tax laws. We handle all registrations and filings to avoid hefty penalties."
    },
    {
        icon: TrendingUp,
        title: "Strategic Planning",
        description: "Future-proof your business with tax-efficient structures and strategies tailored to your industry."
    },
    {
        icon: FileSearch,
        title: "Audit Readiness",
        description: "Maintain impeccable records. We prepare your financial statements to be audit-ready at all times for the FTA."
    },
    {
        icon: HandCoins,
        title: "Small Business Relief",
        description: "Leverage Small Business Relief exemptions if eligible. We help you navigate the criteria to legally pay 0% tax."
    },
    {
        icon: Scale,
        title: "Digital Filing",
        description: "Seamless, digital-first filing process. Upload your documents to our secure portal and we handle the rest."
    }
];

export default function BenefitsGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">
                        Why Choose BWMC for Corporate Tax?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Expert guidance to navigate the UAE's tax landscape with confidence and precision.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg hover:border-gold/20 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <benefit.icon className="w-6 h-6 text-royal-blue" />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
