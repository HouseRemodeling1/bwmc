"use client";

import Hero from "@/components/global-setup/Hero";
import BenefitsGrid from "@/components/global-setup/BenefitsGrid";
import ProcessSteps from "@/components/global-setup/ProcessSteps";
import TrustSection from "@/components/global-setup/TrustSection";
import InternationalForm from "@/components/global-setup/InternationalForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GlobalSetupPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* We reuse the main header for credibility, or we could pass a 'minimal' prop if supported */}
            <Header />

            <main>
                <Hero />

                {/* Benefits Section */}
                <BenefitsGrid />

                {/* Process Section */}
                <ProcessSteps />

                {/* Trust & Testimonials */}
                <TrustSection />

                {/* Lead Capture Form */}
                <InternationalForm />
            </main>

            <Footer />
        </div>
    );
}
