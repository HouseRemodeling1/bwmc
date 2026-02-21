"use client";

import { motion } from "framer-motion";
import { Clock, Tag, Shield, UserCheck, MessageCircle, Sliders } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: <Clock className="w-6 h-6 text-royal-blue" />,
        title: "License in 24 Hours",
        description: "Fastest turnaround time in the market."
    },
    {
        icon: <Tag className="w-6 h-6 text-royal-blue" />,
        title: "Starting from AED 3,999",
        description: "Lowest price guarantee for e-commerce setup."
    },
    {
        icon: <Shield className="w-6 h-6 text-royal-blue" />,
        title: "No Hidden Charges",
        description: "100% transparent pricing structure."
    },
    {
        icon: <UserCheck className="w-6 h-6 text-royal-blue" />,
        title: "Dedicated Advisor",
        description: "Personal support throughout the process."
    },
    {
        icon: (
            <div className="relative w-6 h-6">
                <Image
                    src="/images/whatsapp-icon.png"
                    alt="WhatsApp"
                    fill
                    className="object-contain"
                />
            </div>
        ),
        title: "Fast WhatsApp Support",
        description: "Get answers instantly, anytime."
    },
    {
        icon: <Sliders className="w-6 h-6 text-royal-blue" />,
        title: "Ongoing Support",
        description: "We help you grow even after setup."
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">Why Choose Us?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We combine speed, affordability, and expertise to give you the best start for your online business.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
