import { getServiceContent } from "@/lib/serviceContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import AccountingLayout from "@/components/services/AccountingLayout";
import TaxationLayout from "@/components/services/TaxationLayout";
import OtherLayout from "@/components/services/OtherLayout";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const content = getServiceContent(slug);

    if (!content) return {};

    const url = `https://www.bwmc.ae/services/${slug}`;

    return {
        title: content.metaTitle || `${content.title} | BWMC`,
        description: content.metaDescription || content.subtitle,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: content.metaTitle || content.title,
            description: content.metaDescription || content.subtitle,
            url: url,
            siteName: "BWMC",
            locale: "en_US",
            type: "website",
        },
        keywords: content.keywords || [],
    };
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params;
    const content = getServiceContent(slug);

    if (!content) {
        notFound();
    }

    switch (content.category) {
        case 'accounting':
            return <AccountingLayout content={content} slug={slug} />;
        case 'taxation':
            return <TaxationLayout content={content} slug={slug} />;
        default:
            return <OtherLayout content={content} slug={slug} />;
    }
}
