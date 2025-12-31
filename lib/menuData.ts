import { Calculator, FileText, TrendingUp, Briefcase } from "lucide-react";

export const menuItems = [
    {
        title: "Accounting & Auditing",
        subtitle: "Financial Clarity",
        icon: Calculator,
        items: [
            { name: "Accounting & Bookkeeping", slug: "accounting-bookkeeping" },
            { name: "Auditing & Assurance", slug: "auditing-assurance" },
            { name: "Internal Audit", slug: "internal-audit" },
            { name: "External Audit", slug: "external-audit" },
            { name: "Liquidation Report", slug: "liquidation-report" },
            { name: "Statutory Audit", slug: "statutory-audit" },
            { name: "Due Diligence Audit", slug: "due-diligence-audit" },
            { name: "VAT Accounting Services", slug: "vat-accounting" },
        ]
    },
    {
        title: "Taxation",
        subtitle: "Compliance & Strategy",
        icon: FileText,
        items: [
            { name: "Corporate Tax Advisory", slug: "corporate-tax" },
            { name: "Excise Tax Service", slug: "excise-tax" },
            { name: "Tax Agency Services", slug: "tax-agency" },
            { name: "Tax Audit", slug: "tax-audit" },
            { name: "VAT Consultancy Services", slug: "vat-consultancy" },
            { name: "GoAML Compliance Services", slug: "goaml-compliance" },
            { name: "Manage KYC & Due Diligence", slug: "kyc-due-diligence" },
        ]
    },
    {
        title: "Other Services",
        subtitle: "Business Growth",
        icon: Briefcase,
        items: [
            { name: "Business Setup Services", slug: "business-setup" },
            { name: "Compliance Advisory", slug: "compliance-advisory" },
            { name: "Corporate Finance", slug: "corporate-finance" },
            { name: "Human Resource Services", slug: "hr-services" },
            { name: "Trade Finance Services", slug: "trade-finance" },
            { name: "Trademark Registration", slug: "trademark-registration" },
            { name: "Digital Growth Performance", slug: "digital-growth" },
        ]
    }
];

export const mainNav = [
    { name: "Accounting & Auditing", href: "#", hasDropdown: true },
    { name: "Taxation", href: "#", hasDropdown: true },
    { name: "Other Services", href: "#", hasDropdown: true },
    { name: "Blog", href: "/blog", hasDropdown: false },
    { name: "Contact Us", href: "/contact", hasDropdown: false },
];
