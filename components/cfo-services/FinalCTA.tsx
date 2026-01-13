"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                        Unlock Your Business's <br />
                        <span className="text-royal-blue">Full Financial Potential.</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Partner with BWMC for strategic CFO services that drive profitability and ensure long-term success in the dynamic UAE market.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-navy hover:bg-royal-blue text-white font-bold rounded-lg transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:-translate-y-1"
                        >
                            Request a Free Financial Consultation
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <a
                            href="tel:+971542763828"
                            className="px-8 py-4 bg-royal-blue/10 hover:bg-royal-blue/20 text-navy font-bold rounded-lg transition-all flex items-center gap-2"
                        >
                            <Phone className="w-5 h-5" />
                            Contact Us Directly
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
