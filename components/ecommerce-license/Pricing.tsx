"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function Pricing() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
                        Transparent Pricing
                    </h2>
                    <p className="text-gray-600">
                        Get started with the most competitive e-commerce package in the UAE.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                    <div className="bg-royal-blue p-6 text-center text-white">
                        <h3 className="text-xl font-bold uppercase tracking-wider mb-2">E-Commerce License</h3>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-sm opacity-80">Starting from</span>
                            <span className="text-4xl font-bold">AED 3,999</span>
                        </div>
                    </div>

                    <div className="p-8">
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-700">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>No Hidden Fees</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>Flexible Payment Options</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>Custom Quotes for Add-ons</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>Free Consultation Included</span>
                            </li>
                        </ul>

                        <a
                            href="#ecommerce-form"
                            className="block w-full bg-gold hover:bg-yellow-500 text-navy font-bold text-center py-4 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            Get Exact Quote Now
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            *Terms & Conditions apply. Price may vary based on exact requirements.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
