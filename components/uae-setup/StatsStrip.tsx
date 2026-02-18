"use client";

import { motion } from "framer-motion";

export default function StatsStrip() {
    const stats = [
        {
            value: "100+",
            label: "Businesses Setup",
            delay: 0
        },
        {
            value: "100%",
            label: "Application Success Rate",
            delay: 0.1
        },
        {
            value: "48 Hrs",
            label: "Fastest License Issuance",
            delay: 0.2
        },
        {
            value: "12 Yrs",
            label: "UAE Experience",
            delay: 0.3
        }
    ];

    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: stat.delay }}
                            className="text-center"
                        >
                            <h3 className="text-4xl md:text-5xl font-bold text-royal-blue mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-widest uppercase">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
