"use client";

import { motion } from "framer-motion";
import { Monitor, Megaphone, Check, ArrowRight } from "lucide-react";

export default function UpsellServices() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
                        Launch & Grow – We Don't Stop at Your License
                    </h2>
                    <p className="text-lg text-gray-600">
                        Accelerate your success with our optional growth packages designed to get you selling faster.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Website Development */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col h-full"
                    >
                        <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-royal-blue">
                            <Monitor className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-navy mb-4">Website Development</h3>
                        <p className="text-gray-600 mb-6 flex-grow">
                            Get a professional, high-converting e-commerce store built on Shopify or WooCommerce.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <Check className="w-5 h-5 text-green-500" />
                                Professional E-Commerce Website
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <Check className="w-5 h-5 text-green-500" />
                                Shopify / WooCommerce Setup
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <Check className="w-5 h-5 text-green-500" />
                                Payment Gateway Integration
                            </li>
                        </ul>
                    </motion.div>

                    {/* Marketing Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col h-full"
                    >
                        <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                            <Megaphone className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-navy mb-4">Marketing Support</h3>
                        <p className="text-gray-600 mb-6 flex-grow">
                            Drive traffic and sales from day one with our expert digital marketing services.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <Check className="w-5 h-5 text-green-500" />
                                Social Media Setup & Management
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <Check className="w-5 h-5 text-green-500" />
                                Paid Ads Management (Google/Meta)
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-700">
                                <Check className="w-5 h-5 text-green-500" />
                                SEO Optimization
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Red Box CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border-2 border-[#A80000] rounded-lg p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12"
                >
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-navy leading-snug">
                            Want to Add These Growth Services to Your Package?{" "}
                            <span className="text-[#A80000]">
                                Speak to an Expert for a Custom Quote.
                            </span>
                        </h3>
                    </div>
                    <div className="flex-shrink-0">
                        <a
                            href="https://wa.me/971543097850"
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-[#A80000] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#8a0000] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Get Custom Quote
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
