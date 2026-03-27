"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import SeoAgent from "@/components/SeoAgent";

export default function AuthorNewBlog() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState<{ id: string; name: string } | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "Business",
        published: false,
        slug: "",
        metaTitle: "",
        metaDescription: "",
        focusKeyword: "",
        keywords: [] as string[],
        seoScore: 0,
        readingTime: 0,
    });

    useEffect(() => {
        fetch("/api/author-auth/me")
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (!data) { router.push("/author/login"); return; }
                setAuthor(data.author);
            });
    }, [router]);

    const set = (fields: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...fields }));

    const handleTitleChange = (title: string) => {
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        set({ title, slug });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!author) return;
        setLoading(true);
        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, authorId: author.id, author: author.name }),
            });
            if (res.ok) {
                router.push("/author/dashboard");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to create post");
            }
        } catch (error) {
            alert("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    if (!author) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-royal-blue" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link href="/author/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-royal-blue transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to My Posts
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-md p-8">
                    <h1 className="text-3xl font-bold text-navy mb-2">Write New Post</h1>
                    <p className="text-gray-500 mb-8">Publishing as <span className="font-semibold text-royal-blue">{author.name}</span></p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                            <input type="text" value={formData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none"
                                placeholder="Enter your post title" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL Slug <span className="text-gray-400 font-normal">(auto-generated)</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-sm">bwmc.ae/blog/</span>
                                <input type="text" value={formData.slug}
                                    onChange={(e) => set({ slug: e.target.value })}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                            <textarea value={formData.excerpt}
                                onChange={(e) => set({ excerpt: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none"
                                placeholder="A short summary shown on the blog listing page" rows={2} required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                            <textarea value={formData.content}
                                onChange={(e) => set({ content: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none font-mono text-sm"
                                placeholder="Write your full article here... (supports HTML tags like <h2>, <p>, <strong>, <ul>)"
                                rows={18} required />
                            <p className="text-xs text-gray-400 mt-1">
                                Tip: Use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;&lt;li&gt; for formatting.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
                            <input type="url" value={formData.coverImage}
                                onChange={(e) => set({ coverImage: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none"
                                placeholder="https://example.com/image.jpg" />
                            {formData.coverImage && (
                                <img src={formData.coverImage} alt="preview"
                                    className="mt-2 h-32 w-full object-cover rounded-lg border border-gray-200" />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select value={formData.category} onChange={(e) => set({ category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none">
                                <option>Business</option><option>Finance</option>
                                <option>Tax</option><option>Audit</option><option>Technology</option>
                            </select>
                        </div>

                        {/* AI SEO Agent */}
                        <div>
                            <SeoAgent
                                formData={{ title: formData.title, excerpt: formData.excerpt, content: formData.content, category: formData.category, slug: formData.slug }}
                                onApply={(fields) => set(fields as any)}
                            />
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <input type="checkbox" id="published" checked={formData.published}
                                onChange={(e) => set({ published: e.target.checked })}
                                className="w-5 h-5 text-royal-blue border-gray-300 rounded focus:ring-royal-blue" />
                            <div>
                                <label htmlFor="published" className="text-sm font-semibold text-gray-700">Publish immediately</label>
                                <p className="text-xs text-gray-400">{formData.published ? "Will be visible on the blog" : "Will be saved as a draft"}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button type="submit" disabled={loading}
                                className="flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
                                <Save className="w-5 h-5" />
                                {loading ? "Publishing..." : formData.published ? "Publish Post" : "Save Draft"}
                            </button>
                            <Link href="/author/dashboard"
                                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all">Cancel</Link>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
