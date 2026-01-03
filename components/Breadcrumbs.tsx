import Link from 'next/link';

export interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    // Generate schema for breadcrumbs
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://bwmc.ae"
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": `https://bwmc.ae${item.href}`
            }))
        ]
    };

    return (
        <>
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Visual breadcrumbs */}
            <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-sky-blue transition-colors"
                        >
                            Home
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={item.href} className="flex items-center space-x-2">
                            <span className="text-gray-400">/</span>
                            {index === items.length - 1 ? (
                                <span className="text-gray-900 font-medium">{item.label}</span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-sky-blue transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
