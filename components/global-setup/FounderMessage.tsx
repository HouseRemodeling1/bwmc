"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderMessage() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-collg:flex-row items-center gap-12 lg:gap-20">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/3 flex-shrink-0"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/images/founder.png"
                                alt="Founder & Managing Partner"
                                fill
                                className="object-cover"
                            />
                            {/* Decorative element */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl z-0"></div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-2/3 text-center lg:text-left"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-2">
                            Hear From Our Founder & <br className="hidden lg:block" />
                            Managing Partner
                        </h2>
                        <h3 className="text-lg text-gold font-semibold uppercase tracking-wider mb-8">
                            CFO Advisory, Tax & ERP Consulting
                        </h3>

                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            At Bridgewater Management Consultancies (BWMC), our mission is to empower businesses
                            by providing exceptional support and strategic guidance. We believe in the potential
                            of every entrepreneur and are dedicated to helping them achieve their vision in the UAE.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Our team's demonstrated expertise in financial advisory, tax compliance, and business
                            structuring drives us to deliver top-tier services that make a tangible difference.
                            We don't just set up companies; we build foundations for sustainable success.
                        </p>

                        <div className="inline-block mt-4 text-left">
                            <p className="text-xl font-bold text-navy">Mahesh Thadani</p>
                            <p className="text-sm font-semibold text-gray-500 mb-1">Managing Partner</p>
                            <p className="text-royal-blue text-sm">Bridgewater Management Consultancies</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
