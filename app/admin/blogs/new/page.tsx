"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import SeoAgent from "@/components/SeoAgent";
import FileUpload from "@/components/FileUpload";
import RichTextEditor from "@/components/RichTextEditor";
import { normalizeText, formatBlogContent } from "@/lib/content-formatter";
import { BLOG_CATEGORIES } from "@/lib/constants";

export default function NewBlog() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    // Update preview whenever content changes
    useEffect(() => {
        setPreviewHtml(formatBlogContent(formData.content));
    }, [formData.content]);

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
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-[500]">
                <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-500" />
                        </Link>
                        <h1 className="text-xl font-bold text-navy">Draft New Post</h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                            <input type="checkbox" id="published" checked={formData.published}
                                onChange={(e) => set({ published: e.target.checked })}
                                className="w-4 h-4 text-royal-blue border-slate-300 rounded focus:ring-royal-blue" />
                            <label htmlFor="published" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Publish immediately</label>
                        </div>
                        <button onClick={handleSubmit} disabled={loading}
                            className="flex items-center gap-2 bg-royal-blue text-white font-bold px-8 py-2 rounded-full hover:bg-navy transition-all disabled:opacity-50 shadow-lg shadow-royal-blue/20">
                            <Save className="w-4 h-4" />
                            {loading ? "Saving..." : "Publish Post"}
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
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Article Title</label>
                                <input type="text" value={formData.title}
                                    onChange={(e) => {
                                        const title = e.target.value;
                                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                                        set({ title, slug });
                                    }}
                                    className="w-full text-2xl font-black text-navy border-none focus:ring-0 placeholder:text-slate-200 p-0"
                                    placeholder="Enter Headline..." required />
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-slate-400">bwmc.ae/blog/</span>
                                <input type="text" value={formData.slug}
                                    onChange={(e) => set({ slug: e.target.value })}
                                    className="bg-slate-50 px-3 py-1 rounded border-none text-royal-blue font-medium focus:ring-1 focus:ring-royal-blue" />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Editorial Excerpt</label>
                                <textarea value={formData.excerpt}
                                    onChange={(e) => set({ excerpt: e.target.value })}
                                    className="w-full bg-slate-50 px-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-royal-blue outline-none text-navy italic"
                                    placeholder="A brief summary for cards and social shares..." rows={2} required />
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
                                            <option>Business</option><option>Finance Trade</option><option>Finance</option>
                                            <option>Tax</option><option>Audit</option><option>Technology</option>
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
                                placeholder="Start writing administrative masterpiece..."
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
                                <span className="text-xs font-black text-sky-blue uppercase tracking-widest">Desktop Preview (Justified Layout)</span>
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

                                {!formData.content && (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-4">
                                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
                                            <Save className="w-8 h-8" />
                                        </div>
                                        <p className="font-medium">Type in the editor to see live preview</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
