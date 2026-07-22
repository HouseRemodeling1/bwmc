/**
 * Metadata Generation Utilities
 * Centralized metadata management for consistent SEO across all pages
 */

import { Metadata } from "next";

interface PageMetadataProps {
    title: string;
    description: string;
    keywords?: string[];
    path?: string;
    image?: string;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
}

const SITE_NAME = "BWMC";
const SITE_URL = "https://www.bwmc.ae";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const TWITTER_HANDLE = "@bwmc";

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(props: PageMetadataProps): Metadata {
    const {
        title,
        description,
        keywords = [],
        path = "",
        image = DEFAULT_IMAGE,
        type = "website",
        publishedTime,
        modifiedTime,
        author,
        section,
    } = props;

    const url = `${SITE_URL}${path}`;
    const fullTitle = title.includes("BWMC") ? title : `${title} | BWMC`;

    const metadata: Metadata = {
        title: fullTitle,
        description,
        keywords: keywords.length > 0 ? keywords : undefined,
        authors: author ? [{ name: author }] : [{ name: "BWMC Team" }],
        creator: "BWMC",
        publisher: "BWMC",

        // Open Graph
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: SITE_NAME,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: "en_US",
            type,
        },

        // Twitter Card
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [image],
            creator: TWITTER_HANDLE,
        },

        // Canonical URL
        alternates: {
            canonical: url,
        },

        // Robots
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };

    // Add article-specific metadata
    if (type === "article" && publishedTime) {
        metadata.openGraph = {
            ...metadata.openGraph,
            type: "article",
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors: author ? [author] : ["BWMC Team"],
            section,
        };
    }

    return metadata;
}

/**
 * Homepage metadata
 */
export const homeMetadata = generateMetadata({
    title: "BWMC | Business Setup, Accounting & Tax Services in UAE",
    description:
        "Expert business setup, accounting, auditing, and tax compliance services in Dubai & UAE. Your strategic partner for financial clarity and growth.",
    keywords: [
        "UAE business setup",
        "Dubai accounting services",
        "VAT UAE",
        "Corporate tax UAE",
        "Business consultancy Dubai",
        "Accounting Dubai",
        "Auditing services UAE",
        "Tax advisory Dubai",
    ],
    path: "/",
});

/**
 * Services page metadata
 */
export const servicesMetadata = generateMetadata({
    title: "Our Services | Business Setup, Accounting, Audit & Tax | BWMC",
    description:
        "Comprehensive business services in UAE: Company formation, accounting, statutory audits, VAT, corporate tax, and trademark registration.",
    keywords: [
        "business services Dubai",
        "company formation UAE",
        "accounting services",
        "audit services UAE",
        "VAT services",
        "corporate tax UAE",
    ],
    path: "/services",
});

/**
 * Blog listing page metadata
 */
export const blogMetadata = generateMetadata({
    title: "Business Insights & UAE Tax Guides | BWMC Blog",
    description:
        "Expert guides on UAE business setup, VAT compliance, corporate tax, accounting, and legal requirements. Stay informed with BWMC insights.",
    keywords: [
        "UAE business guide",
        "tax guide UAE",
        "business tips Dubai",
        "compliance UAE",
        "VAT guide",
        "corporate tax guide",
    ],
    path: "/blog",
});

/**
 * About page metadata
 */
export const aboutMetadata = generateMetadata({
    title: "About BWMC | Leading Business Consultancy in UAE",
    description:
        "Trusted business consultancy in UAE. Specializing in financial compliance, tax advisory, and strategic business solutions.",
    keywords: [
        "about BWMC",
        "business consultancy UAE",
        "financial advisory Dubai",
        "tax consultants UAE",
    ],
    path: "/about",
});

/**
 * Contact page metadata
 */
export const contactMetadata = generateMetadata({
    title: "Contact BWMC | Get Expert Business Consultation in UAE",
    description:
        "Schedule a consultation with BWMC's expert team. Dubai-based business setup and financial advisory services. Call us today!",
    keywords: [
        "contact BWMC",
        "business consultation Dubai",
        "UAE business advisors",
        "accounting consultation",
    ],
    path: "/contact",
});

/**
 * Calculator page metadata
 */
export const calculatorMetadata = generateMetadata({
    title: "Business Setup Cost Calculator | BWMC UAE",
    description:
        "Calculate your UAE business setup costs instantly. Get accurate estimates for mainland, free zone, and offshore company formation.",
    keywords: [
        "business setup cost UAE",
        "company formation calculator",
        "Dubai business cost",
        "free zone cost calculator",
    ],
    path: "/calculator",
});

/**
 * Generate blog post metadata
 */
export function generateBlogMetadata(blog: {
    title: string;
    excerpt: string;
    slug: string;
    category: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    coverImage: string;
    keywords?: string[];
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
}): Metadata {
    const title = blog.metaTitle || blog.title;
    const description = blog.metaDescription || blog.excerpt;
    const url = blog.canonicalUrl || `${SITE_URL}/blog/${blog.slug}`;

    return generateMetadata({
        title,
        description,
        keywords: blog.keywords || [blog.category, "UAE", "BWMC"],
        path: `/blog/${blog.slug}`, // The generateMetadata tool will prepend SITE_URL, but we use the constructed url for canonical
        image: blog.coverImage.startsWith("http")
            ? blog.coverImage
            : `${SITE_URL}${blog.coverImage}`,
        type: "article",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        author: blog.author,
        section: blog.category,
    });
}

/**
 * Get reading time estimate
 */
export function estimateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}

/**
 * Extract keywords from content
 */
export function extractKeywords(content: string, limit: number = 10): string[] {
    // Remove HTML tags
    const text = content.replace(/<[^>]*>/g, " ");

    // Common words to exclude
    const stopWords = new Set([
        "the",
        "a",
        "an",
        "and",
        "or",
        "but",
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
        "by",
        "from",
        "as",
        "is",
        "was",
        "are",
        "were",
        "be",
        "been",
        "being",
        "have",
        "has",
        "had",
        "do",
        "does",
        "did",
        "will",
        "would",
        "should",
        "could",
        "may",
        "might",
        "must",
        "can",
        "this",
        "that",
        "these",
        "those",
        "it",
        "its",
        "you",
        "your",
        "we",
        "our",
    ]);

    // Extract words
    const words = text
        .toLowerCase()
        .match(/\b[a-z]{3,}\b/g) || [];

    // Count frequency
    const frequency: { [key: string]: number } = {};
    words.forEach((word) => {
        if (!stopWords.has(word)) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });

    // Sort by frequency and return top keywords
    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word]) => word);
}
