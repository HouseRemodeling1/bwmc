import {
    Lightbulb,
    FileSignature,
    Package,
    ArrowLeftRight,
    FileText,
    CreditCard,
    BookOpen,
    Wine,
    History,
    MapPin,
    Calendar,
    Coins,
    Gavel,
    TrendingUp,
    RefreshCcw,
    Map,
    Plane
} from "lucide-react";

export const vatGuideData = [
    {
        title: "VAT Basics",
        description: "Learn how the Value Added Tax (VAT) works and its impact on businesses in the UAE.",
        icon: Lightbulb,
        slug: "vat-basics",
        content: `
            <p class="lead">The introduction of VAT has significantly changed business accounting operations in the UAE. This guide explains the basics of VAT and its impact on businesses and consumers.</p>

            <h2>Understanding Value Added Tax</h2>
            <p>Tax can be defined as a fee charged by the government on goods, services, income and other transactions in order to finance public services and government expenditure. There are two major tax categories:</p>
            <ul>
                <li><strong>Direct Tax:</strong> Paid directly to the government by the taxpayer.</li>
                <li><strong>Indirect Tax:</strong> Paid to the government by an intermediary, who collects the tax from the taxpayer on behalf of the government.</li>
            </ul>
            <p>VAT is an indirect tax levied on the consumption or use of goods and services. It is charged at each step of the supply process. The end consumers bear the costs of VAT while registered businesses collect and account for VAT, acting as tax collectors on behalf of the government.</p>

            <h2>How does VAT work?</h2>
            <p>Let’s consider the following example to see how the VAT system works:</p>
            <ol>
                <li><strong>Manufacturer to Wholesaler:</strong> A manufacturer sells a TV to a wholesaler for AED 1000. They collect VAT of 5% (AED 50) and pay it to the government. Wholesaler pays AED 1050.</li>
                <li><strong>Wholesaler to Retailer:</strong> The wholesaler sells it for AED 2000. They collect VAT of 5% (AED 100) from the retailer. The wholesaler pays the government AED 50 (AED 100 collected minus AED 50 paid earlier). Retailer pays AED 2100.</li>
                <li><strong>Retailer to Customer:</strong> The retailer sells it for AED 3000. They collect VAT of 5% (AED 150). They pay the government AED 50 (AED 150 collected minus AED 100 paid earlier).</li>
                <li><strong>End Result:</strong> The customer pays AED 3150. The government receives a total of AED 150 (5% of the final price).</li>
            </ol>
            <p>A value added tax is applied at every stage of the sales process, and the registered business receives a refund (or tax credit) on the VAT paid at the previous step. The Federal Tax Authority (FTA) has specified a fixed VAT rate of 5% for the sale of goods and services in the UAE.</p>

            <h2>Why is VAT being introduced?</h2>
            <p>The UAE delivers excellent public services, including healthcare, education, public transportation, and social services. The introduction of a VAT allows the government to diversify their sources of income and continue to ensure a good standard of living for UAE residents.</p>

            <h2>Registering for VAT</h2>
            <p>Registration may be mandatory or voluntary, depending on the business revenues generated.</p>
            <ul>
                <li><strong>Mandatory Registration:</strong> A business must register if the total value of their taxable sales and imports exceeds AED 375,000 for the previous 12 months.</li>
                <li><strong>Voluntary Registration:</strong> A business can voluntarily register if the total value of their taxable sales and imports exceeds AED 187,500.</li>
            </ul>

            <h2>VAT Rates in UAE</h2>
            <p>The standard VAT rate is <strong>5%</strong> for most goods and services. However, there are exceptions:</p>
            <ul>
                <li><strong>0% VAT (Zero-rated):</strong> International transportation, exports outside GCC, newly constructed residential properties (first 3 years), certain education and healthcare services.</li>
                <li><strong>VAT Exempt:</strong> Residential properties (resale/rent), public transport, undeveloped land, life insurance, and certain financial services.</li>
            </ul>
        `
    },
    {
        title: "VAT Registration",
        description: "Learn about the eligibility criteria, threshold limits, and processes involved in VAT Registration.",
        icon: FileSignature,
        slug: "vat-registration"
    },
    {
        title: "Supply under VAT",
        description: "Understand the different types of supplies (Standard, Zero-rated, Exempt) under the VAT regime.",
        icon: Package,
        slug: "supply-under-vat"
    },
    {
        title: "Reverse Charge Mechanism",
        description: "Learn what the reverse charge mechanism is, why it's important, and how it applies to imports.",
        icon: ArrowLeftRight,
        slug: "reverse-charge"
    },
    {
        title: "VAT Returns",
        description: "A comprehensive guide on how and when to file your VAT returns to stay compliant.",
        icon: FileText,
        slug: "vat-returns"
    },
    {
        title: "VAT Payments",
        description: "Learn how to make VAT payments to the Federal Tax Authority (FTA) correctly and on time.",
        icon: CreditCard,
        slug: "vat-payments"
    },
    {
        title: "VAT Records & Books",
        description: "Learn about the mandatory accounting records and books you must maintain under VAT laws.",
        icon: BookOpen,
        slug: "vat-records"
    },
    {
        title: "Excise Tax",
        description: "Understand the specific tax levied on goods harmful to health and how it differs from VAT.",
        icon: Wine,
        slug: "excise-tax"
    },
    {
        title: "Excise Tax Registration",
        description: "Learn how you can register for Excise Tax and determine your tax liability.",
        icon: FileSignature,
        slug: "excise-tax-registration"
    },
    {
        title: "Transitional Rules",
        description: "Learn how to handle contracts and supplies that span across the implementation date of VAT.",
        icon: History,
        slug: "transitional-rules"
    },
    {
        title: "Place of Supply",
        description: "Learn how the 'Place of Supply' rules determine whether a transaction is subject to UAE VAT.",
        icon: MapPin,
        slug: "place-of-supply"
    },
    {
        title: "Date of Supply",
        description: "Understand the tax point or 'Date of Supply' to determine the correct VAT period for reporting.",
        icon: Calendar,
        slug: "date-of-supply"
    },
    {
        title: "Value of Supply",
        description: "Learn how to calculate the taxable value of a supply, including discounts and profit margins.",
        icon: Coins,
        slug: "value-of-supply"
    },
    {
        title: "VAT Penalties",
        description: "An overview of the administrative penalties and fines for non-compliance with VAT regulations.",
        icon: Gavel,
        slug: "vat-penalties"
    },
    {
        title: "Input Credit & Refunds",
        description: "Learn about recovering VAT incurred on business expenses and the conditions for Input Tax Credit.",
        icon: TrendingUp,
        slug: "input-credit"
    },
    {
        title: "VAT Refunds",
        description: "A guide on how to claim refunds from the FTA if your input tax exceeds your output tax.",
        icon: RefreshCcw,
        slug: "vat-refunds"
    },
    {
        title: "Designated Zones",
        description: "Learn about the special VAT treatment for Designated Zones (Free Zones) in the UAE.",
        icon: Map,
        slug: "designated-zones"
    },
    {
        title: "Import Declaration",
        description: "Learn how to declare VAT on imports and link your customs registration with your TRN.",
        icon: Plane,
        slug: "import-declaration"
    }
];
