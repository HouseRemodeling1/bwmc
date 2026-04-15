import { generateServiceSchema, generateFAQSchema } from "@/lib/schema";

interface ServiceSEOProps {
    content: {
        title: string;
        subtitle: string;
        description: string;
        metaDescription?: string;
        faq: { q: string; a: string }[];
        category: string;
        detailedItems?: any[];
    };
    slug: string;
}

export default function ServiceSEO({ content, slug }: ServiceSEOProps) {
    const url = `https://bwmc.ae/services/${slug}`;

    // Generate Service Schema
    const serviceSchema = generateServiceSchema({
        name: content.title,
        description: content.metaDescription || content.description,
        provider: "BWMC",
        areaServed: "United Arab Emirates",
        serviceType: content.category,
        url: url,
    });

    // Generate FAQ Schema
    const faqSchema = generateFAQSchema(
        content.faq.map((item) => ({
            question: item.q,
            answer: item.a,
        }))
    );

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
