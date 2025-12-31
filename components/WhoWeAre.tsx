"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WhoWeAre() {
    return (
        <section className="bg-white py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10"
                    >
                        <div className="inline-block px-4 py-2 bg-sky-blue/10 rounded-full mb-6">
                            <span className="text-royal-blue font-bold text-sm tracking-wide uppercase">Who we are</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8 leading-tight">
                            Trusted Financial Experts <span className="text-royal-blue">in the UAE</span>
                        </h2>

                        <div className="space-y-6 text-lg text-black leading-relaxed mb-8">
                            <p>
                                BWMC helps you launch, grow, or streamline your business with expert financial services.
                                We provide business setup support and scalable ERP solutions - everything you need, in one place.
                            </p>
                            <p>
                                As your strategic partner, we move beyond traditional consultancy to offer proactive
                                guidance that anticipates challenges and identifies opportunities in the UAE's
                                rapidly evolving regulatory landscape.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {["Tailored Financial Strategies", "End-to-End Business Setup", "Comprehensive Tax Compliance", "Custom ERP Implementations"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <BadgeCheck className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-navy font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-royal-blue font-bold hover:text-sky-blue transition-colors group"
                        >
                            Learn More About Us
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Visuals */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <div className="relative rounded-[4px] overflow-hidden shadow-2xl bg-neutral h-[500px]">
                            {/* Corporate office / team meeting placeholder image */}
                            <Image
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop"
                                alt="BWMC Team Meeting"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-navy/20" />
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[4px] shadow-xl border border-neutral/20 max-w-xs hidden md:block">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-sky-blue/10 rounded-full flex items-center justify-center">
                                    <BadgeCheck className="w-6 h-6 text-royal-blue" />
                                </div>
                                <div>
                                    <div className="font-bold text-navy text-xl">100%</div>
                                    <div className="text-xs text-black">Success Rate</div>
                                </div>
                            </div>
                            <p className="text-sm text-black italic">
                                "Driven by precision, compliance, and growth-oriented strategies."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
