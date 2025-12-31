"use client";

import { motion } from "framer-motion";
import { Calculator, FileText, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const services = [
    {
        title: "Accounting & Auditing",
        icon: Calculator,
        description: "Comprehensive financial management and assurance services",
        subServices: [
            "Accounting & Bookkeeping",
            "Auditing & Assurance",
            "Internal/External Audit",
            "Liquidation Report",
            "Statutory Audit",
            "Due Diligence Audit",
            "VAT Accounting Services"
        ],
        color: "from-royal-blue to-sky-blue"
    },
    {
        title: "Taxation",
        icon: FileText,
        description: "Expert tax advisory and compliance solutions",
        subServices: [
            "Corporate Tax Advisory",
            "Excise Tax Service",
            "Tax Agency Services",
            "Tax Audit",
            "VAT Consultancy Services",
            "GoAML Compliance Services",
            "Manage KYC & Due Diligence"
        ],
        color: "from-sky-blue to-royal-blue"
    },
    {
        title: "Advisory & Growth",
        icon: TrendingUp,
        description: "Strategic business consulting and expansion services",
        subServices: [
            "Business Setup Services",
            "Compliance Advisory",
            "Corporate Finance",
            "Human Resource Services",
            "Trade Finance Services",
            "Trademark Registration",
            "Digital Growth Performance"
        ],
        color: "from-royal-blue/80 to-sky-blue/80"
    }
];

export default function ServiceBentoGrid() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="bg-navy py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our Service Pillars
                    </h2>
                    <p className="text-xl text-white max-w-3xl mx-auto">
                        Three core pillars supporting your business success in the UAE
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        const isHovered = hoveredIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                className="group relative"
                            >
                                {/* Glassmorphism Card */}
                                <div className="relative bg-white/5 backdrop-blur-lg rounded-[4px] p-8 border border-white/10 hover:border-sky-blue/50 transition-all duration-500 h-full overflow-hidden">
                                    {/* Gradient Background on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    {/* Icon */}
                                    <div className="relative mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-royal-blue to-sky-blue rounded-[4px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-blue transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white mb-6">
                                        {service.description}
                                    </p>

                                    {/* Sub-services List */}
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: isHovered ? "auto" : 0,
                                            opacity: isHovered ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="space-y-2 mb-6">
                                            {service.subServices.map((subService, subIndex) => (
                                                <li key={subIndex} className="flex items-start gap-2 text-sm text-white">
                                                    <ChevronRight className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
                                                    <span>{subService}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    {/* CTA */}
                                    <Link href={`/services/${service.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="text-sky-blue font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                        Explore Services
                                        <ChevronRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
