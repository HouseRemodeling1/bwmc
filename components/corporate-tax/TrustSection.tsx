"use client";

import { Star } from "lucide-react";

export default function TrustSection() {
    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Credentials */}
                <div className="flex flex-wrap justify-center items-center gap-12 mb-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-2xl font-bold text-gray-400">FTA Registered</div>
                    <div className="text-2xl font-bold text-gray-400">Certified Tax Agents</div>
                    <div className="text-2xl font-bold text-gray-400">UAE VAT Experts</div>
                    <div className="text-2xl font-bold text-gray-400">IFRS Compliant</div>
                </div>

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#1a4d6f]">Trusted by Industry Leaders</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "BWMC demystified the new 9% Corporate Tax for us. Their impact assessment saved us significant potential liability.",
                            author: "Ahmed Al-Mansouri",
                            role: "CEO, Al-Mansouri Trading"
                        },
                        {
                            quote: "Their guidance on Qualifying Free Zone Income was game-changing. We maintained our 0% tax status with full compliance.",
                            author: "Sarah Jenkins",
                            role: "Finance Director, TechGlobal DWC"
                        },
                        {
                            quote: "From VAT to Corporate Tax, BWMC handles it all. Their monthly retainer model gives us complete peace of mind.",
                            author: "David Miller",
                            role: "Owner, Miller Logistics LLC"
                        }
                    ].map((t, idx) => (
                        <div key={idx} className="bg-[#f8f9fa] p-8 rounded-xl relative">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-[#f4a460] fill-[#f4a460]" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-6">"{t.quote}"</p>
                            <div>
                                <p className="font-bold text-[#1a4d6f]">{t.author}</p>
                                <p className="text-sm text-gray-500">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
