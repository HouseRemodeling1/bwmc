import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import { blogMetadata } from "@/lib/metadata";

export const metadata = blogMetadata;

import { getBlogs, Blog } from "@/lib/blogs";

async function getPublishedBlogs() {
    try {
        const blogs = await getBlogs();
        return blogs
            .filter((blog: Blog) => blog.published)
            .sort((a: Blog, b: Blog) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
    } catch (error) {
        console.error("Error fetching published blogs for build:", error);
        return [];
    }
}


export default async function BlogPage() {
    const blogs = await getPublishedBlogs();

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-navy relative overflow-hidden pt-32 pb-24 px-6 lg:px-8 min-h-[40vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/20 to-sky-blue/20"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Insights & Updates
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Stay informed with expert insights on business, finance, tax, and audit
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    {blogs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog: any, index: number) => (
                                <article
                                    key={blog.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                                >
                                    {blog.coverimage && (
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={blog.coverimage}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(blog.createdat).toLocaleDateString()}
                                            </span>
                                            <span className="px-3 py-1 bg-royal-blue/10 text-royal-blue rounded-full text-xs font-semibold">
                                                {blog.category}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-navy mb-3 group-hover:text-royal-blue transition-colors">
                                            {blog.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            className="inline-flex items-center gap-2 text-royal-blue font-semibold hover:gap-3 transition-all"
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
