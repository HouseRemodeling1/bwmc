"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="py-24 bg-navy relative overflow-hidden text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute w-full h-full bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                    Ready to Launch Your Online Business in Dubai?
                </h2>
                <p className="text-xl text-gray-300 mb-12">
                    Don't let paperwork hold you back. Start selling in 24 hours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-navy hover:bg-gray-100 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
                    >
                        Book Free Consultation
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="https://wa.me/971543097850"
                        target="_blank"
                        className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-lg backdrop-blur-sm transition-all flex items-center justify-center gap-2 text-lg"
                    >
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        WhatsApp Us Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
