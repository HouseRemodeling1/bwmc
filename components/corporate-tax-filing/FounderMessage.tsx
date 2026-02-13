"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderMessage() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
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
                            A Message on Tax Compliance <br className="hidden lg:block" />
                            from Our Managing Partner
                        </h2>
                        <h3 className="text-lg text-gold font-semibold uppercase tracking-wider mb-8">
                            Ensuring Your Business Thrives
                        </h3>

                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            The introduction of Corporate Tax in the UAE marks a significant shift in the business landscape. At BWMC, we see this not just as a compliance requirement, but as an opportunity for businesses to strengthen their financial governance.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Our dedicated tax team is committed to guiding you through these changes with clarity and precision. We ensure that your business remains compliant while optimizing your tax position, allowing you to focus on what you do best—growing your company.
                        </p>

                        <div className="inline-block mt-4 text-left">
                            <p className="text-xl font-bold text-navy">Managing Partner</p>
                            <p className="text-royal-blue text-sm">Bridgewater Management Consultancies</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
