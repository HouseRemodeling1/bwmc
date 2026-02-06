"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ExpertCTA() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border-2 border-[#A80000] rounded-lg p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12"
                >
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-navy leading-snug">
                            Need Help Choosing the Best Business Setup Option for You?{" "}
                            <span className="text-[#A80000]">
                                Get in Touch with a Dubai Company Formation Expert.
                            </span>
                        </h3>
                    </div>

                    <div className="flex-shrink-0">
                        <Link
                            href="https://wa.me/971543097850"
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-[#A80000] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#8a0000] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Get in Touch
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
