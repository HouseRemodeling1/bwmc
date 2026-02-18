import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "E-Commerce License Dubai | Start Online Business from AED 3,999",
    description: "Get your E-Commerce License in Dubai within 24 hours. 100% ownership, 0% tax, and bank account assistance. Packages start from AED 3,999. Free consultation.",
    alternates: {
        canonical: "https://bridgewater.ae/ecommerce-license",
    },
};

export default function EcommerceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
