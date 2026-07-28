import type { Metadata } from "next";
import FinancialHealthClient from "./FinancialHealthClient";
export const metadata: Metadata = {
    title: "Free Financial Health Check | BWMC",
    description:
        "Upload your P&L, bank statement or balance sheet and get an instant AI-powered financial health report in plain English. Free. No signup required.",
    keywords: [
        "financial health check UAE",
        "business financial analysis Dubai",
        "P&L analysis UAE",
        "free financial report dubai",
        "SME financial health UAE",
    ],
    alternates: {
        canonical: "https://www.bwmc.ae/financial-health-check",
    },
    openGraph: {
        title: "Free Financial Health Check — Know Where Your Business Stands",
        description:
            "Upload your financials and get a full AI health report in 30 seconds. No signup. No jargon. Free.",
        url: "https://www.bwmc.ae/financial-health-check",
    },
};
export default function FinancialHealthCheckPage() {
    return <FinancialHealthClient />;
}
