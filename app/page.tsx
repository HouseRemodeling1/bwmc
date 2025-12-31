import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ServiceBentoGrid from "@/components/ServiceBentoGrid";
import PricingPackages from "@/components/PricingPackages";
import ClientTrust from "@/components/ClientTrust";
import TrustedBy from "@/components/TrustedBy";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustedBy />
      <WhoWeAre />
      <ServiceBentoGrid />
      <PricingPackages />
      <ClientTrust />
    </main>
  );
}

