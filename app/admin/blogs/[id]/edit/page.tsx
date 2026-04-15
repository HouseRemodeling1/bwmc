"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import SeoAgent from "@/components/SeoAgent";
import FileUpload from "@/components/FileUpload";

export default function EditBlog({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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
        const fetchAuthors = async () => {
            try {
                const res = await fetch("/api/authors");
                const data = await res.json();
                setAuthors(data);
            } catch (error) {
                console.error("Failed to fetch authors:", error);
            }
        };
        fetchAuthors();
    }, []);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                if (!res.ok) throw new Error("Failed to load blog");
                const data = await res.json();
                setFormData(data);
            } catch (error) {
                console.error("Fetch Blog error:", error);
                alert("Failed to load blog");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin");
            } else {
                alert("Failed to update blog");
            }
        } catch (error) {
            alert("Failed to update blog");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-royal-blue transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-md p-8"
                >
                    <h1 className="text-3xl font-bold text-navy mb-8">Edit Blog</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none text-navy"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt *
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none text-navy"
                                rows={2}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none font-mono text-sm text-navy"
                                rows={15}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug (URL Path)
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none text-navy"
                                placeholder="e.g. my-blog-post"
                            />
                        </div>

                        <FileUpload 
                            defaultValue={formData.coverImage}
                            onUpload={(url) => setFormData({ ...formData, coverImage: url })}
                        />

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none"
                                >
                                    <option>Business</option>
                                    <option>Finance</option>
                                    <option>Tax</option>
                                    <option>Audit</option>
                                    <option>Technology</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Author
                                </label>
                                <select
                                    value={formData.authorId || ""}
                                    onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none"
                                >
                                    <option value="">— Select Author —</option>
                                    {authors.map(a => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* AI SEO Agent */}
                        <div>
                            <SeoAgent
                                formData={{ title: formData.title, excerpt: formData.excerpt, content: formData.content, category: formData.category, slug: formData.slug }}
                                onApply={(fields) => setFormData(prev => ({ ...prev, ...fields as any }))}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="published"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-5 h-5 text-royal-blue border-gray-300 rounded focus:ring-royal-blue"
                            />
                            <label htmlFor="published" className="text-sm font-medium text-gray-700">
                                Published
                            </label>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <Link
                                href="/admin"
                                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
