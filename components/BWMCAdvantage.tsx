"use client";

import { motion } from "framer-motion";
import { Shield, Target, Zap, Award } from "lucide-react";

const advantages = [
    {
        icon: Shield,
        title: "Consultancy-First Approach",
        description: "We don't just execute tasks—we provide strategic guidance tailored to your business goals and regulatory requirements."
    },
    {
        icon: Target,
        title: "UAE Regulatory Expertise",
        description: "Deep knowledge of FTA regulations, Corporate Tax Law 2023, and Ministry of Economy compliance standards."
    },
    {
        icon: Zap,
        title: "Rapid Response Team",
        description: "Dedicated account managers ensuring 24-hour response times for urgent compliance matters."
    },
    {
        icon: Award,
        title: "Certified Professionals",
        description: "Team of IFRS-certified auditors, registered tax agents, and licensed business consultants."
    }
];

export default function BWMCAdvantage() {
    return (
        <section className="bg-gradient-to-br from-neutral via-white to-neutral py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-2 bg-sky-blue/10 rounded-full mb-4">
                        <span className="text-royal-blue font-semibold text-sm">THE BWMC DIFFERENCE</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                        Consultancy vs. Agency
                    </h2>
                    <p className="text-xl text-navy/70 max-w-3xl mx-auto">
                        We're not just service providers—we're your strategic partners in navigating the UAE's complex regulatory landscape
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {advantages.map((advantage, index) => {
                        const Icon = advantage.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="bg-white rounded-[4px] p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-sky-blue/30 h-full">
                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-royal-blue to-sky-blue rounded-[4px] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-royal-blue transition-colors duration-300">
                                        {advantage.title}
                                    </h3>
                                    <p className="text-navy/70 leading-relaxed">
                                        {advantage.description}
                                    </p>

                                    {/* Decorative Element */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sky-blue/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 bg-navy rounded-[4px] p-8 md:p-12"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-sky-blue mb-2">500+</div>
                            <div className="text-neutral/80">Clients Served</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-sky-blue mb-2">15+</div>
                            <div className="text-neutral/80">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-sky-blue mb-2">100%</div>
                            <div className="text-neutral/80">FTA Compliant</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-sky-blue mb-2">24/7</div>
                            <div className="text-neutral/80">Support Available</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
