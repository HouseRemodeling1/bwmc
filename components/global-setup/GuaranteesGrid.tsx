"use client";

import { motion } from "framer-motion";
import { BadgePercent, Zap, Store, FileCheck } from "lucide-react";

const features = [
    {
        icon: BadgePercent,
        title: "Lowest Price Guarantee",
        description: "We provide an upfront price guarantee. We ensure you get the most competitive rates for your business setup.",
    },
    {
        icon: Zap,
        title: "Quick License Issuance",
        description: "Our company formation consultants ensure the issuance of company licenses within the shortest possible time.",
    },
    {
        icon: Store,
        title: "One-Stop-Shop Solutions",
        description: "We provide end-to-end business setup services, from company formation to visa processing and bank account opening.",
    },
    {
        icon: FileCheck,
        title: "Transparent Pricing", // Changed from "Zero Service Fee" to be safer/more professional unless confirmed
        description: "No hidden costs. You pay the government fees and our transparent service charges with full clarity.",
    },
];

export default function GuaranteesGrid() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="w-14 h-14 bg-navy/5 rounded-lg flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7 text-royal-blue" />
                            </div>
                            <h3 className="text-lg font-bold text-navy mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
