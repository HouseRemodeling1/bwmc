"use client";

import { useState } from "react";
import { Blog } from "@/lib/blogs";
import BlogGrid from "./BlogGrid";
import { BLOG_CATEGORIES } from "@/lib/constants";

interface BlogListingContainerProps {
    initialBlogs: Blog[];
}

export default function BlogListingContainer({ initialBlogs }: BlogListingContainerProps) {
    const [selectedCategory, setSelectedCategory] = useState("All Articles");

    const filteredBlogs = selectedCategory === "All Articles"
        ? initialBlogs
        : initialBlogs.filter(blog => blog.category === selectedCategory);

    const categories = ["All Articles", ...BLOG_CATEGORIES];

    return (
        <>
            {/* Filter Navigation */}
            <nav className="bg-gray-50 border-b border-gray-100 py-6 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                                selectedCategory === cat
                                    ? "text-royal-blue border-b-2 border-royal-blue pb-1"
                                    : "text-gray-400 hover:text-navy"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Blog Grid Section */}
            <section className="py-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <BlogGrid blogs={filteredBlogs} />
                </div>
            </section>
        </>
    );
}
