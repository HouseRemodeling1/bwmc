"use client";

import { Star } from "lucide-react";

export default function TrustSection() {
    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Credentials */}
                <div className="flex flex-wrap justify-center items-center gap-12 mb-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-2xl font-bold text-gray-400">AICPA Member</div>
                    <div className="text-2xl font-bold text-gray-400">Certified CPA</div>
                    <div className="text-2xl font-bold text-gray-400">IRS Enrolled Agent</div>
                    <div className="text-2xl font-bold text-gray-400">BBB Accredited</div>
                </div>

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#1a4d6f]">Trusted by Industry Leaders</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "BWMC transformed our chaotic tax process into a streamlined operation. We saved over $120k in our first year alone.",
                            author: "Sarah Chen",
                            role: "CFO, TechFlow Manufacturing"
                        },
                        {
                            quote: "Their knowledge of multi-state nexus issues is unmatched. We expanded to 12 new states without a single compliance hiccup.",
                            author: "Michael Ross",
                            role: "Director of Finance, Global Retail Inc"
                        },
                        {
                            quote: "Professional, responsive, and strategic. They don't just file taxes; they help us plan for the future.",
                            author: "David Miller",
                            role: "Owner, Miller Logistics"
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
