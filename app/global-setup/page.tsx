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
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Business Setup | BWMC",
  description:
    "Expand your business globally with BWMC's international setup services. Expert guidance for company formation, compliance, and market entry.",
  alternates: {
    canonical: "https://www.bwmc.ae/global-setup",
  },
};

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
      {/* Google Ads Conversion Tracking */}
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){window.dataLayer.push(arguments);}
          
          window.gtag_report_conversion = function(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            window.gtag('event', 'conversion', {
                'send_to': 'AW-17792357372/bT_dCNew9vMbEPynh6RC',
                'event_callback': callback
            });
            return false;
          }
        `}
      </Script>
    </div>
  );
}
