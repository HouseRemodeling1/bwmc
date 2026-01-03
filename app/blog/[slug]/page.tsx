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
            <article className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div
                        style={{ color: '#000000' }}
                        className="prose prose-base md:prose-lg lg:prose-xl max-w-none
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
