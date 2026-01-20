"use client";

import { Calculator, Clock, Shield, Building2, Headset, MonitorCheck } from "lucide-react";

const benefits = [
    {
        icon: Calculator,
        title: "Maximum Tax Savings",
        description: "Our experts identify every deduction and credit your corporation qualifies for, ensuring you keep more of your hard-earned profits."
    },
    {
        icon: Clock,
        title: "On-Time, Every Time",
        description: "Never worry about deadlines again. We handle all federal, state, and local filing requirements with precision timing."
    },
    {
        icon: Shield,
        title: "Audit Protection",
        description: "Comprehensive audit support and defense. We stand behind our work with full representation if questions arise."
    },
    {
        icon: Building2,
        title: "Industry Expertise",
        description: "Specialized knowledge across manufacturing, technology, healthcare, real estate, and professional services sectors."
    },
    {
        icon: Headset,
        title: "Year-Round Support",
        description: "Tax planning isn't seasonal. Access your dedicated advisor 12 months a year for strategic guidance."
    },
    {
        icon: MonitorCheck,
        title: "Technology-Enabled",
        description: "Secure portal for document sharing, real-time status updates, and seamless communication with your tax team."
    }
];

export default function BenefitGrid() {
    return (
        <section className="py-24 bg-[#f8f9fa]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1a4d6f] mb-4">
                        Why Choose BWMC for Corporate Tax Filing?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We combine deep industry expertise with cutting-edge technology to deliver superior tax outcomes.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
                        >
                            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#1a4d6f] transition-colors duration-300">
                                <benefit.icon className="w-7 h-7 text-[#1a4d6f] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1a4d6f] mb-3">{benefit.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
