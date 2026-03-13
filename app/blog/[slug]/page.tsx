import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";
import { generateBlogMetadata, estimateReadingTime } from "@/lib/metadata";
import { generateArticleSchema } from "@/lib/schema";

import { getBlogs, Blog } from "@/lib/blogs";

async function getBlog(slug: string): Promise<Blog | undefined> {
    try {
        const blogs = await getBlogs();
        return blogs.find((blog: Blog) => blog.slug === slug && blog.published);
    } catch (error) {
        console.error("Error fetching single blog for build:", error);
        return undefined;
    }
}

async function getAllBlogs(): Promise<Blog[]> {
    try {
        const blogs = await getBlogs();
        return blogs.filter((blog: Blog) => blog.published);
    } catch (error) {
        console.error("Error fetching all blogs for build:", error);
        return [];
    }
}


export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: "Blog Not Found | BWMC",
        };
    }

    return generateBlogMetadata(blog);
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    const allBlogs = await getAllBlogs();
    const readingTime = estimateReadingTime(blog.content);

    // Generate Article Schema
    const articleSchema = generateArticleSchema({
        headline: blog.title,
        description: blog.excerpt,
        image: blog.coverimage.startsWith("http")
            ? blog.coverimage
            : `https://bwmc.ae${blog.coverimage}`,
        datePublished: blog.createdat,
        dateModified: blog.updatedat,
        authorName: blog.author,
        authorUrl: "https://bwmc.ae/about",
        publisherName: "BWMC",
        publisherLogo: "https://bwmc.ae/logo.png",
        url: `https://bwmc.ae/blog/${blog.slug}`,
        keywords: blog.keywords,
        articleSection: blog.category,
        wordCount: blog.content.split(/\s+/).length,
    });

    // Get related posts
    const relatedPosts = blog.relatedposts
        ? allBlogs
            .filter((b) => blog.relatedposts?.includes(b.slug))
            .slice(0, 3)
            .map((b) => ({
                title: b.title,
                href: `/blog/${b.slug}`,
                description: b.excerpt,
                category: b.category,
            }))
        : allBlogs
            .filter((b) => b.category === blog.category && b.slug !== blog.slug)
            .slice(0, 3)
            .map((b) => ({
                title: b.title,
                href: `/blog/${b.slug}`,
                description: b.excerpt,
                category: b.category,
            }));

    // Add related services if specified
    const relatedServices = blog.relatedservices
        ? blog.relatedservices.map((service) => {
            const serviceMap: { [key: string]: { title: string; description: string } } = {
                "business-setup": {
                    title: "Business Setup Services",
                    description: "Complete company formation and licensing solutions in UAE",
                },
                licensing: {
                    title: "Licensing Services",
                    description: "Trade license processing and renewal services",
                },
                accounting: {
                    title: "Accounting & Bookkeeping",
                    description: "Professional accounting and financial management services",
                },
                taxation: {
                    title: "Tax Services",
                    description: "VAT and Corporate Tax compliance and advisory",
                },
                legal: {
                    title: "Legal Services",
                    description: "Trademark registration and legal compliance",
                },
            };

            const serviceInfo = serviceMap[service] || {
                title: service,
                description: "Professional business services",
            };

            return {
                title: serviceInfo.title,
                href: `/services/${service}`,
                description: serviceInfo.description,
                category: "Service",
            };
        })
        : [];

    const allRelatedContent = [...relatedServices, ...relatedPosts];

    return (
        <>
            {/* Article Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="bg-navy relative overflow-hidden py-16 px-6 lg:px-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-sky-blue/20"></div>
                    <div className="max-w-4xl mx-auto relative z-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs
                            items={[
                                { label: "Blog", href: "/blog" },
                                { label: blog.category, href: `/blog?category=${blog.category}` },
                                { label: blog.title, href: `/blog/${blog.slug}` },
                            ]}
                        />

                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors mt-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        <div className="flex items-center gap-4 text-sm text-white/70 mb-4 flex-wrap">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(blog.createdat).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {blog.author}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {readingTime}
                            </span>
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                                {blog.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {blog.title}
                        </h1>
                        <p className="text-xl text-white/90">{blog.excerpt}</p>
                    </div>
                </section>

                {/* Cover Image */}
                {blog.coverimage && (
                    <section className="relative h-96 bg-gray-100">
                        <Image
                            src={blog.coverimage}
                            alt={`${blog.title} - BWMC Blog`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </section>
                )}

                {/* Content Section */}
                <article className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <div
                            className="
                            text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-none font-sans
                            [&_h1]:text-navy [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-10 [&_h1]:text-3xl md:[&_h1]:text-4xl first:[&_h1]:mt-0
                            [&_h2]:text-navy [&_h2]:font-bold [&_h2]:mb-6 [&_h2]:mt-10 [&_h2]:text-2xl md:[&_h2]:text-3xl
                            [&_h3]:text-navy [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-xl md:[&_h3]:text-2xl
                            [&_p]:mb-6 [&_p]:text-gray-700 [&_p]:leading-relaxed
                            [&_a]:text-royal-blue [&_a]:font-semibold [&_a]:underline [&_a]:decoration-sky-blue/40 hover:[&_a]:decoration-royal-blue [&_a]:underline-offset-4
                            [&_strong]:text-navy [&_strong]:font-bold
                            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6 [&_ul]:space-y-3 [&_ul]:text-gray-700
                            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:text-gray-700
                            [&_li]:leading-relaxed [&_li]:text-gray-700
                            [&_hr]:border-t-2 [&_hr]:border-gray-200 [&_hr]:my-10
                            [&_img]:rounded-2xl [&_img]:shadow-xl [&_img]:my-10 [&_img]:mx-auto
                            "
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Keywords */}
                        {blog.keywords && blog.keywords.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                    Topics
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.keywords.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Related Content */}
                {allRelatedContent.length > 0 && (
                    <RelatedContent
                        title="Related Resources"
                        items={allRelatedContent}
                        className="bg-gray-50"
                    />
                )}

                {/* CTA Section */}
                <section className="py-16 px-6 lg:px-8 bg-navy">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Need Expert Guidance?
                        </h2>
                        <p className="text-white/80 mb-8 text-lg">
                            Our team of professionals is ready to help you navigate the complexities
                            of business setup and compliance in the UAE.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-sky-blue hover:bg-royal-blue text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                Schedule a Consultation
                            </Link>
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all border border-white/20"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                View All Articles
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
