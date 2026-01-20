"use client";

export default function SocialProof() {
    return (
        <section className="bg-white border-b border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 opacity-80">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-[#1a4d6f]">500+</span>
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Companies Served</span>
                    </div>
                    <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-[#1a4d6f]">$50M+</span>
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">In Tax Savings</span>
                    </div>
                    <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-[#1a4d6f]">98%</span>
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Client Retention</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
