import Link from 'next/link';

interface RelatedItem {
    title: string;
    href: string;
    description: string;
    category?: string;
}

interface RelatedContentProps {
    title?: string;
    items: RelatedItem[];
    className?: string;
}

export default function RelatedContent({
    title = "Related Content",
    items,
    className = ""
}: RelatedContentProps) {
    if (items.length === 0) return null;

    return (
        <section className={`py-12 ${className}`}>
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-sky-blue hover:shadow-lg transition-all duration-300"
                        >
                            {item.category && (
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-sky-blue bg-sky-blue/10 rounded-full mb-3">
                                    {item.category}
                                </span>
                            )}

                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-blue transition-colors mb-2">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-2">
                                {item.description}
                            </p>

                            <div className="mt-4 flex items-center text-sky-blue text-sm font-medium">
                                Read more
                                <svg
                                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
