"use client";

import { Calculator, Clock, Shield, Building2, Headset, MonitorCheck } from "lucide-react";

const benefits = [
    {
        icon: Calculator,
        title: "Free Zone Assessment",
        description: "Expert analysis of your Free Zone status to determine eligibility for the 0% Corporate Tax rate for Qualifying Free Zone Persons."
    },
    {
        icon: Clock,
        title: "FTA Registration",
        description: "Seamless Tax Registration Number (TRN) generation and registration with the Federal Tax Authority for all business types."
    },
    {
        icon: Shield,
        title: "Compliance & Safety",
        description: "Ensure full compliance with UAE Tax Laws to avoid hefty penalties for non-registration or late filing."
    },
    {
        icon: Building2,
        title: "Small Business Relief",
        description: "Guidance on claiming Small Business Relief if your revenue is below AED 3 Million, exempting you from tax payments."
    },
    {
        icon: Headset,
        title: "Financial Restructuring",
        description: "Strategic advice on restructuring your financial year or entity setup to align efficiently with the new tax regime."
    },
    {
        icon: MonitorCheck,
        title: "Records & Accounting",
        description: "Ensure your financial statements meet international accounting standards (IFRS) as required by the FTA."
    }
];

export default function BenefitGrid() {
    return (
        <section className="py-24 bg-[#f8f9fa]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1a4d6f] mb-4">
                        Why Choose BWMC for UAE Corporate Tax?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We simplify the 9% tax regime, ensuring your business maximizes relief options while remaining fully compliant.
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
