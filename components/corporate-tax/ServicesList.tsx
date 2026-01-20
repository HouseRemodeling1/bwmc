"use client";

import { Check } from "lucide-react";

const services = [
    "Federal corporate tax return (Form 1120)",
    "State and local tax compliance",
    "Multi-state tax filing and nexus analysis",
    "Quarterly estimated tax planning",
    "Tax credits and incentives identification",
    "Research & Development (R&D) tax credits",
    "Section 179 and bonus depreciation optimization",
    "International tax compliance",
    "Sales and use tax consulting",
    "Tax provision and ASC 740 support"
];

export default function ServicesList() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1a4d6f] mb-6">
                            Comprehensive Corporate <br />Tax Services
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            From routine filings to complex multi-state strategies, our team handles every aspect of your corporate tax lifecycle with precision and care.
                        </p>
                        <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100">
                            <h4 className="font-bold text-[#1a4d6f] mb-4">Coverage Includes:</h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {services.map((service, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-green-600" />
                                        </div>
                                        <span className="text-gray-700 text-sm font-medium">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop"
                            alt="Corporate Tax Analysis"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a4d6f]/80 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <p className="font-bold text-2xl mb-2">Strategic Planning</p>
                                <p className="opacity-90">Beyond just filing, we help you plan for future growth.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
