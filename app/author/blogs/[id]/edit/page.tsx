"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

export default function AuthorEditBlog({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [author, setAuthor] = useState<{ id: string; name: string } | null>(null);
    const [formData, setFormData] = useState({
        title: "", excerpt: "", content: "", coverImage: "",
        category: "Business", published: false, slug: "", authorId: "",
    });

    useEffect(() => {
        // Check session first
        fetch("/api/author-auth/me")
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (!data) { router.push("/author/login"); return; }
                setAuthor(data.author);
                // Then fetch the blog
                return fetch(`/api/blogs/${id}`);
            })
            .then(r => r?.json())
            .then(blog => {
                if (!blog) return;
                setFormData(blog);
                setLoading(false);
            });
    }, [id, router]);

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
                router.push("/author/dashboard");
            } else {
                alert("Failed to update post");
            }
        } catch {
            alert("Failed to update post");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
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
                    <Link href="/author/dashboard"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-royal-blue transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to My Posts
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-md p-8">
                    <h1 className="text-3xl font-bold text-navy mb-8">Edit Post</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                            <input type="text" value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none"
                                required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                            <input type="text" value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                            <textarea value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none"
                                rows={2} required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                            <textarea value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none font-mono text-sm"
                                rows={18} required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
                            <input type="url" value={formData.coverImage}
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none"
                                placeholder="https://example.com/image.jpg" />
                            {formData.coverImage && (
                                <img src={formData.coverImage} alt="preview"
                                    className="mt-2 h-32 w-full object-cover rounded-lg border border-gray-200" />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none">
                                <option>Business</option>
                                <option>Finance</option>
                                <option>Tax</option>
                                <option>Audit</option>
                                <option>Technology</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <input type="checkbox" id="published" checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-5 h-5 text-royal-blue border-gray-300 rounded" />
                            <div>
                                <label htmlFor="published" className="text-sm font-semibold text-gray-700">Published</label>
                                <p className="text-xs text-gray-400">
                                    {formData.published ? "Visible on the blog" : "Saved as draft"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button type="submit" disabled={saving}
                                className="flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
                                <Save className="w-5 h-5" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <Link href="/author/dashboard"
                                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
