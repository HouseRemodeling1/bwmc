"use client";

import { motion } from "framer-motion";
import { BadgePercent, Zap, Store, FileCheck } from "lucide-react";

const features = [
    {
        icon: BadgePercent,
        title: "Zero Penalties",
        description: "Our meticulous review process ensures 100% accuracy, safeguarding your business from FTA fines and penalties.",
    },
    {
        icon: Zap,
        title: "Speedy Filing",
        description: "We value your time. Our streamlined digital process ensures your returns are filed well before the deadline.",
    },
    {
        icon: Store,
        title: "All-in-One Solution",
        description: "From registration and book-keeping to calculation and filing, we handle end-to-end corporate tax compliance.",
    },
    {
        icon: FileCheck,
        title: "Fixed Fee Structure",
        description: "No hidden costs or hourly billing. We offer transparent, fixed-fee packages tailored to your business size.",
    },
    {
        icon: Store,
        title: "All-in-One Solution",
        description: "From registration and book-keeping to calculation and filing, we handle end-to-end corporate tax compliance.",
    },
];

export default function GuaranteesGrid() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.slice(0, 4).map((feature, index) => (
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
