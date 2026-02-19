"use client";

import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/global-setup/FloatingWhatsApp";
import Hero from "@/components/ecommerce-license/Hero";
import StatsStrip from "@/components/ecommerce-license/StatsStrip";
import WhyEcommerce from "@/components/ecommerce-license/WhyEcommerce";
import PackageInclusions from "@/components/ecommerce-license/PackageInclusions";
import UpsellServices from "@/components/ecommerce-license/UpsellServices";
import WhyChooseUs from "@/components/ecommerce-license/WhyChooseUs";
import ProcessSteps from "@/components/ecommerce-license/ProcessSteps";
import Pricing from "@/components/ecommerce-license/Pricing";
import FAQ from "@/components/ecommerce-license/FAQ";
import FinalCTA from "@/components/ecommerce-license/FinalCTA";
import Script from "next/script";

export default function EcommerceLicensePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main>
        <Hero />
        <StatsStrip />
        <WhyEcommerce />
        <PackageInclusions />
        <UpsellServices />
        <WhyChooseUs />
        <ProcessSteps />
        <Pricing />
        <FAQ />
        <FinalCTA />
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
