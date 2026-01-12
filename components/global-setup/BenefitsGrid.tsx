"use client";

import { motion } from "framer-motion";
import { Building2, Coins, Globe2, Plane, ShieldCheck, TrendingUp } from "lucide-react";

const benefits = [
    {
        icon: Coins,
        title: "Tax Optimization",
        description: "Benefit from 0% Personal Income Tax and 0% Capital Gains Tax. Maximize your profits in a tax-efficient environment."
    },
    {
        icon: ShieldCheck,
        title: "100% Ownership",
        description: "Retain complete control of your business. Foreign nationals can now own 100% of their mainland and free zone companies."
    },
    {
        icon: Globe2,
        title: "Strategic Gateway",
        description: "Position your business at the crossroads of Europe, Asia, and Africa. Access 2.5 billion consumers within a 4-hour flight."
    },
    {
        icon: TrendingUp,
        title: "Thriving Economy",
        description: "Join one of the world's fastest-growing economies with a stable currency pegged to the US Dollar and world-class infrastructure."
    },
    {
        icon: Plane,
        title: "Investor Residency",
        description: "Secure long-term residency for you and your family. The UAE Golden Visa offers stability and freedom of movement."
    },
    {
        icon: Building2,
        title: "Remote Setup",
        description: "Start your journey from anywhere. Our digital-first process means you don't need to visit the UAE to incorporate."
    }
];

export default function BenefitsGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">
                        Why the UAE is Your Next Business Frontier
                    </h2>
                    <p className="text-lg text-gray-600">
                        A global business hub designed for growth, innovation, and prosperity.
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
