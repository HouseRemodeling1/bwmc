"use client";

import Hero from "@/components/global-setup/Hero";
import StatsStrip from "@/components/global-setup/StatsStrip";
import BenefitsGrid from "@/components/global-setup/BenefitsGrid";
import ProcessSteps from "@/components/global-setup/ProcessSteps";
import ClientTrust from "@/components/ClientTrust";
import InternationalForm from "@/components/global-setup/InternationalForm";
import Header from "@/components/Header";


export default function GlobalSetupPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* We reuse the main header for credibility, or we could pass a 'minimal' prop if supported */}
            <Header />

            <main>
                <Hero />

                {/* Stats Strip */}
                <StatsStrip />

                {/* Benefits Section */}
                <BenefitsGrid />

                {/* Process Section */}
                <ProcessSteps />

                {/* Trust & Testimonials */}
                <ClientTrust />

                {/* Lead Capture Form */}
                <InternationalForm />
            </main>

        </div>
    );
}
