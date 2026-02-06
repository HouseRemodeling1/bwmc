"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// --- Configuration ---
const FEATURES = [
    "No. of Transactions",
    "Payment Options",
    "Monthly Site Visit",
    "Accounting & Bookkeeping",
    "Quarterly Reporting",
    "VAT Consultation",
    "VAT Returns Filing (Qtly)",
    "Corp Tax Advisory",
    "Dedicated Account Executive",
    "Online Support",
    "Corp Tax Filing (Yearly)"
];

const PACKAGES = [
    {
        name: "START UP",
        price: "249",
        color: "from-[#a13c58] to-[#802440]", // Red/Maroon
        lightColor: "bg-[#a13c58]/10",
        data: [
            "Up to 10",           // Transactions
            "1-2 Payments",       // Payment
            "-",                  // Site Visit
            true,                 // Accounting
            true,                 // Reporting
            true,                 // VAT Consult
            true,                 // VAT Filing
            true,                 // Corp Tax Adv
            true,                 // Account Exec
            true,                 // Online Support
            true                  // Corp Tax Filing
        ]
    },
    {
        name: "SILVER",
        price: "599",
        color: "from-[#3b75a8] to-[#2a557d]", // Blue
        lightColor: "bg-[#3b75a8]/10",
        data: [
            "Up to 50",
            "1-3 Payments",
            "-",
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    },
    {
        name: "GOLD",
        price: "699",
        color: "from-[#d49a46] to-[#b37d2e]", // Orange/Gold
        lightColor: "bg-[#d49a46]/10",
        data: [
            "Up to 150",
            "To Be Discussed",
            "-",
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    },
    {
        name: "PLATINUM",
        price: "899",
        color: "from-[#5ca35e] to-[#407a42]", // Green
        lightColor: "bg-[#5ca35e]/10",
        data: [
            "Up to 300",
            "Flexible Payment",
            "Monthly",
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    },
    {
        name: "ELITE",
        price: "1200",
        color: "from-[#8e5ba6] to-[#6d3e82]", // Purple
        lightColor: "bg-[#8e5ba6]/10",
        data: [
            "Up to 500",
            "Flexible Payment",
            "Monthly",
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    },
    {
        name: "ULTIMATE",
        price: "2500+",
        color: "from-[#dcc038] to-[#bfa322]", // Yellow
        lightColor: "bg-[#dcc038]/10",
        data: [
            "Up to 1300",
            "Flexible Payment",
            "Monthly",
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ]
    }
];

export default function PricingPackages() {
    return (
        <section className="bg-neutral py-20 overflow-hidden" id="packages">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                        Our Accounting, Reporting & Taxation Packages
                    </h2>
                </motion.div>

                {/* Pricing Table Container - Desktop Scrollable if needed */}
                <div className="overflow-x-auto pb-8">
                    <div className="min-w-[1200px] grid grid-cols-[200px_repeat(6,1fr)] gap-2">

                        {/* --- TOP ROW: HEADERS --- */}
                        {/* Empty Top Left Cell */}
                        <div className="pt-32"></div>

                        {/* Package Cards */}
                        {PACKAGES.map((pkg, i) => (
                            <motion.div
                                key={pkg.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative"
                            >
                                {/* Ribbon / Header Card */}
                                <div className={`h-36 rounded-tl-[30px] rounded-br-[30px] rounded-tr-[4px] rounded-bl-[4px] bg-gradient-to-br ${pkg.color} text-white p-4 flex flex-col items-center justify-center shadow-lg relative z-10 mx-1`}>
                                    {/* Star Icon Decor */}
                                    <div className="absolute top-3 left-3 opacity-50">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                                    </div>

                                    <div className="text-center mb-2">
                                        <h3 className="font-bold text-lg leading-tight">{pkg.name}</h3>
                                        <h3 className="font-bold text-lg leading-tight">PACKAGE</h3>
                                    </div>

                                    <div className="bg-white/20 rounded-md px-3 py-1 mt-auto backdrop-blur-sm w-full text-center">
                                        <span className="text-xl font-bold">{pkg.price} AED</span>
                                        <span className="text-xs block opacity-90">per month</span>
                                    </div>

                                    {/* Ribbon Fold Effect (Visual Trick) */}
                                    <div className="absolute -bottom-2 left-0 w-4 h-4 bg-black/20 transform skew-y-12 -z-10 rounded-full blur-sm"></div>
                                </div>
                            </motion.div>
                        ))}


                        {/* --- DATA ROWS --- */}
                        {FEATURES.map((feature, rowIdx) => (
                            <>
                                {/* Row Header */}
                                <div key={`row-${feature}`} className="flex items-center text-xs font-medium text-navy/70 py-3 px-4 bg-gray-50 rounded-l-md border-b border-white">
                                    {feature}
                                </div>

                                {/* Data Cells */}
                                {PACKAGES.map((pkg, colIdx) => {
                                    const value = pkg.data[rowIdx];
                                    const isEven = rowIdx % 2 === 0;

                                    return (
                                        <div
                                            key={`${pkg.name}-${rowIdx}`}
                                            className={`flex items-center justify-center py-3 px-2 text-xs text-navy/80 border-b border-white ${isEven ? 'bg-gray-100/50' : 'bg-gray-200/50'} ${colIdx === PACKAGES.length - 1 ? 'rounded-r-md' : ''}`}
                                        >
                                            {typeof value === 'boolean' ? (
                                                value ? <Check className="w-4 h-4 text-emerald-500" /> : <span className="w-4 h-4 block">-</span>
                                            ) : (
                                                <span className="text-center font-medium">{value}</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        ))}


                        {/* --- BOTTOM ROW: CTA --- */}
                        <div className="pt-4"></div> {/* Spacer */}
                        {PACKAGES.map((pkg) => (
                            <div key={`cta-${pkg.name}`} className="pt-4 px-1">
                                <Link
                                    href="/contact"
                                    className={`block w-full text-center py-2.5 rounded-[4px] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-transform hover:scale-105 bg-gradient-to-r ${pkg.color}`}
                                >
                                    Choose Plan
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-navy/40">* Terms & Conditions Apply. Prices excluding VAT.</p>
                </div>

            </div>
        </section>
    );
}
