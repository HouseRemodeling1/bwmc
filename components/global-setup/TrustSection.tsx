"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const stats = [
    { value: "2500+", label: "Businesses Setup" },
    { value: "100%", label: "Application Success Rate" },
    { value: "150+", label: "Countries Served" },
    { value: "12", label: "Years Experience" }
];

const testimonials = [
    {
        name: "James Wilson",
        role: "CEO, TechFlow UK",
        location: "United Kingdom",
        content: "I didn't have to leave London once. BWMC handled everything remotely – from the license to the bank account opening. Truly seamless process.",
        image: "/images/testimonials/james.jpg" // Placeholder path
    },
    {
        name: "Sarah Chen",
        role: "Founder, Chen Logistics",
        location: "Singapore",
        content: "The tax efficiency of the UAE setup has transformed our bottom line. BWMC's advice on the correct structure was invaluable.",
        image: "/images/testimonials/sarah.jpg" // Placeholder path
    },
    {
        name: "Michael Müller",
        role: "Director, Müller Design",
        location: "Germany",
        content: "Professional, fast, and transparent. They explained the differences between Mainland and Free Zone clearly so I could make the right choice.",
        image: "/images/testimonials/michael.jpg" // Placeholder path
    }
];

export default function TrustSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Statistics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-b border-gray-200 pb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <p className="text-4xl font-bold text-royal-blue mb-2">{stat.value}</p>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-navy mb-4">Trusted by Global Entrepreneurs</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of international business owners who have successfully expanded to the UAE with BWMC.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative"
                        >
                            <Quote className="w-10 h-10 text-gold/20 absolute top-6 right-6" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                    {/* Placeholder for avatar if no image */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-lg">
                                        {testimonial.name[0]}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy">{testimonial.name}</h4>
                                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                                    <p className="text-xs text-royal-blue font-semibold">{testimonial.location}</p>
                                </div>
                            </div>

                            <p className="text-gray-600 italic leading-relaxed">
                                "{testimonial.content}"
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Accreditation Logos (Placeholder) */}
                <div className="mt-20 pt-10 border-t border-gray-200">
                    <p className="text-center text-sm font-semibold text-gray-400 mb-8 uppercase tracking-widest">Officially Recognized By</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Text placeholders for logos as we don't have the assets yet */}
                        <span className="text-xl font-bold text-gray-400">Dubai Economy (DED)</span>
                        <span className="text-xl font-bold text-gray-400">DMCC</span>
                        <span className="text-xl font-bold text-gray-400">IFZA</span>
                        <span className="text-xl font-bold text-gray-400">Meydan Free Zone</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
