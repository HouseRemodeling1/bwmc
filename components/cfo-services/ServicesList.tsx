"use client";

import { motion } from "framer-motion";
import { PieChart, TrendingUp, ShieldAlert, BadgeDollarSign, Scale } from "lucide-react";

export default function ServicesList() {
    const services = [
        {
            title: "Financial Strategy & Planning",
            icon: PieChart,
            items: [
                "Budgeting & Forecasting Models",
                "Cash Flow Management & Optimization",
                "Financial Modeling & Scenario Planning",
                "Investment Analysis & Capital Allocation"
            ]
        },
        {
            title: "Performance Management",
            icon: TrendingUp,
            items: [
                "KPI Development & Tracking",
                "Management Reporting & Dashboards",
                "Profitability Analysis & Cost Optimization",
                "Strategic Business Reviews"
            ]
        },
        {
            title: "Risk & Compliance",
            icon: ShieldAlert,
            items: [
                "UAE Corporate Tax Advisory",
                "VAT Compliance & Filing",
                "ESR Reporting & Economic Substance",
                "Internal Controls & Audit Readiness"
            ]
        },
        {
            title: "Fundraising & Investor Relations",
            icon: BadgeDollarSign,
            items: [
                "Capital Raising Support",
                "Investor Deck Preparation",
                "Due Diligence Assistance",
                "Investor Communication Strategy"
            ]
        },
        {
            title: "Business Valuation",
            icon: Scale,
            items: [
                "Valuation for Mergers & Acquisitions",
                "Strategic Planning Valuation",
                "Exit Strategy Planning",
                "Fair Value Assessments"
            ]
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                        Tailored Financial Leadership <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-purple-600">
                            to Propel Your Growth
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`p-8 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all group ${index === 3 || index === 4 ? "lg:col-span-1.5" : ""}`}
                        >
                            <div className="w-14 h-14 bg-navy text-white rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                                <service.icon className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-bold text-navy mb-4">{service.title}</h3>

                            <ul className="space-y-3">
                                {service.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                                        <span className="text-gray-600 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a href="/services" className="inline-flex items-center text-royal-blue font-bold hover:underline">
                        Explore Our Full Range of Services
                    </a>
                </div>
            </div>
        </section>
    );
}
