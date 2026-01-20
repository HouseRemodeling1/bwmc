import type { Metadata } from "next";
import Hero from "@/components/corporate-tax/Hero";
import SocialProof from "@/components/corporate-tax/SocialProof";
import BenefitGrid from "@/components/corporate-tax/BenefitGrid";
import ServicesList from "@/components/corporate-tax/ServicesList";
import ProcessTimeline from "@/components/corporate-tax/ProcessTimeline";
import TrustSection from "@/components/corporate-tax/TrustSection";
import FAQ from "@/components/corporate-tax/FAQ";
import FinalCTA from "@/components/corporate-tax/FinalCTA";

export const metadata: Metadata = {
    title: "Corporate Tax Filing Services | Bridgewater Management | Dubai & UAE",
    description: "Expert corporate tax filing services to maximize deductions and ensure compliance. Trusted by 500+ corporations. Schedule your free consultation.",
    keywords: ["corporate tax filing", "business tax services", "corporate tax preparation", "UAE corporate tax", "Dubai tax consultant"],
};

export default function CorporateTaxPage() {
    return (
        <main className="min-h-screen font-sans bg-white">
            <Hero />
            <SocialProof />
            <BenefitGrid />
            <ServicesList />
            <ProcessTimeline />
            <TrustSection />
            <FAQ />
            <FinalCTA />
        </main>
    );
}
