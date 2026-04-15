import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";
import { generateBlogMetadata, estimateReadingTime } from "@/lib/metadata";
import { generateArticleSchema } from "@/lib/schema";
import { getBlogs, Blog } from "@/lib/blogs";
import AuthorCard from "@/components/AuthorCard";
import { getAuthorById } from "@/lib/authors";
import { formatBlogContent } from "@/lib/content-formatter";
import ShareButtons from "@/components/blog/ShareButtons";

async function getBlog(slug: string): Promise<Blog | undefined> {
    try {
        const blogs = await getBlogs();
        return blogs.find((blog: Blog) => blog.slug === slug && blog.published);
    } catch (error) {
        console.error("Error fetching single blog:", error);
        return undefined;
    }
}

async function getAllBlogs(): Promise<Blog[]> {
    try {
        const blogs = await getBlogs();
        return blogs.filter((blog: Blog) => blog.published);
    } catch (error) {
        console.error("Error fetching all blogs:", error);
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
    if (!blog) return { title: "Blog Not Found | BWMC" };
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

    const author = blog.authorId ? await getAuthorById(blog.authorId) : null;
    const allBlogs = await getAllBlogs();
    
    // Logic for related content
    const relatedPosts = blog.relatedPosts
        ? allBlogs
            .filter((rp) => blog.relatedPosts?.includes(rp.slug))
            .slice(0, 3)
        : allBlogs
            .filter((rp) => rp.category === blog.category && rp.slug !== blog.slug)
            .slice(0, 3);

    const posts = relatedPosts.map((rp) => ({
        title: rp.title,
        href: `/blog/${rp.slug}`,
        description: rp.excerpt,
        category: rp.category,
    }));

    const serviceMap: { [key: string]: { title: string; description: string } } = {
        "business-setup": { title: "Business Setup", description: "Expert company formation in UAE" },
        accounting: { title: "Accounting Services", description: "Professional bookkeeping & audits" },
        taxation: { title: "Tax Compliance", description: "VAT & Corporate Tax advisory" },
    };

    const services = (blog.relatedServices || []).map(s => ({
        title: serviceMap[s]?.title || s,
        href: `/services/${s}`,
        description: serviceMap[s]?.description || "Expert business advice",
        category: "Service",
    }));

    const allRelatedContent = [...services, ...posts];
    const readingTime = blog.readingTime ? `${blog.readingTime} min read` : estimateReadingTime(blog.content);
    const formattedContent = formatBlogContent(blog.content);

    // Article Schema
    const articleSchema = generateArticleSchema({
        headline: blog.title,
        description: blog.excerpt,
        image: blog.coverImage.startsWith("http") ? blog.coverImage : `https://bwmc.ae${blog.coverImage}`,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        authorName: blog.author,
        url: `https://bwmc.ae/blog/${blog.slug}`,
        keywords: blog.keywords,
        articleSection: blog.category,
        publisherName: "BWMC",
        publisherLogo: "https://bwmc.ae/logo.png",
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <main className="min-h-screen bg-white">
                {/* Premium Hero Section */}
                <section className="relative pt-32 pb-48 px-6 lg:px-8 bg-[#0B1221] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1E40AF_0%,transparent_40%),radial-gradient(circle_at_70%_80%,#0369A1_0%,transparent_50%)] opacity-30" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                    
                    <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
                        <Breadcrumbs
                            items={[
                                { label: "Blog", href: "/blog" },
                                { label: blog.category, href: `/blog?category=${blog.category}` },
                                { label: blog.title, href: `/blog/${blog.slug}` },
                            ]}
                        />

                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sky-blue hover:text-white font-semibold transition-all group mb-8 mt-6"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Insights
                        </Link>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-blue/10 border border-sky-blue/20 rounded-full mb-6">
                            <span className="w-1.5 h-1.5 bg-sky-blue rounded-full animate-pulse" />
                            <span className="text-sky-blue text-xs font-black uppercase tracking-[0.1em]">BWMC Professional Insight</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            {blog.title}
                        </h1>

                        <div className="inline-flex flex-wrap items-center gap-y-4 gap-x-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-left">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-royal-blue flex items-center justify-center text-white font-bold text-lg">
                                    {author ? author.name[0] : (blog.author ? blog.author[0] : "B")}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">
                                        {author ? author.name : (blog.author || "BWMC Team")}
                                    </p>
                                    <p className="text-white/40 text-xs uppercase tracking-widest leading-none mt-1">Author</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-white/10 hidden md:block" />
                            <div className="flex items-center gap-3 text-white/70">
                                <Calendar className="w-4 h-4 text-sky-blue" />
                                <span className="text-sm font-medium">
                                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                        month: "long", day: "numeric", year: "numeric"
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <Clock className="w-4 h-4 text-sky-blue" />
                                <span className="text-sm font-medium">{readingTime}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-wider">
                                    {blog.category}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Overlapping Cover Image */}
                <div className="relative max-w-4xl mx-auto -mt-32 px-6 lg:px-8 mb-20">
                    <div className="aspect-video relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-navy border-4 border-white/10 group">
                        <Image
                            src={blog.coverImage || "https://images.unsplash.com/photo-1454165833767-0270393b8000"}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-10 left-10 hidden md:block">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-white font-medium text-sm italic">Verified by BWMC Compliance</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <section className="pb-24 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_300px] gap-16">
                        <article>
                            <p className="text-lg md:text-2xl font-medium text-navy/70 leading-relaxed mb-12 italic border-l-4 border-sky-blue pl-6 bg-sky-blue/5 py-4 rounded-r-xl">
                                {blog.excerpt}
                            </p>

                            <div 
                                className="prose prose-lg prose-slate max-w-none 
                                prose-headings:text-navy prose-headings:font-black prose-headings:mt-16 prose-headings:mb-8
                                prose-p:leading-[1.8] prose-p:text-gray-700 prose-p:mb-10 prose-p:text-justify
                                prose-strong:text-navy prose-strong:font-bold
                                prose-a:text-royal-blue prose-a:no-underline hover:prose-a:underline
                                prose-ul:text-gray-600 prose-ul:my-10 prose-ul:space-y-4
                                prose-li:my-2
                                prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-16"
                                dangerouslySetInnerHTML={{ __html: formattedContent }}
                            />

                            {author && (
                                <div className="mt-20">
                                    <h3 className="text-sm font-black text-navy/30 uppercase tracking-[0.2em] mb-8 border-b border-gray-100 pb-4">Written By</h3>
                                    <AuthorCard author={author} />
                                </div>
                            )}

                            {blog.keywords && blog.keywords.length > 0 && (
                                <div className="mt-16 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    <h3 className="text-sm font-black text-navy/40 uppercase tracking-widest mb-4">Topics Covered</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.keywords.map((k, i) => (
                                            <span key={i} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
                                                #{k}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        <aside className="hidden lg:block sticky top-32 h-fit">
                            <div className="bg-[#f8fafc] border border-gray-200 rounded-3xl p-8">
                                <h3 className="text-navy font-black uppercase text-xs tracking-widest mb-6">Share This</h3>
                                <ShareButtons title={blog.title} />

                                <div className="mt-12 bg-navy rounded-2xl p-6 text-white text-center">
                                    <p className="text-sky-blue text-[10px] font-black uppercase tracking-[0.2em] mb-2">Need advice?</p>
                                    <p className="text-sm font-bold mb-4">Schedule a call with our consultants</p>
                                    <Link 
                                        href="/contact"
                                        className="block w-full py-2 bg-white text-navy font-bold text-xs rounded-xl hover:bg-sky-blue transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {allRelatedContent.length > 0 && (
                    <RelatedContent
                        title="Further Reading"
                        items={allRelatedContent}
                        className="bg-[#f8fafc] border-t border-gray-200"
                    />
                )}

                <section className="bg-navy py-24 px-6 lg:px-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-royal-blue/20 blur-[120px] rounded-full pointer-events-none" />
                    <div className="max-w-4xl mx-auto relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Expertise When You Need It.</h2>
                        <p className="text-xl text-white/70 mb-10">BWMC partners with businesses to bridge the gap between financial compliance and strategic growth.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="px-10 py-5 bg-sky-blue hover:bg-royal-blue text-white font-black rounded-2xl transition-all shadow-2xl">Start a Consultation</Link>
                            <Link href="/services" className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl border border-white/20 transition-all">Browse Services</Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
