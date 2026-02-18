"use client";

import { motion } from "framer-motion";
import { Monitor, Megaphone, Check } from "lucide-react";

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

                <div className="grid md:grid-cols-2 gap-8">
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
                        <ul className="space-y-3 mb-8">
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
                        <button className="w-full py-3 border-2 border-royal-blue text-royal-blue font-bold rounded-lg hover:bg-royal-blue hover:text-white transition-colors">
                            Add to Package
                        </button>
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
                        <ul className="space-y-3 mb-8">
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
                        <button className="w-full py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-600 hover:text-white transition-colors">
                            Add to Package
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
