"use client";

import Hero from "@/components/global-setup/Hero";
import StatsStrip from "@/components/global-setup/StatsStrip";
import BenefitsGrid from "@/components/global-setup/BenefitsGrid";
import ProcessSteps from "@/components/global-setup/ProcessSteps";
import ExpertCTA from "@/components/global-setup/ExpertCTA";
import FounderMessage from "@/components/global-setup/FounderMessage";
import GuaranteesGrid from "@/components/global-setup/GuaranteesGrid";
import ClientTrust from "@/components/ClientTrust";
import InternationalForm from "@/components/global-setup/InternationalForm";
import FloatingWhatsApp from "@/components/global-setup/FloatingWhatsApp";
import Header from "@/components/Header";
import Script from "next/script";


export default function GlobalSetupPage() {
  return (
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

        {/* Founder Message */}
        <FounderMessage />

        {/* Expert CTA */}
        <ExpertCTA />

        {/* Process Section */}
        <ProcessSteps />

        {/* Guarantees Grid */}
        <GuaranteesGrid />

        {/* Trust & Testimonials */}
        <ClientTrust />

        {/* Lead Capture Form */}
        <InternationalForm />
      </main>

      <FloatingWhatsApp />

    </div>
  );
}
