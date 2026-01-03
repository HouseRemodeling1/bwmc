import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import fs from "fs";
import path from "path";

async function getBlog(slug: string) {
    const filePath = path.join(process.cwd(), "public", "data", "blogs.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.blogs.find((blog: any) => blog.slug === slug && blog.published);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: "Blog Not Found | BWMC",
        };
    }

    return {
        title: `${blog.title} | BWMC Blog`,
        description: blog.excerpt,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-navy relative overflow-hidden py-16 px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-sky-blue/20"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
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
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </section>
            )}

            {/* Content Section */}
            <article className="py-12 md:py-20 px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div
                        className="prose prose-lg md:prose-xl max-w-none
              prose-headings:text-navy prose-headings:font-bold prose-headings:mb-6
              prose-p:text-slate-800 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-royal-blue prose-a:font-semibold prose-a:underline decoration-sky-blue/30 underline-offset-4 hover:decoration-royal-blue
              prose-strong:text-navy prose-strong:font-bold
              prose-ul:text-slate-800 prose-ul:my-8
              prose-ol:text-slate-800 prose-ol:my-8
              prose-li:mb-2
              prose-hr:border-slate-200 prose-hr:my-12
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-12 prose-img:mx-auto"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>

            {/* Back to Blog CTA */}
            <section className="py-12 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-8 py-4 rounded-lg hover:shadow-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        View All Blog Posts
                    </Link>
                </div>
            </section>
        </main>
    );
}
