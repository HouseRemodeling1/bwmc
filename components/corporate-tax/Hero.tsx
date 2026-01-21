"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Clock, Award } from "lucide-react";
import LeadCaptureForm from "./LeadCaptureForm";

export default function Hero() {
    return (
        <section className="relative min-h-screen lg:min-h-[90vh] flex items-center pt-32 pb-20 bg-gradient-to-br from-[#1a4d6f] to-[#2d6a8f] overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#f4a460] animate-pulse" />
                            <span className="text-xs font-bold tracking-widest uppercase">UAE Corporate Tax Ready</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                            UAE Corporate Tax Services: <br />
                            <span className="text-[#f4a460]">Compliant & Optimized.</span>
                        </h1>

                        <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
                            Navigate the 9% Corporate Tax regime with confidence. From FTA registration to filing and Free Zone assessments, we ensure your business remains fully compliant and optimized.
                        </p>

                        <div className="flex flex-wrap gap-6 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg text-[#f4a460]">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">FTA Compliance</p>
                                    <p className="text-white/60 text-xs">Registration & Filing</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg text-[#f4a460]">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">Timely Filing</p>
                                    <p className="text-white/60 text-xs">Avoid Penalties</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg text-[#f4a460]">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">Tax Optimization</p>
                                    <p className="text-white/60 text-xs">Free Zone & Reliefs</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white/50 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#f4a460]" />
                            <span>100% FTA Compliant</span>
                            <span className="mx-2">•</span>
                            <CheckCircle2 className="w-4 h-4 text-[#f4a460]" />
                            <span>Expert Tax Agents</span>
                        </div>
                    </motion.div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <LeadCaptureForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
