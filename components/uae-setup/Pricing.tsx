"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Pricing() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-navy mb-4">
                        Straightforward Pricing. No Hidden Costs. No Surprises.
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We believe in full transparency — which is why we give you a real, itemized quote before you commit to anything.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative"
                >
                    {/* Highlight / Decorative Top Bar */}
                    <div className="h-2 bg-gradient-to-r from-royal-blue to-purple-600 w-full"></div>

                    <div className="p-10 md:p-14">
                        <h3 className="text-3xl md:text-5xl font-bold text-navy mb-2">
                            Business Setup Starting From <span className="text-royal-blue">AED 3,999</span>
                        </h3>
                        <p className="text-gray-500 mb-8 mt-4 max-w-xl mx-auto">
                            Includes trade license, government liaison & expert guidance. Final cost depends on your business activity, visa requirements, and chosen jurisdiction.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-700">No Hidden Fees — Government fees are quoted separately and explained upfront</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-700">Full Breakdown Before You Commit — You'll know exactly what you're paying before signing anything</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-700">Lowest Price Guarantee — Show us a lower quote and we'll match it</span>
                            </div>
                        </div>

                        <a href="#uae-setup-form" className="inline-flex items-center gap-2 px-8 py-4 bg-navy hover:bg-royal-blue text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl group">
                            Get My Free Cost Estimate
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
