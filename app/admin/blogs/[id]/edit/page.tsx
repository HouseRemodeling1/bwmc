"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import SeoAgent from "@/components/SeoAgent";
import FileUpload from "@/components/FileUpload";
import RichTextEditor from "@/components/RichTextEditor";
import { normalizeText, formatBlogContent } from "@/lib/content-formatter";
import { BLOG_CATEGORIES } from "@/lib/constants";

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
    const [previewHtml, setPreviewHtml] = useState("");

    useEffect(() => {
        fetch("/api/authors").then(r => r.json()).then(setAuthors).catch(() => {});
    }, []);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                const data = await res.json();
                
                // Convert Markdown to HTML for the visual editor if needed
                const initialContent = formatBlogContent(data.content);
                setFormData({ ...data, content: initialContent });
                setPreviewHtml(initialContent);
            } catch (error) {
                alert("Failed to load blog");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    useEffect(() => {
        setPreviewHtml(formatBlogContent(formData.content));
    }, [formData.content]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) router.push("/admin");
            else alert("Failed to update blog");
        } catch (error) {
            alert("Failed to update blog");
        } finally {
            setSaving(false);
        }
    };

    const set = (fields: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...fields }));

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-[500]">
                <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-500" />
                        </Link>
                        <h1 className="text-xl font-bold text-navy">Editing: {formData.title.substring(0, 30)}...</h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                            <input type="checkbox" id="published" checked={formData.published}
                                onChange={(e) => set({ published: e.target.checked })}
                                className="w-4 h-4 text-royal-blue border-slate-300 rounded focus:ring-royal-blue" />
                            <label htmlFor="published" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Published</label>
                        </div>
                        <button onClick={handleSubmit} disabled={saving}
                            className="flex items-center gap-2 bg-royal-blue text-white font-bold px-8 py-2 rounded-full hover:bg-navy transition-all disabled:opacity-50 shadow-lg shadow-royal-blue/20">
                            <Save className="w-4 h-4" />
                            {saving ? "Saving Changes..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1800px] mx-auto p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* LEFT PANEL: EDITOR */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Headline</label>
                                <input type="text" value={formData.title}
                                    onChange={(e) => set({ title: e.target.value })}
                                    className="w-full text-2xl font-black text-navy border-none focus:ring-0 p-0"
                                    placeholder="Enter Headline..." required />
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-slate-400">Slug:</span>
                                <input type="text" value={formData.slug}
                                    onChange={(e) => set({ slug: e.target.value })}
                                    className="bg-slate-50 px-3 py-1 rounded border-none text-royal-blue font-medium focus:ring-1 focus:ring-royal-blue" />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Editorial Excerpt</label>
                                <textarea value={formData.excerpt}
                                    onChange={(e) => set({ excerpt: e.target.value })}
                                    className="w-full bg-slate-50 px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-royal-blue outline-none text-navy italic"
                                    rows={2} required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FileUpload 
                                    defaultValue={formData.coverImage}
                                    onUpload={(url) => set({ coverImage: url })}
                                />
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                                        <select value={formData.category} onChange={(e) => set({ category: e.target.value })}
                                            className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-royal-blue outline-none text-navy font-medium">
                                            {BLOG_CATEGORIES.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Author</label>
                                        <select value={formData.authorId || ""} onChange={(e) => set({ authorId: e.target.value })}
                                            className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-royal-blue outline-none text-navy font-medium">
                                            <option value="">— Select Author —</option>
                                            {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Content Editor (WYSIWYG)</label>
                            <RichTextEditor 
                                value={formData.content} 
                                onChange={(val) => set({ content: val })} 
                                placeholder="Edit your blog masterpiece..."
                            />
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                            <SeoAgent
                                formData={{ title: formData.title, excerpt: formData.excerpt, content: formData.content, category: formData.category, slug: formData.slug }}
                                onApply={(fields) => set(fields as any)}
                            />
                        </div>
                    </div>

                    {/* RIGHT PANEL: LIVE PREVIEW */}
                    <div className="sticky top-[100px] h-fit">
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                            <div className="bg-navy px-8 py-3 flex items-center justify-between">
                                <span className="text-xs font-black text-sky-blue uppercase tracking-widest">Live Justified Preview</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                </div>
                            </div>
                            <div className="h-[calc(100vh-250px)] overflow-y-auto p-12 bg-white">
                                {formData.title && (
                                    <h1 className="text-4xl font-black text-navy mb-8 leading-tight uppercase tracking-tight">{formData.title}</h1>
                                )}
                                {formData.excerpt && (
                                    <p className="text-lg font-medium text-navy/70 leading-relaxed mb-10 italic border-l-4 border-sky-blue pl-6 bg-sky-blue/5 py-4 rounded-r-xl">{formData.excerpt}</p>
                                )}
                                <div 
                                    className="blog-content prose prose-lg prose-slate max-w-none
                                    prose-headings:text-navy prose-headings:font-black prose-headings:mt-16 prose-headings:mb-8
                                    prose-p:leading-[1.8] prose-p:text-gray-700 prose-p:mb-10 prose-p:text-justify
                                    prose-strong:text-navy prose-strong:font-bold
                                    prose-a:text-royal-blue prose-a:underline prose-a:font-bold
                                    prose-ul:text-gray-600 prose-ul:my-10 prose-ul:space-y-4
                                    prose-li:my-2
                                    prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-16"
                                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
