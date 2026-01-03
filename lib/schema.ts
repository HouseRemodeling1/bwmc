/**
 * JSON-LD Schema Generation Utilities
 * Generates structured data for SEO and AI platform visibility
 */

interface OrganizationSchemaProps {
    name: string;
    alternateName?: string;
    description: string;
    url: string;
    logo: string;
    telephone?: string;
    email?: string;
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode?: string;
        addressCountry: string;
    };
    geo?: {
        latitude: string;
        longitude: string;
    };
    socialLinks?: string[];
}

interface ArticleSchemaProps {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
    authorUrl?: string;
    publisherName: string;
    publisherLogo: string;
    url: string;
    keywords?: string[];
    articleSection?: string;
    wordCount?: number;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface ServiceSchemaProps {
    name: string;
    description: string;
    provider: string;
    areaServed: string;
    serviceType: string;
    url: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

/**
 * Generate Organization Schema (JSON-LD)
 */
export function generateOrganizationSchema(props: OrganizationSchemaProps) {
    const schema: any = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: props.name,
        description: props.description,
        url: props.url,
        logo: props.logo,
        image: props.logo,
    };

    if (props.alternateName) {
        schema.alternateName = props.alternateName;
    }

    if (props.telephone) {
        schema.telephone = props.telephone;
    }

    if (props.email) {
        schema.email = props.email;
    }

    if (props.address) {
        schema.address = {
            "@type": "PostalAddress",
            ...props.address,
        };
    }

    if (props.geo) {
        schema.geo = {
            "@type": "GeoCoordinates",
            latitude: props.geo.latitude,
            longitude: props.geo.longitude,
        };
    }

    if (props.socialLinks && props.socialLinks.length > 0) {
        schema.sameAs = props.socialLinks;
    }

    // Add area served (UAE)
    schema.areaServed = {
        "@type": "Country",
        name: "United Arab Emirates",
    };

    schema.priceRange = "$$";
    schema.openingHours = "Mo-Fr 09:00-18:00";

    return schema;
}

/**
 * Generate Article Schema for blog posts (JSON-LD)
 */
export function generateArticleSchema(props: ArticleSchemaProps) {
    const schema: any = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.headline,
        description: props.description,
        image: props.image,
        datePublished: props.datePublished,
        dateModified: props.dateModified,
        author: {
            "@type": "Organization",
            name: props.authorName,
        },
        publisher: {
            "@type": "Organization",
            name: props.publisherName,
            logo: {
                "@type": "ImageObject",
                url: props.publisherLogo,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": props.url,
        },
        inLanguage: "en-US",
    };

    if (props.authorUrl) {
        schema.author.url = props.authorUrl;
    }

    if (props.keywords && props.keywords.length > 0) {
        schema.keywords = props.keywords;
    }

    if (props.articleSection) {
        schema.articleSection = props.articleSection;
    }

    if (props.wordCount) {
        schema.wordCount = props.wordCount;
    }

    return schema;
}

/**
 * Generate BreadcrumbList Schema (JSON-LD)
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string = "https://bwmc.ae") {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.url}`,
        })),
    };
}

/**
 * Generate Service Schema (JSON-LD)
 */
export function generateServiceSchema(props: ServiceSchemaProps) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: props.name,
        description: props.description,
        provider: {
            "@type": "Organization",
            name: props.provider,
        },
        areaServed: {
            "@type": "Country",
            name: props.areaServed,
        },
        serviceType: props.serviceType,
        url: props.url,
    };
}

/**
 * Generate FAQ Schema (JSON-LD)
 */
export function generateFAQSchema(faqs: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

/**
 * Generate LocalBusiness Schema (JSON-LD)
 */
export function generateLocalBusinessSchema(props: OrganizationSchemaProps) {
    const schema: any = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: props.name,
        description: props.description,
        url: props.url,
        logo: props.logo,
        image: props.logo,
    };

    if (props.telephone) {
        schema.telephone = props.telephone;
    }

    if (props.email) {
        schema.email = props.email;
    }

    if (props.address) {
        schema.address = {
            "@type": "PostalAddress",
            ...props.address,
        };
    }

    if (props.geo) {
        schema.geo = {
            "@type": "GeoCoordinates",
            latitude: props.geo.latitude,
            longitude: props.geo.longitude,
        };
    }

    schema.priceRange = "$$";
    schema.openingHoursSpecification = {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
    };

    return schema;
}

/**
 * Generate WebSite Schema with SearchAction (JSON-LD)
 */
export function generateWebSiteSchema(url: string = "https://bwmc.ae") {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: url,
        name: "BWMC - Bridgewater Management Consultancies",
        description: "Business Setup, Accounting, Auditing, and Tax Services in UAE",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${url}/blog?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}
