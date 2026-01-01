import { getServiceContent } from "@/lib/serviceContent";
import { notFound } from "next/navigation";
import AccountingLayout from "@/components/services/AccountingLayout";
import TaxationLayout from "@/components/services/TaxationLayout";
import OtherLayout from "@/components/services/OtherLayout";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
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
