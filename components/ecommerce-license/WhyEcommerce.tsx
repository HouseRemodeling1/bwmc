"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, TrendingUp, Truck, Wifi, ShoppingCart } from "lucide-react";

const benefits = [
    {
        icon: <Globe className="w-8 h-8 text-royal-blue" />,
        title: "100% Foreign Ownership",
        description: "Retain full control of your business with zero requirement for a local sponsor."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-royal-blue" />,
        title: "0% Personal Income Tax",
        description: "Maximize your profits in a tax-efficient environment designed for growth."
    },
    {
        icon: <Wifi className="w-8 h-8 text-royal-blue" />,
        title: "High Internet Penetration",
        description: "Tap into one of the most digitally connected populations in the world."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-royal-blue" />,
        title: "Growing Digital Economy",
        description: "Join a booming e-commerce market projected to reach billions in value."
    },
    {
        icon: <ShoppingCart className="w-8 h-8 text-royal-blue" />,
        title: "Strategic Global Hub",
        description: "Access markets across the Middle East, Europe, and Asia with ease."
    },
    {
        icon: <Truck className="w-8 h-8 text-royal-blue" />,
        title: "World-Class Logistics",
        description: "Benefit from advanced infrastructure and seamless supply chain solutions."
    }
];

export default function WhyEcommerce() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-6">
                        Why Start an E-Commerce Business in UAE?
                    </h2>
                    <p className="text-lg text-gray-600">
                        The UAE offers an unmatched environment for online businesses, combining tax benefits, strategic location, and a digital-first economy.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">{benefit.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
