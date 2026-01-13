"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    const scrollToContact = () => {
        const contactSection = document.getElementById("contact-section");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden pt-20">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
                    alt="Financial Strategy Meeting"
                    fill
                    className="object-cover opacity-10"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-navy mb-6">
                            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                            <span className="text-xs font-bold tracking-widest uppercase">Fractional CFO Services</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-navy leading-tight mb-6">
                            Strategic Financial <br />
                            Leadership for Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-purple-700">
                                UAE Business.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                            Gain C-suite financial expertise without the overhead. Optimize cash flow, ensure compliance, and drive sustainable growth with BWMC.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-navy hover:bg-royal-blue text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Schedule a Strategic Review
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="px-8 py-4 bg-white border border-gray-200 hover:border-navy text-navy font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group">
                                <Download className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                                Download Brochure
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Visual (Abstract or Dashboard) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-2">
                            <Image
                                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
                                alt="CFO Dashboard Analysis"
                                width={800}
                                height={600}
                                className="rounded-xl"
                            />

                            {/* Floating Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute bottom-8 -left-8 bg-white p-5 rounded-lg shadow-xl border border-gray-100 max-w-xs"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 bg-green-50 rounded-full text-green-600">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Cash Flow</p>
                                        <p className="text-xl font-bold text-navy">+24% Optimized</p>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[75%]" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
