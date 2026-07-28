// app/startups/page.tsx
import type { Metadata } from "next"
import StartupsClient from "./StartupsClient"

export const metadata: Metadata = {
  title: "Discover the Next UAE Unicorns | BWMC",
  description:
    "Connect with high-potential startups across the UAE and GCC. Expert-vetted deals, transparent metrics, and direct founder access.",
  alternates: {
    canonical: "https://www.bwmc.ae/startups",
  },
}

export default function StartupsPage() {
  return <StartupsClient />
}
