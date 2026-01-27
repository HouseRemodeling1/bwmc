import type { Metadata } from 'next';
import LeadCaptureWizard from '@/components/lead-capture/LeadCaptureWizard';
import { ShieldCheck, TrendingUp, Globe, Building2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'UAE Company Setup Plan | BWMC',
    description: 'Get your personalized UAE company setup plan in under 45 seconds.',
};

export default function SurveyPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <section className="bg-navy text-white pt-12 pb-24 md:pt-20 md:pb-32 relative overflow-hidden">
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

                    <div className="mt-12" id="form-section">
                        <button
                            onClick={() => document.getElementById('wizard-container')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#D4AF37] hover:bg-[#b5952f] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transform transition hover:scale-105"
                        >
                            Get Your Setup Plan
                        </button>
                    </div>
                </div>
            </section>

            {/* Social Proof Strip */}
            <div className="bg-white border-b border-gray-100 shadow-sm relative z-20 -mt-8 mx-4 md:mx-auto max-w-5xl rounded-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <Building2 className="w-8 h-8 text-royal-blue" />
                        <span className="font-semibold text-gray-700 text-sm">Business Setup</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Globe className="w-8 h-8 text-royal-blue" />
                        <span className="font-semibold text-gray-700 text-sm">Visa Assistance</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <TrendingUp className="w-8 h-8 text-royal-blue" />
                        <span className="font-semibold text-gray-700 text-sm">Corporate Banking</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-royal-blue" />
                        <span className="font-semibold text-gray-700 text-sm">Tax & Compliance</span>
                    </div>
                </div>
            </div>

            {/* Wizard Container */}
            <div id="wizard-container" className="container mx-auto px-4 -mt-4 pt-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-navy">Tell us about your business plan</h2>
                    <p className="text-gray-500 mt-2">Takes less than 45 seconds</p>
                </div>

                <LeadCaptureWizard />
            </div>
        </main>
    );
}
