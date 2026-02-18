"use client";

import { motion } from "framer-motion";
import { BadgeCheck, UserCheck, Headset, BadgePercent } from "lucide-react";

const differentiators = [
    {
        icon: BadgeCheck,
        title: "FTA Registered & MoE Approved",
        description: "Officially recognized by UAE regulatory authorities."
    },
    {
        icon: UserCheck,
        title: "Dedicated Account Manager",
        description: "One point of contact throughout your entire setup."
    },
    {
        icon: Headset,
        title: "Post-Setup Support",
        description: "License renewals, visa changes, tax filings. We're still here after Day 1."
    },
    {
        icon: BadgePercent,
        title: "Lowest Price Guarantee",
        description: "Found a lower quote? Show us and we'll match it or explain why."
    }
];

export default function WhyBWMC() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">
                        We're Not an Online Portal. We're Your Local Business Partner.
                    </h2>
                    <p className="text-lg text-gray-600">
                        Unlike comparison websites or online formation platforms, BWMC is a real consultancy with a physical office on Sheikh Zayed Road, Dubai. When something goes wrong — and in business setup, delays happen — you have a team you can call, visit, and hold accountable.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {differentiators.map((diff, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center"
                        >
                            <div className="w-14 h-14 bg-navy/5 rounded-lg flex items-center justify-center mb-6 mx-auto">
                                <diff.icon className="w-7 h-7 text-royal-blue" />
                            </div>
                            <h3 className="text-lg font-bold text-navy mb-3">
                                {diff.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {diff.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
