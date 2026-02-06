import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";
import { generateBlogMetadata, estimateReadingTime } from "@/lib/metadata";
import { generateArticleSchema } from "@/lib/schema";

import fs from "fs";
import path from "path";

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    author: string;
    published: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
    keywords?: string[];
    relatedPosts?: string[];
    relatedServices?: string[];
}

async function getBlog(slug: string): Promise<Blog | undefined> {
    const filePath = path.join(process.cwd(), "public", "data", "blogs.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.blogs.find((blog: Blog) => blog.slug === slug && blog.published);
}

async function getAllBlogs(): Promise<Blog[]> {
    const filePath = path.join(process.cwd(), "public", "data", "blogs.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.blogs.filter((blog: Blog) => blog.published);
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
        image: blog.coverImage.startsWith("http")
            ? blog.coverImage
            : `https://bwmc.ae${blog.coverImage}`,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
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
    const relatedPosts = blog.relatedPosts
        ? allBlogs
            .filter((b) => blog.relatedPosts?.includes(b.slug))
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
    const relatedServices = blog.relatedServices
        ? blog.relatedServices.map((service) => {
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
                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
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
                {blog.coverImage && (
                    <section className="relative h-96 bg-gray-100">
                        <Image
                            src={blog.coverImage}
                            alt={`${blog.title} - BWMC Blog`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </section>
                )}

                {/* Content Section */}
                <article className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div
                            style={{ color: "#000000" }}
                            className="prose prose-base md:prose-lg lg:prose-xl max-w-none font-serif
              prose-headings:text-black prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-10 first:prose-headings:mt-0
              prose-p:text-black prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-justify
              prose-a:text-royal-blue prose-a:font-semibold prose-a:underline prose-a:decoration-sky-blue/40 prose-a:underline-offset-4 hover:prose-a:decoration-royal-blue
              prose-strong:text-black prose-strong:font-bold
              prose-ul:text-black prose-ul:my-6 prose-ul:space-y-3
              prose-ol:text-black prose-ol:my-6 prose-ol:space-y-3
              prose-li:text-black prose-li:leading-[1.8]
              prose-hr:border-gray-300 prose-hr:my-12
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-10 prose-img:mx-auto
              prose-h1:text-3xl md:prose-h1:text-4xl
              prose-h2:text-2xl md:prose-h2:text-3xl
              prose-h3:text-xl md:prose-h3:text-2xl"
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
