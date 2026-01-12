"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, CheckCircle2 } from "lucide-react";

export default function Hero() {
    const scrollToForm = () => {
        const formSection = document.getElementById("consultation-form");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center bg-navy overflow-hidden">
            {/* Background elements - Abstract Map/Globe hint */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal-blue rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gold mb-6 backdrop-blur-sm">
                            <Globe className="w-4 h-4" />
                            <span className="text-sm font-semibold tracking-wide uppercase">Global Business Gateway</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Launch Your UAE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
                                Business from Anywhere.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                            Unlock the UAE's thriving economy with 0% personal tax, 100% foreign ownership, and expert guidance. No need to relocate to get started.
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 text-white/90">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span>Fast remote setup (7-10 days)</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/90">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span>100% Application Success Rate</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/90">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span>Multi-currency Corporate Banking</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={scrollToForm}
                                className="px-8 py-4 bg-gold hover:bg-yellow-600 text-navy font-bold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Get a Free Consultation
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-all backdrop-blur-sm">
                                Download Setup Guide
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Visual (Placeholder for 3D Earth/Map or Image) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm p-4">
                            {/* Placeholder for High-Quality Spec Image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-royal-blue/20 to-navy rounded-lg flex items-center justify-center border border-white/5">
                                <div className="text-center">
                                    <Globe className="w-32 h-32 text-white/10 mx-auto mb-4" />
                                    <p className="text-white/30 text-sm">Interactive Global Map / UAE Skyline</p>
                                </div>
                            </div>

                            {/* Float Card 1 */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute top-12 -right-8 bg-white p-4 rounded-lg shadow-xl border border-gray-100 max-w-[200px]"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        <p className="text-sm font-bold text-navy">License Issued</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Float Card 2 */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-12 -left-8 bg-navy p-4 rounded-lg shadow-xl border border-white/10 max-w-[200px]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-left">
                                        <p className="text-xs text-white/50">Tax Savings</p>
                                        <p className="text-xl font-bold text-white">0%</p>
                                    </div>
                                    <div className="h-8 w-[1px] bg-white/20"></div>
                                    <div className="text-left">
                                        <p className="text-xs text-white/50">Ownership</p>
                                        <p className="text-xl font-bold text-white">100%</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
