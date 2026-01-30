"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
    return (
        <section className="relative pt-40 pb-20 px-6 lg:px-8 bg-navy text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-royal-blue/30 to-navy z-0" />

            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-blue/5 skew-x-12 blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        About Us
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Bridgewater Management Consultancies – Your catalyst for global financial success.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
