import type { Metadata } from 'next';
import LeadCaptureWizard from '@/components/lead-capture/LeadCaptureWizard';
import SurveyHero from '@/components/lead-capture/SurveyHero';
import { ShieldCheck, TrendingUp, Globe, Building2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'UAE Company Setup Plan | BWMC',
    description: 'Get your personalized UAE company setup plan in under 45 seconds.',
};

export default function SurveyPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <SurveyHero />

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
