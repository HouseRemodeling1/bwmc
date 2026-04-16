import { useRef } from "react";
import EditorToolbar from "@/components/EditorToolbar";
import { formatBlogContent, normalizeText } from "@/lib/content-formatter";

export default function AuthorEditBlog({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [author, setAuthor] = useState<{ id: string; name: string } | null>(null);
    const [formData, setFormData] = useState({
        title: "", excerpt: "", content: "", coverImage: "",
        category: "Business", published: false, slug: "", authorId: "",
        metaTitle: "", metaDescription: "", focusKeyword: "",
        keywords: [] as string[], seoScore: 0, readingTime: 0,
    });
    const [previewHtml, setPreviewHtml] = useState("");

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
                setPreviewHtml(formatBlogContent(blog.content));
                setLoading(false);
            });
    }, [id, router]);

    useEffect(() => {
        setPreviewHtml(formatBlogContent(formData.content));
    }, [formData.content]);

    const set = (fields: Partial<typeof formData>) => setFormData(prev => ({ ...prev, ...fields }));

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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-royal-blue" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/author/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-500" />
                        </Link>
                        <h1 className="text-xl font-bold text-navy uppercase tracking-tighter">Edit Article</h1>
                        {author && (
                            <span className="text-xs bg-sky-blue/10 text-royal-blue px-3 py-1 rounded-full font-black uppercase tracking-widest">
                                Author: {author.name}
                            </span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-4">
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
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 text-justify">Headline</label>
                                <input type="text" value={formData.title}
                                    onChange={(e) => set({ title: e.target.value })}
                                    className="w-full text-3xl font-black text-navy border-none focus:ring-0 p-0 placeholder:text-slate-200"
                                    placeholder="Enter Headline..." required />
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-slate-400 uppercase font-black text-[10px] tracking-widest">Permalink:</span>
                                <input type="text" value={formData.slug}
                                    onChange={(e) => set({ slug: e.target.value })}
                                    className="bg-slate-50 px-3 py-1 rounded border-none text-royal-blue font-medium focus:ring-1 focus:ring-royal-blue" />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 text-justify">Editorial Excerpt</label>
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
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 text-justify">Category</label>
                                        <select value={formData.category} onChange={(e) => set({ category: e.target.value })}
                                            className="w-full bg-slate-50 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-royal-blue outline-none text-navy font-bold">
                                            {BLOG_CATEGORIES.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <input type="checkbox" id="published" checked={formData.published}
                                            onChange={(e) => set({ published: e.target.checked })}
                                            className="w-5 h-5 text-royal-blue border-slate-300 rounded" />
                                        <label htmlFor="published" className="text-xs font-black text-slate-600 uppercase tracking-wider">Published</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                            <EditorToolbar 
                                textareaRef={textareaRef} 
                                value={formData.content} 
                                onChange={(val) => set({ content: val })} 
                            />
                            <textarea
                                ref={textareaRef}
                                value={formData.content}
                                onChange={(e) => set({ content: e.target.value })}
                                className="w-full px-8 py-6 border-none focus:ring-0 font-mono text-sm text-navy min-h-[600px] resize-none"
                                required />
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
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-black text-sky-blue uppercase tracking-widest">Live Justified Preview</span>
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const clean = normalizeText(formData.content);
                                        set({ content: clean });
                                    }}
                                    className="text-[10px] font-black bg-royal-blue text-white px-3 py-1 rounded-full hover:bg-white hover:text-navy transition-all uppercase tracking-tighter"
                                >
                                    ✨ AI Cleanup
                                </button>
                            </div>
                            <div className="h-[calc(100vh-250px)] overflow-y-auto p-12 bg-white">
                                {formData.title && (
                                    <h1 className="text-4xl font-black text-navy mb-10 leading-tight uppercase tracking-tight">{formData.title}</h1>
                                )}
                                
                                <article 
                                    className="prose prose-lg prose-slate max-w-none 
                                    prose-headings:text-navy prose-headings:font-black
                                    prose-p:leading-[1.8] prose-p:text-gray-700 prose-p:text-justify prose-p:mb-8 prose-p:text-lg
                                    prose-strong:text-navy prose-strong:font-bold
                                    prose-img:rounded-3xl prose-img:shadow-xl
                                    prose-ul:text-gray-700 prose-ul:space-y-3"
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
            </main>
        </div>
    );
}
