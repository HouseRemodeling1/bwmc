"use client";

import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
    const scrollToForm = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="py-24 bg-gradient-to-br from-[#1a4d6f] to-[#2d6a8f] text-white text-center">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                    Ready for UAE Corporate Tax Compliance?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                    Schedule your free consultation today. No obligation, just expert advice.
                </p>
                <button
                    onClick={scrollToForm}
                    className="px-10 py-5 bg-[#f4a460] hover:bg-[#e08945] text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto text-lg"
                >
                    Schedule Free Consultation
                    <ArrowRight className="w-6 h-6" />
                </button>
                <p className="mt-6 text-sm text-white/60">
                    Limited slots available for current tax season.
                </p>
            </div>
        </section>
    );
}
