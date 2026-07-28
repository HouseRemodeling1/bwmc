import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/cfo-services/Hero";
import ProblemSolution from "@/components/cfo-services/ProblemSolution";
import ServicesList from "@/components/cfo-services/ServicesList";
import AdvantageSection from "@/components/cfo-services/AdvantageSection";
import ClientTrust from "@/components/ClientTrust";
import FinalCTA from "@/components/cfo-services/FinalCTA";
export const metadata: Metadata = {
    title: "Fractional CFO Services Dubai | BWMC",
    description: "Expert fractional CFO services in UAE. Strategic financial leadership, cash flow optimization, and compliance management for SMEs and startups.",
    alternates: {
        canonical: "https://www.bwmc.ae/cfo-services",
    },
};
export default function CFOServicesPage() {
    return (
        <div className="min-h-screen font-sans">
            <Header />
            <main>
                <Hero />
                <ProblemSolution />
                <ServicesList />
                <AdvantageSection />
                {/* Reusing existing Client Trust & Credentials component */}
                <ClientTrust />
                <FinalCTA />
            </main>
        </div>
    );
}
