"use client";

import Hero from "@/components/uae-setup/Hero";
import StatsStrip from "@/components/uae-setup/StatsStrip";
import WhoIsThisFor from "@/components/uae-setup/WhoIsThisFor";
import Pricing from "@/components/uae-setup/Pricing";
import FreeZoneMainland from "@/components/uae-setup/FreeZoneMainland";
import ProcessSteps from "@/components/uae-setup/ProcessSteps";
import LocalCompliance from "@/components/uae-setup/LocalCompliance";
import WhyBWMC from "@/components/uae-setup/WhyBWMC";
import FounderMessage from "@/components/global-setup/FounderMessage";
import TestimonialsAndTrust from "@/components/uae-setup/TestimonialsAndTrust";
import UAESetupForm from "@/components/uae-setup/UAESetupForm";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/global-setup/FloatingWhatsApp";
import Script from "next/script";

export default function UAESetupPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            <main>
                <Hero />
                <StatsStrip />
                <WhoIsThisFor />
                <Pricing />
                <FreeZoneMainland />
                <ProcessSteps />
                <LocalCompliance />
                <WhyBWMC />
                <FounderMessage />
                <TestimonialsAndTrust />
                <UAESetupForm />
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
