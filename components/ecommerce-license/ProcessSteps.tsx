"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Choose Your Activity",
        description: "Select your e-commerce business activity and confirm the package."
    },
    {
        number: "02",
        title: "Submit Documents",
        description: "Upload your passport copy and complete the simple online application."
    },
    {
        number: "03",
        title: "Receive Your License",
        description: "Get your fully approved e-commerce license in as little as 24 hours."
    }
];

export default function ProcessSteps() {
    return (
        <section className="py-24 bg-navy text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple 3-Step Process</h2>
                    <p className="text-gray-300">Launch your business without the headache.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/10 -z-0"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative z-10 text-center"
                        >
                            <div className="w-24 h-24 bg-royal-blue rounded-full border-8 border-navy flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 text-sm max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
