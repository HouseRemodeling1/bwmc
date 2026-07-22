import type { Metadata } from "next";
import { Montserrat, Inter, Merriweather, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
});

const SITE_URL = "https://www.bwmc.ae";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BWMC | Business Setup, Accounting & Tax Services in UAE",
    template: "%s | BWMC",
  },
  description:
    "Expert business setup, accounting, auditing, and tax compliance services in Dubai & UAE. Your strategic partner for financial clarity and growth.",
  keywords: [
    "UAE business setup",
    "Dubai accounting services",
    "VAT UAE",
    "Corporate tax UAE",
    "Business consultancy Dubai",
    "Accounting Dubai",
    "Auditing services UAE",
    "Tax advisory Dubai",
    "Company formation UAE",
    "Free zone setup Dubai",
  ],
  authors: [{ name: "BWMC Team" }],
  creator: "BWMC",
  publisher: "BWMC",

  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BWMC",
    title: "BWMC | Business Setup, Accounting & Tax Services in UAE",
    description:
      "Expert business setup, accounting, auditing, and tax compliance services in Dubai & UAE.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "BWMC - Business Management Consultancy UAE",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "BWMC | Business Setup, Accounting & Tax Services in UAE",
    description:
      "Expert business setup, accounting, auditing, and tax compliance services in Dubai & UAE.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@bwmc",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your actual codes when available)
  verification: {
    google: "JS0X-aIC8ykQydhj0i2HNvl9pBT2rWTLiHL2GD1bPCE",
    // yandex: "your-yandex-verification-code",
  },
};

import Script from "next/script";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate Organization Schema
  const organizationSchema = generateOrganizationSchema({
    name: "Bridgewater Management Consultancies",
    alternateName: "BWMC",
    description:
      "Strategic Partner for Financial Clarity & Compliance in the UAE. Business Setup, Accounting, Auditing, and Tax Services.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/bwmc-logo-new.png`,
    telephone: "+971-XX-XXX-XXXX", // TODO: Add actual phone number
    email: "info@bwmc.ae",
    address: {
      streetAddress: "Your Street Address", // TODO: Add actual address
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      latitude: "25.2048", // TODO: Add actual coordinates
      longitude: "55.2708",
    },
    socialLinks: [
      // TODO: Add actual social media links
      "https://www.linkedin.com/company/bwmc",
      "https://twitter.com/bwmc",
      "https://www.facebook.com/bwmc",
    ],
  });

  // Generate WebSite Schema
  const websiteSchema = generateWebSiteSchema(SITE_URL);

  return (
<html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
  <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5M2P3SL6');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} ${merriweather.variable} antialiased selection:bg-sky-blue selection:text-white`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5M2P3SL6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Header />
        {children}
        <Footer />
        <Script id="zoho-salesiq-init" strategy="afterInteractive">
          {`
            window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}};
          `}
        </Script>
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.com/widget?wc=siq5edf502fe7af711e3753b6a51dc39d9e21840148c09ecebfbfb95adbc5b79a4256a469d8de632f5cc6703bfc35f241f70e3106a1edcc76319169a20719409f6d"
          strategy="afterInteractive"
        />
        <Script
          id="zoho-bookings-embed"
          src="https://bookings.nimbuspop.com/assets/embed.js"
          strategy="afterInteractive"
        />
        <Script id="zoho-bookings-button" strategy="afterInteractive">
          {`
            (function initZohoBookingsButton() {
              if (!window.Bookings || !window.Bookings.buttonModal) {
                window.setTimeout(initZohoBookingsButton, 250);
                return;
              }

              window.Bookings.buttonModal({
                url: "https://mahesh-bwmc.zohobookings.com/portal-embed#/bridgewatermanagementconsultanciescollc",
                text: "Book now",
                color: "#5646A5",
                textColor: "#ffffff",
                position: "bottom-right"
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
