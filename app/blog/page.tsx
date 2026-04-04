"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getBlogs, Blog } from "@/lib/blogs";

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBlogs() {
            try {
                const data = await getBlogs();
                const published = data
                    .filter((b) => b.published)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setBlogs(published);
            } catch (err) {
                console.error("Error loading blogs:", err);
            } finally {
                setLoading(false);
            }
        }
        loadBlogs();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            {/* Premium Hero Section */}
            <section className="bg-[#0B1221] relative overflow-hidden pt-40 pb-32 px-6 lg:px-8">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1E40AF_0%,transparent_40%)] opacity-30" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-blue/10 blur-[120px] rounded-full" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
                            <span className="w-2 h-2 bg-sky-blue rounded-full" />
                            <span className="text-white/80 text-xs font-black uppercase tracking-widest">Knowledge Base</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]">
                            BWMC <span className="text-sky-blue">Insights</span>
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
                            Critical updates on UAE regulatory changes, business strategy, and financial optimization. Stay ahead with expert analysis from our consultants.
                        </p>
                        
                        <div className="mt-12 flex flex-wrap gap-4">
                            <Link 
                                href="/author/dashboard" 
                                className="group flex items-center gap-3 px-8 py-4 bg-white text-navy font-black rounded-2xl hover:bg-sky-blue transition-all shadow-2xl"
                            >
                                <User className="w-5 h-5" />
                                Writer Dashboard
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Section / Filters (Optional Placeholder) */}
            <nav className="bg-gray-50 border-b border-gray-100 py-6 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar">
                    {["All Articles", "Taxation", "Accounting", "Success Stories", "Business Setup"].map((cat, i) => (
                        <button key={cat} className={`text-sm font-bold uppercase tracking-widest whitespace-nowrap ${i === 0 ? "text-royal-blue border-b-2 border-royal-blue pb-1" : "text-gray-400 hover:text-navy transition-colors"}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Blog Grid */}
            <section className="py-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="animate-pulse bg-gray-50 rounded-3xl h-96" />
                            ))}
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 text-xl font-medium italic">Our experts are currently drafting new insights. Check back shortly.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {blogs.map((blog, index) => (
                                <motion.article
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group flex flex-col bg-white rounded-[40px] border border-gray-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
                                >
                                    <Link href={`/blog/${blog.slug}`} className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={blog.coverImage || "https://images.unsplash.com/photo-1454165833767-0270393b8000"}
                                            alt={blog.title}
                                            fill
                                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500" />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-navy text-[10px] font-black uppercase tracking-widest border border-white/20">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </Link>
                                    
                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-sky-blue" />
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-sky-blue" />
                                                {blog.readingTime || 5} min
                                            </span>
                                        </div>
                                        
                                        <h2 className="text-2xl font-bold text-navy mb-4 leading-tight group-hover:text-royal-blue transition-colors">
                                            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                                        </h2>
                                        
                                        <p className="text-gray-500 line-clamp-3 mb-8 leading-relaxed">
                                            {blog.excerpt}
                                        </p>
                                        
                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-[10px] font-bold">
                                                    {blog.author[0]}
                                                </div>
                                                <span className="text-xs font-bold text-navy">{blog.author}</span>
                                            </div>
                                            <Link
                                                href={`/blog/${blog.slug}`}
                                                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy hover:bg-royal-blue hover:text-white transition-all transform group-hover:translate-x-1"
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
