"use client";

import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, TrendingUp } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Understand Your Needs",
        subtitle: "identify client’s need",
        description: "We begin by listening carefully to your business goals, challenges, and financial objectives. Our team conducts an in-depth analysis to fully understand your specific requirements, ensuring we offer solutions tailored to your business.",
        icon: MessageSquare
    },
    {
        number: "02",
        title: "Develop Customized Solutions",
        subtitle: "Propose Customized Solution",
        description: "Based on our analysis, we design strategic, customized financial solutions. Whether it’s accounting, auditing, taxation, or business setup, every service is crafted to maximize growth, ensure compliance, and optimize operational efficiency.",
        icon: Lightbulb
    },
    {
        number: "03",
        title: "Implement, Support, and Grow",
        subtitle: "Implement & Improvise",
        description: "We seamlessly implement the solutions, offering continuous support and insights to adapt to your evolving needs. Our focus is on delivering measurable results, empowering your business for sustainable financial success.",
        icon: TrendingUp
    }
];

export default function Process() {
    return (
        <section className="py-24 bg-navy text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(#4A90E2 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }}></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Working Process</h2>
                    <p className="text-xl text-white/70">From Consultation to Growth</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[4px] hover:bg-white/10 transition-colors group"
                            >
                                <div className="absolute -top-6 left-8 bg-royal-blue text-white font-bold text-xl w-12 h-12 flex items-center justify-center rounded-[4px] shadow-lg">
                                    {step.number}
                                </div>

                                <div className="pt-8">
                                    <div className="mb-6 flex items-center gap-3">
                                        <Icon className="w-8 h-8 text-sky-blue group-hover:scale-110 transition-transform" />
                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                    </div>

                                    <div className="mb-4 text-xs font-bold text-sky-blue uppercase tracking-wider">
                                        {step.subtitle}
                                    </div>

                                    <p className="text-white/70 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
