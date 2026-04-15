"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Search, Calendar, Zap, RefreshCw, ArrowLeft,
  CheckCircle, XCircle, Clock, Eye, Loader2, ChevronRight,
  BookOpen, TrendingUp, Globe, AlertCircle, Plus, FileText
} from "lucide-react";

type Idea = {
  id: string; keyword: string; searchVolume: string; difficulty: string;
  intent: string; suggestedTitle: string; suggestedAngle: string;
  category: string; whyItWillRank: string; status: string; scheduledFor?: string;
  blogId?: string;
};

const CATEGORIES = ["All", "Business Setup", "Tax", "VAT", "Audit", "Finance Trade", "Finance", "Legal", "Technology"];
const VOLUMES = { High: "bg-green-100 text-green-700", Medium: "bg-amber-100 text-amber-700", Low: "bg-gray-100 text-gray-600" };
const DIFFICULTIES = { Easy: "bg-green-100 text-green-700", Medium: "bg-amber-100 text-amber-700", Hard: "bg-red-100 text-red-700" };

export default function AutopilotPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [writingId, setWritingId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("idea");
  const [genCategory, setGenCategory] = useState("UAE Business Setup");
  const [genCount, setGenCount] = useState(8);
  const [successMsg, setSuccessMsg] = useState("");
  const [tab, setTab] = useState<"ideas" | "calendar">("ideas");

  useEffect(() => { fetchIdeas(); }, []);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/seo-agent/keyword-ideas");
      if (res.ok) setIdeas(await res.json());
    } catch {} finally {
      setLoading(false);
    }
  };

  const generateIdeas = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/seo-agent/keyword-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: genCategory, count: genCount }),
      });
      const data = await res.json();
      if (data.ideas) {
        setIdeas(prev => [...data.ideas, ...prev]);
        setSuccessMsg(`✅ ${data.ideas.length} new keyword ideas found!`);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Failed to research keywords");
    } finally {
      setGenerating(false);
    }
  };

  const writeArticle = async (idea: Idea) => {
    if (!confirm(`Generate full article for:\n"${idea.suggestedTitle}"?\n\nThis will create a draft blog post.`)) return;
    setWritingId(idea.id);
    try {
      const res = await fetch("/api/seo-agent/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-keyword-id": idea.id },
        body: JSON.stringify({
          keyword: idea.keyword,
          title: idea.suggestedTitle,
          angle: idea.suggestedAngle,
          category: idea.category,
        }),
      });
      const data = await res.json();
      if (data.blog) {
        setSuccessMsg(`✅ Article created! SEO Score: ${data.seoScore}/100`);
        setTimeout(() => setSuccessMsg(""), 5000);
        fetchIdeas();
      }
    } catch {
      alert("Failed to generate article");
    } finally {
      setWritingId(null);
    }
  };

  const updateIdeaStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/seo-agent/keyword-ideas", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setIdeas(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    } catch {}
  };

  const filtered = ideas.filter(i => {
    if (filterCat !== "All" && i.category !== filterCat) return false;
    if (filterStatus !== "all" && i.status !== filterStatus) return false;
    return true;
  });

  const scheduled = ideas.filter(i => i.status === "scheduled" && i.scheduledFor);
  const stats = {
    total: ideas.length,
    ideas: ideas.filter(i => i.status === "idea").length,
    published: ideas.filter(i => i.status === "published").length,
    scheduled: ideas.filter(i => i.status === "scheduled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-gray-400 hover:text-navy transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-blue to-sky-blue flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-navy">SEO Autopilot</h1>
                <p className="text-xs text-gray-500">AI-powered Research & Content Engine</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {successMsg && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold border border-green-100 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> {successMsg}
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Ideas", value: stats.total, icon: Sparkles, color: "text-royal-blue", bg: "bg-blue-50" },
            { label: "Ready to Write", value: stats.ideas, icon: BookOpen, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Scheduled", value: stats.scheduled, icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
            { label: "AI Published", value: stats.published, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-navy">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Generate Ideas Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-navy via-royal-blue to-sky-blue rounded-3xl p-8 shadow-xl text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <Sparkles className="w-48 h-48" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
              <Search className="w-6 h-6 text-sky-blue" />
              Discover Content Gaps
            </h2>
            <p className="text-white/80 mb-6">
              Gemini will scan recent UAE search trends and your existing blog titles to find 
              high-intent topics you haven't covered yet.
            </p>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[280px]">
                <label className="text-xs font-black text-sky-blue uppercase tracking-widest block mb-2">Category Focus</label>
                <input
                  value={genCategory}
                  onChange={e => setGenCategory(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all text-sm"
                  placeholder="e.g. Dubai Real Estate Tax, VAT 2025 updates"
                />
              </div>
              <div className="w-32">
                <label className="text-xs font-black text-sky-blue uppercase tracking-widest block mb-2">Goal Count</label>
                <select value={genCount} onChange={e => setGenCount(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none text-sm cursor-pointer">
                  {[5, 10, 15, 20].map(n => <option key={n} value={n} className="text-navy">{n} Ideas</option>)}
                </select>
              </div>
              <button 
                onClick={generateIdeas} 
                disabled={generating}
                className="bg-white text-navy font-black px-8 py-3 rounded-xl hover:bg-sky-blue hover:text-white transition-all disabled:opacity-50 flex items-center gap-2 group shadow-lg"
              >
                {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />}
                {generating ? "Researching..." : "Research Topics"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters and Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-2">
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
            {[{ id: "ideas", label: "Opportunity Grid" }, { id: "calendar", label: "Publish Queue" }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id as any)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === t.id ? "bg-navy text-white shadow-md shadow-navy/20" : "text-gray-500 hover:text-navy"}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setFilterCat(c)}
                className={`text-xs px-4 py-2 rounded-full font-bold transition-all border ${filterCat === c ? "bg-royal-blue border-royal-blue text-white shadow-md" : "bg-white border-gray-200 text-gray-600 hover:border-royal-blue"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {tab === "ideas" && (
          <div className="space-y-4">
            <div className="flex gap-2 mb-2">
              {["idea", "scheduled", "published", "all"].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all capitalize ${filterStatus === s ? "bg-gray-800 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                  {s === "all" ? "All History" : s}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Loader2 className="w-10 h-10 animate-spin text-royal-blue mb-4" />
                <p className="font-bold text-gray-400">Loading your content pipeline...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <TrendingUp className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-black text-xl mb-2">All opportunities cleared!</p>
                <p className="text-gray-400 max-w-sm mx-auto">Click the Research button above to find new topics specifically for the BWMC audience.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filtered.map((idea, i) => (
                  <motion.div 
                    key={idea.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-white rounded-2xl shadow-sm border p-6 transition-all hover:shadow-md ${idea.status === "published" ? "border-green-100 bg-green-50/20" : "border-gray-100"}`}
                  >
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black tracking-widest uppercase text-royal-blue bg-royal-blue/10 px-2 py-1 rounded">
                            {idea.keyword}
                          </span>
                          <span className={`text-[10px] items-center gap-1 font-black px-2 py-1 rounded uppercase tracking-widest ${(VOLUMES as any)[idea.searchVolume] || "bg-gray-100 text-gray-600"}`}>
                            {idea.searchVolume} Vol
                          </span>
                          <span className={`text-[10px] items-center gap-1 font-black px-2 py-1 rounded uppercase tracking-widest ${(DIFFICULTIES as any)[idea.difficulty] || "bg-gray-100 text-gray-600"}`}>
                            {idea.difficulty} Diff
                          </span>
                          <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-2 py-1 rounded uppercase tracking-widest">{idea.category}</span>
                          {idea.status === "published" && (
                            <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Published
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-navy text-lg leading-tight">{idea.suggestedTitle}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{idea.suggestedAngle}</p>
                        <div className="flex items-center gap-2 py-2 px-3 bg-blue-50/50 rounded-xl w-fit">
                          <AlertCircle className="w-4 h-4 text-royal-blue" />
                          <p className="text-xs text-royal-blue font-bold italic">{idea.whyItWillRank}</p>
                        </div>
                      </div>
                      <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-48 shrink-0">
                        {idea.status === "idea" && (
                          <>
                            <button 
                              onClick={() => writeArticle(idea)} 
                              disabled={writingId === idea.id}
                              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white text-sm font-black py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                            >
                              {writingId === idea.id
                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Writing...</>
                                : <><Zap className="w-4 h-4" /> AI Generate Article</>
                              }
                            </button>
                            <button 
                              onClick={() => updateIdeaStatus(idea.id, "rejected")}
                              className="flex items-center justify-center gap-2 text-xs text-gray-400 font-bold hover:text-red-500 transition-colors py-2"
                            >
                              Discard Idea
                            </button>
                          </>
                        )}
                        {idea.status === "published" && (
                          <div className="w-full space-y-2">
                             <Link href="/admin" className="flex items-center justify-center gap-2 w-full text-sm text-green-700 font-black bg-green-100 px-4 py-4 rounded-xl hover:bg-green-200 transition-all border border-green-200">
                                <Eye className="w-4 h-4" /> View in Dashboard
                             </Link>
                             <p className="text-[10px] text-center text-gray-400 font-bold">Successfully generated and published</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "calendar" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-navy">Content Pipeline</h2>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upcoming Auto-Posts</p>
            </div>
            {scheduled.length === 0 ? (
              <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="font-bold text-lg">Queue is empty</p>
                <p className="text-sm max-w-xs mx-auto mt-2">Scale your content velocity by researching and generating articles daily.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {scheduled
                  .sort((a, b) => new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime())
                  .map(idea => (
                    <div key={idea.id} className="group flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-6 py-4 text-center min-w-24 group-hover:bg-navy group-hover:text-white transition-colors">
                        <p className="text-xs font-black uppercase tracking-widest">{new Date(idea.scheduledFor!).toLocaleDateString("en-GB", { month: "short" })}</p>
                        <p className="text-3xl font-black">{new Date(idea.scheduledFor!).getDate()}</p>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="font-bold text-navy text-lg leading-snug">{idea.suggestedTitle}</p>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                          <span className="text-xs font-bold text-royal-blue bg-royal-blue/5 px-2 py-1 rounded">{idea.keyword}</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{idea.category}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => writeArticle(idea)} 
                        disabled={writingId === idea.id}
                        className="text-sm bg-navy text-white px-6 py-3 rounded-xl font-black shadow-lg shadow-navy/20 hover:scale-105 transition-all disabled:opacity-50"
                      >
                        {writingId === idea.id ? "Writing..." : "Write Now"}
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
