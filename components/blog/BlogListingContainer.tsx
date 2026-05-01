"use client";

import { useState } from "react";
import { Blog } from "@/lib/blogs";
import BlogGrid from "./BlogGrid";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { Search } from "lucide-react";

interface BlogListingContainerProps {
    initialBlogs: Blog[];
}

export default function BlogListingContainer({ initialBlogs }: BlogListingContainerProps) {
    const [selectedCategory, setSelectedCategory] = useState("All Articles");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBlogs = initialBlogs.filter(blog => {
        const matchesCategory = selectedCategory === "All Articles" || blog.category === selectedCategory;
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             blog.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = ["All Articles", ...BLOG_CATEGORIES];

    return (
        <>
            {/* Search and Filter Section */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        {/* Category Navigation */}
                        <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2">
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
                        </nav>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-royal-blue transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search insights..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Grid Section */}
            <section className="py-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <BlogGrid blogs={filteredBlogs} />
                </div>
            </section>
        </>
    );
}
