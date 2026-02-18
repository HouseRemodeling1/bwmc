"use client";

import { motion } from "framer-motion";
import { Building2, FileText, Calculator } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    {
        icon: Building2,
        title: "Corporate Tax Registration",
        description: "All UAE businesses must register for Corporate Tax. We handle your registration, structure your setup for tax efficiency, and keep you compliant year-round."
    },
    {
        icon: FileText,
        title: "VAT Registration & Filing",
        description: "If your annual turnover exceeds AED 375,000, VAT registration is mandatory. We register you, set up your filing schedule, and manage quarterly returns."
    },
    {
        icon: Calculator,
        title: "Accounting & Bookkeeping",
        description: "Start with clean books. Our accounting packages are designed for startups and SMEs — affordable monthly plans that scale with your business."
    }
];

export default function LocalCompliance() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">
                        Don't Just Set Up. Set Up Properly.
                    </h2>
                    <p className="text-lg text-gray-600">
                        With UAE Corporate Tax now in effect and VAT enforcement tightening, getting compliant from Day 1 saves you money and stress later.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg hover:border-gold/20 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <service.icon className="w-6 h-6 text-royal-blue" />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="https://wa.me/971543097850"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-royal-blue font-bold hover:text-navy transition-colors"
                    >
                        Ask About Compliance Packages
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
