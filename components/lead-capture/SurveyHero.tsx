'use client';

import { ArrowDown } from 'lucide-react';

export default function SurveyHero() {
    const scrollToWizard = () => {
        document.getElementById('wizard-container')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="bg-navy text-white pt-32 pb-24 md:pt-48 md:pb-32 relative overflow-hidden">
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-royal-blue rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                    Start Your UAE Company <br className="hidden md:block" />
                    <span className="text-[#D4AF37]">the Right Way</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                    Mainland, Free Zone, and Holding Structures — with full compliance, visa, and banking support.
                </p>

                <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                    <span className="text-sm font-medium text-gray-200">
                        Advisors to entrepreneurs, SMEs, and investors entering the UAE market
                    </span>
                </div>

                <div className="mt-12">
                    <button
                        onClick={scrollToWizard}
                        className="bg-[#D4AF37] hover:bg-[#b5952f] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transform transition hover:scale-105"
                    >
                        Get Your Setup Plan
                    </button>
                </div>
            </div>
        </section>
    );
}
