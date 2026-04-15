"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import SeoAgent from "@/components/SeoAgent";
import FileUpload from "@/components/FileUpload";

export default function NewBlog() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "Business",
        author: "BWMC Team",
        authorId: "",
        published: false,
        slug: "",
        metaTitle: "",
        metaDescription: "",
        focusKeyword: "",
        keywords: [] as string[],
        seoScore: 0,
        readingTime: 0,
    });
    
    const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        fetch("/api/authors").then(r => r.json()).then(setAuthors).catch(() => {});
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                router.push("/admin");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to create blog");
            }
        } catch (error) {
            alert("Failed to create blog: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const set = (fields: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...fields }));

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-gray-600 hover:text-royal-blue transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-navy mb-8">Create New Blog</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                            <input type="text" value={formData.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                                    set({ title, slug });
                                }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none text-navy"
                                placeholder="Enter blog title" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-sm shrink-0">bwmc.ae/blog/</span>
                                <input type="text" value={formData.slug}
                                    onChange={(e) => set({ slug: e.target.value })}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none text-sm text-navy" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                            <textarea value={formData.excerpt}
                                onChange={(e) => set({ excerpt: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none text-navy"
                                placeholder="Short description (1-2 sentences)" rows={2} required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                            <textarea value={formData.content}
                                onChange={(e) => set({ content: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none font-mono text-sm text-navy"
                                placeholder="Write your blog content here... (supports HTML)" rows={15} required />
                            <p className="text-xs text-gray-500 mt-1">Tip: You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;ul&gt;, etc.</p>
                        </div>

                        <FileUpload 
                            defaultValue={formData.coverImage}
                            onUpload={(url) => set({ coverImage: url })}
                        />

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select value={formData.category} onChange={(e) => set({ category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none text-navy">
                                    <option>Business</option><option>Finance</option>
                                    <option>Tax</option><option>Audit</option><option>Technology</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                                <select value={formData.authorId || ""} onChange={(e) => set({ authorId: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none text-navy">
                                    <option value="">— Select Author —</option>
                                    {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
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
                            <label htmlFor="published" className="text-sm font-medium text-gray-700">Publish immediately</label>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="submit" disabled={loading}
                                className="flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
                                <Save className="w-5 h-5" />
                                {loading ? "Creating..." : "Create Blog"}
                            </button>
                            <Link href="/admin" className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all">Cancel</Link>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
