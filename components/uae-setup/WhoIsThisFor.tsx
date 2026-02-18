"use client";

import { motion } from "framer-motion";
import { Plane, Crown, RefreshCcw, Briefcase } from "lucide-react";

const audiences = [
    {
        icon: Plane,
        title: "Expats Going Independent",
        description: "Leaving your job to start your own business? We'll guide you on the right license type, visa pathway, and how to maintain your residency status — without the guesswork."
    },
    {
        icon: Crown,
        title: "UAE Nationals",
        description: "As an Emirati entrepreneur, you have unique advantages — including mainland ownership rights and government incentives. We help you leverage every one of them."
    },
    {
        icon: RefreshCcw,
        title: "SME Owners Restructuring",
        description: "Growing beyond your current setup? Whether you need to add a new activity, open a branch, or restructure for Corporate Tax efficiency, we've done it all."
    },
    {
        icon: Briefcase,
        title: "First-Time Entrepreneurs",
        description: "Never set up a company before? We explain everything in plain language — no jargon, no surprises — and handle all the paperwork from Day 1."
    }
];

export default function WhoIsThisFor() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">
                        We Understand the UAE Market. Because We're Here Too.
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg hover:border-gold/20 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <audience.icon className="w-6 h-6 text-royal-blue" />
                            </div>
                            <h3 className="text-lg font-bold text-navy mb-3">
                                {audience.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {audience.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
