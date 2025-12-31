"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const packages = [
    {
        name: "Silver",
        price: "599",
        period: "per month",
        subtitle: "For Small Scale Company",
        features: [
            "Up to 50 Transactions",
            "VAT Consultation",
            "VAT Returns Filing (Qtly)",
            "Corp Tax Advisory",
            "Corp Tax Filing (Yearly)",
            "Dedicated Account Executive",
            "Payment Options: 1-3 Cheques"
        ],
        highlight: false,
        cta: "Contact Us"
    },
    {
        name: "Gold",
        price: "699",
        period: "per month",
        subtitle: "For MidSize Business",
        features: [
            "Everything in Silver, plus:",
            "Up to 150 Transactions",
            "Monthly Reports",
            "Bank Reconciliation",
            "Email Support (24–48 hr)",
            "Compliance Deadlines Reminder",
            "Payment Options: 1-4 Cheques"
        ],
        highlight: true,
        tag: "Most Popular",
        cta: "Contact Us"
    },
    {
        name: "Platinum",
        price: "899",
        period: "per month",
        subtitle: "For Enterprise",
        features: [
            "Everything in Gold, plus:",
            "Up to 300 Transactions",
            "CFO Review (Qtly)",
            "Payroll Support",
            "Priority Support",
            "Email + WhatsApp Access",
            "Flexible Payment Options"
        ],
        highlight: false,
        cta: "Call Now"
    },
    {
        name: "Enterprise",
        price: "2500+",
        period: "per month",
        subtitle: "Large Scale Operations",
        features: [
            "Everything in Platinum, plus:",
            "Unlimited Transactions",
            "Audit Support",
            "Year-end Closure",
            "Unlimited Online Consultations",
            "Custom ERP Integrations",
            "Flexible Payment Options"
        ],
        highlight: false,
        cta: "Contact Us"
    }
];

export default function PricingPackages() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section className="bg-neutral py-24" id="packages">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-2 bg-royal-blue/10 rounded-full mb-4">
                        <span className="text-royal-blue font-bold text-sm">TRANSPARENT PRICING</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                        Accounting, Reporting & <br />Taxation Packages
                    </h2>
                    <p className="text-lg text-navy/60 max-w-2xl mx-auto">
                        Choose the right plan for your business growth stage. No hidden fees, just expert service.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative bg-white rounded-[4px] shadow-sm hover:shadow-xl transition-all duration-300 border overflow-hidden flex flex-col ${pkg.highlight ? "border-royal-blue scale-105 z-10 shadow-lg" : "border-gray-200"
                                }`}
                        >
                            {pkg.highlight && (
                                <div className="bg-royal-blue text-white text-center text-xs font-bold py-1.5 uppercase tracking-wide">
                                    {pkg.tag}
                                </div>
                            )}

                            <div className="p-6 md:p-8 flex-grow">
                                <div className="mb-2">
                                    <h3 className="text-lg font-bold text-navy">{pkg.name}</h3>
                                    <p className="text-sm text-navy/60">{pkg.subtitle}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-royal-blue">{pkg.price}</span>
                                        <span className="text-sm font-bold text-royal-blue">AED</span>
                                    </div>
                                    <span className="text-xs text-navy/50">{pkg.period}</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-navy/70">
                                            <Check className="w-4 h-4 text-sky-blue flex-shrink-0 mt-0.5" />
                                            <span className={feature.startsWith("Everything in") ? "font-semibold text-royal-blue" : ""}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 pt-0 mt-auto">
                                <Link
                                    href="/contact"
                                    className={`block w-full text-center py-3 rounded-[4px] font-semibold transition-colors ${pkg.highlight
                                            ? "bg-royal-blue hover:bg-sky-blue text-white"
                                            : "bg-navy text-white hover:bg-royal-blue"
                                        }`}
                                >
                                    {pkg.cta}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-navy/50 italic">* Terms and Conditions applied. Prices may vary based on business complexity.</p>
                </div>
            </div>
        </section>
    );
}
