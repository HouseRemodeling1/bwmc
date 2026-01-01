"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Building2, Calculator, Scale, Users2, FileBarChart } from "lucide-react";

const expertiseItems = [
    {
        title: "Business Setup & Company Formation",
        icon: Building2
    },
    {
        title: "Accounting & Bookkeeping Services",
        icon: Calculator
    },
    {
        title: "Tax Registration & Compliance",
        icon: Scale
    },
    {
        title: "Payroll Management",
        icon: Users2
    },
    {
        title: "Financial Reporting & Advisory",
        icon: FileBarChart
    }
];

export default function OurExpertise() {
    return (
        <section className="py-24 bg-neutral overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8">
                            Our Expertise
                        </h2>
                        <p className="text-xl text-navy/70 leading-relaxed mb-8">
                            We specialize in end-to-end business solutions designed to help companies start strong and stay compliant. From business formation to day-to-day financial management, our team ensures accuracy, transparency, and peace of mind at every stage.
                        </p>

                        <div className="space-y-4">
                            {expertiseItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-center gap-4 p-4 bg-white rounded-[4px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="w-10 h-10 bg-royal-blue/10 rounded-[4px] flex items-center justify-center text-royal-blue shrink-0">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-navy">{item.title}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Abstract Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-square">
                            {/* Decorative elements */}
                            <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-sky-blue/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border-2 border-royal-blue/30 rounded-[4px] rotate-12" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border-2 border-sky-blue/30 rounded-[4px] -rotate-6" />

                            {/* Center Icon Block */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-navy rounded-[4px] flex items-center justify-center shadow-2xl z-10">
                                <CheckCircle2 className="w-16 h-16 text-white" />
                            </div>

                            {/* Floating Stats or Labels (Visual only) */}
                            <div className="absolute top-1/4 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-100 animate-bounce-slow">
                                <div className="text-royal-blue font-bold">100%</div>
                                <div className="text-[10px] uppercase tracking-tighter text-gray-400">Compliance</div>
                            </div>
                            <div className="absolute bottom-1/4 left-0 bg-white p-4 rounded-lg shadow-lg border border-gray-100 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                                <div className="text-sky-blue font-bold">End-to-End</div>
                                <div className="text-[10px] uppercase tracking-tighter text-gray-400">Support</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
