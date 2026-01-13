"use client";

import ClientTrust from "@/components/ClientTrust";
import { CheckCircle2 } from "lucide-react";

export default function AdvantageSection() {
    return (
        <section className="bg-navy py-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Your Trusted Partner in <br />
                            <span className="text-gold">Financial Excellence.</span>
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Our team comprises seasoned Chartered Accountants and former CFOs with extensive experience across diverse industries in the UAE. We bring a wealth of practical knowledge and strategic insight to your business, acting not just as consultants, but as integral partners in your success.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-gold" />
                                Chartered Accountants
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-gold" />
                                Growth Strategists
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-gold" />
                                Industry Veterans
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Visual to fill blank space */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden lg:block">
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent z-10" />
                    {/* Fallback image if user hasn't provided one - using a professional finance meeting image */}
                    <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                        alt="BWMC Financial Experts"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-6 left-6 z-20">
                        <p className="text-white font-bold text-xl">Expert Guidance</p>
                        <p className="text-gray-300 text-sm">Navigating complex regulations with ease.</p>
                    </div>
                </div>
            </div>
        </div>

            {/* Reuse Client Trust for Testimonials & Badges - it has white background so wrap it or modify */ }
    {/* Since ClientTrust has its own section wrapper and white bg, we should probably just place it below this section or embed parts.
                Given the requirement for credentials and testimonials, ClientTrust is perfect but it has a white BG.
                Let's render it below as a separate strip or customize it. 
                For now, I'll let it be its own section below the dark Advantage section for contrast.
            */}
        </section >
    );
}
