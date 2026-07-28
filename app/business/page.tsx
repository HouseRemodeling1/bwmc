// app/business/page.tsx
import type { Metadata } from "next"
import MarketplaceClient from "./MarketplaceClient"

export const metadata: Metadata = {
  title: "Buy and Sell Businesses in the UAE | BWMC",
  description:
    "The UAE's most trusted platform for business acquisition. Connect with verified sellers across all industries.",
  alternates: {
    canonical: "https://www.bwmc.ae/business",
  },
}

export default function MarketplacePage() {
  return <MarketplaceClient />
}
