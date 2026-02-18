"use client";

import { motion } from "framer-motion";
import { Building2, Globe2 } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FreeZoneMainland() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">
                        Free Zone or Mainland? We'll Help You Pick the Right One.
                    </h2>
                    <p className="text-lg text-gray-600">
                        This is the most common question we hear — and the honest answer is: it depends on your business activity, your customers, and your growth plans. Here's a quick breakdown:
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
                    {/* Free Zone Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <Globe2 className="w-6 h-6 text-royal-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy">Free Zone</h3>
                        </div>

                        <ul className="space-y-4 mb-6 flex-grow">
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Best For:</span>
                                <span>Consulting, e-commerce, import/export, remote services</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Ownership:</span>
                                <span>100% foreign ownership</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Sell in UAE:</span>
                                <span>Via local distributor</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Office:</span>
                                <span>Flexi-desk options available</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Cost:</span>
                                <span className="text-green-600 font-semibold">Generally lower</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Popular:</span>
                                <span>IFZA, SHAMS, DMCC, RAKEZ</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Mainland Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md flex flex-col"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-navy/5 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-navy" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy">Mainland</h3>
                        </div>

                        <ul className="space-y-4 mb-6 flex-grow">
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Best For:</span>
                                <span>Retail, local trading, government contracts</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Ownership:</span>
                                <span>100% foreign ownership (most activities)</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Sell in UAE:</span>
                                <span>Yes, directly</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Office:</span>
                                <span>Physical or shared workspace required</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Cost:</span>
                                <span className="text-orange-600 font-semibold">Generally higher</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-navy w-24 flex-shrink-0">Issued By:</span>
                                <span>DED Dubai, Abu Dhabi DED</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <div className="text-center">
                    <p className="text-gray-600 mb-6">
                        Not sure which fits? A 15-minute call with our consultants is all it takes to get a clear answer.
                    </p>
                    <Link
                        href="https://wa.me/971543097850"
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-300 hover:border-royal-blue hover:text-royal-blue text-navy font-bold rounded-lg transition-all"
                    >
                        Book a Free 15-Min Consultation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
