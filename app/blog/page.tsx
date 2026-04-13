import { Metadata } from "next";
import Link from "next/link";
import { User, ChevronRight } from "lucide-react";
import { getBlogs, Blog } from "@/lib/blogs";
import BlogListingContainer from "@/components/blog/BlogListingContainer";
import { blogMetadata } from "@/lib/metadata";

export const metadata: Metadata = blogMetadata;
export const dynamic = "force-dynamic";

async function getPublishedBlogs() {
    try {
        const blogs = await getBlogs();
        return blogs
            .filter((blog: Blog) => blog.published)
            .sort((a: Blog, b: Blog) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
        console.error("Error fetching published blogs for build:", error);
        return [];
    }
}

export default async function BlogPage() {
    const blogs = await getPublishedBlogs();

    return (
        <main className="min-h-screen bg-white">
            {/* Premium Hero Section */}
            <section className="bg-[#0B1221] relative overflow-hidden pt-40 pb-32 px-6 lg:px-8">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1E40AF_0%,transparent_40%)] opacity-30" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-blue/10 blur-[120px] rounded-full" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl">
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
                    </div>
                </div>
            </section>

            {/* Dynamic Blog Listing with Filtering */}
            <BlogListingContainer initialBlogs={blogs} />
        </main>
    );
}
