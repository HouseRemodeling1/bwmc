"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import InternationalForm from "../global-setup/InternationalForm";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-36 pb-20">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
                    alt="Financial Strategy Meeting"
                    fill
                    className="object-cover opacity-10"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-navy mb-6">
                            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                            <span className="text-xs font-bold tracking-widest uppercase">Fractional CFO Services</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-navy leading-tight mb-6">
                            Strategic Financial <br />
                            Leadership for Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-purple-700">
                                UAE Business.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                            Gain C-suite financial expertise without the overhead. Optimize cash flow, ensure compliance, and drive sustainable growth with BWMC.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-gold" />
                                    <span>Optimize Cash Flow</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-gold" />
                                    <span>Ensure Compliance</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-gold" />
                                    <span>Drive Sustainable Growth</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Visual: Lead Capture Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-20"
                    >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <h3 className="text-2xl font-bold text-navy mb-2">Get Your Financial Review</h3>
                            <p className="text-gray-600 mb-6 text-sm">Speak with a Fractional CFO today.</p>

                            {/* Embedding the form directly for immediate capture */}
                            {/* We re-use the InternationalForm */}
                            <InternationalForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
