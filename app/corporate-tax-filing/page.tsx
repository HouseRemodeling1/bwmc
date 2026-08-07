import Hero from "@/components/corporate-tax-filing/Hero";
import StatsStrip from "@/components/corporate-tax-filing/StatsStrip";
import BenefitsGrid from "@/components/corporate-tax-filing/BenefitsGrid";
import ProcessSteps from "@/components/corporate-tax-filing/ProcessSteps";
import ExpertCTA from "@/components/corporate-tax-filing/ExpertCTA";
import FounderMessage from "@/components/corporate-tax-filing/FounderMessage";
import GuaranteesGrid from "@/components/corporate-tax-filing/GuaranteesGrid";
import ClientTrust from "@/components/ClientTrust";
import TaxFilingForm from "@/components/corporate-tax-filing/InternationalForm";
import FloatingWhatsApp from "@/components/corporate-tax-filing/FloatingWhatsApp";
import Header from "@/components/Header";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Tax Advisory Services in UAE | BWMC",
  description:
    "Expert Corporate Tax advisory in UAE — registration, Free Zone exemptions & Transfer Pricing. Book a consultation with our tax specialists today.",
  alternates: {
    canonical: "https://www.bwmc.ae/corporate-tax-filing",
  },
};

export default function CorporateTaxFilingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <BenefitsGrid />
        <FounderMessage />
        <ExpertCTA />
        <ProcessSteps />
        <GuaranteesGrid />
        <ClientTrust />
        <TaxFilingForm />
      </main>
      <FloatingWhatsApp />
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
