import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ServiceBentoGrid from "@/components/ServiceBentoGrid";
import PricingPackages from "@/components/PricingPackages";
import ClientTrust from "@/components/ClientTrust";
import TrustedBy from "@/components/TrustedBy";
import OurExpertise from "@/components/OurExpertise";
import { homeMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/schema";

export const metadata = homeMetadata;

export default function Home() {
  // Generate FAQ Schema for homepage
  const faqSchema = generateFAQSchema([
    {
      question: "What services does BWMC provide in the UAE?",
      answer: "BWMC provides comprehensive business services including company formation, trade license processing, accounting and bookkeeping, statutory audits, VAT registration and filing, corporate tax compliance, and trademark registration in the UAE."
    },
    {
      question: "How much does it cost to set up a business in Dubai?",
      answer: "Business setup costs in Dubai vary based on jurisdiction and activity. Mainland licenses typically start from AED 15,000-25,000, while Free Zone packages start from AED 10,000-15,000. Use our calculator for a detailed estimate."
    },
    {
      question: "Do I need to register for VAT in the UAE?",
      answer: "VAT registration is mandatory if your taxable supplies exceed AED 375,000 annually. Voluntary registration is available for businesses with supplies over AED 187,500. BWMC can help you determine your VAT obligations."
    },
    {
      question: "What is the corporate tax rate in the UAE?",
      answer: "The UAE corporate tax rate is 0% on taxable income up to AED 375,000 and 9% on income exceeding this threshold. Qualifying Free Zone businesses may benefit from 0% tax on qualifying income."
    },
    {
      question: "How long does business setup take in Dubai?",
      answer: "Business setup in Dubai typically takes 5-10 working days for Free Zones and 10-15 days for Mainland, depending on the activity and documentation. BWMC expedites the process with expert guidance."
    }
  ]);

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen">
        <Hero />
        <TrustedBy />
        <WhoWeAre />
        <ServiceBentoGrid />
        <PricingPackages />
        <OurExpertise />
        <ClientTrust />
      </main>
    </>
  );
}


