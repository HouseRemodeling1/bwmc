"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Blog } from "@/lib/blogs";

interface BlogGridProps {
    blogs: Blog[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
    if (blogs.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-xl font-medium italic">Our experts are currently drafting new insights. Check back shortly.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog, index) => (
                <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
    );
}
