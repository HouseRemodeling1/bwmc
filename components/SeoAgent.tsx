"use client";
import { useState } from "react";
import { Sparkles, CheckCircle, XCircle, Link2, AlertCircle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

interface SeoData {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string[];
  slug: string;
  readingTime: number;
  seoScore: number;
  seoIssues: string[];
  seoPassed: string[];
  internalLinks: { suggestedText: string; slug: string; title: string; reason: string }[];
  improvedExcerpt: string;
  contentSuggestions: string[];
  structuredData: object;
}

interface Props {
  formData: { title: string; excerpt: string; content: string; category: string; slug: string };
  onApply: (fields: Partial<{
    metaTitle: string; metaDescription: string; keywords: string[];
    slug: string; focusKeyword: string; seoScore: number; readingTime: number; excerpt: string;
  }>) => void;
}

export default function SeoAgent({ formData, onApply }: Props) {
  const [seoData, setSeoData] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [applied, setApplied] = useState(false);

  const scoreColor = (s: number) =>
    s >= 80 ? "text-green-600" : s >= 50 ? "text-amber-500" : "text-red-500";
  const scoreBg = (s: number) =>
    s >= 80 ? "bg-green-100" : s >= 50 ? "bg-amber-100" : "bg-red-100";

  const analyze = async () => {
    if (!formData.title || !formData.content) {
      setError("Please add a title and content first.");
      return;
    }
    setLoading(true);
    setError("");
    setApplied(false);

    try {
      const res = await fetch("/api/seo-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSeoData(data.seoData);
    } catch (e: any) {
      setError(e.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const applyAll = () => {
    if (!seoData) return;
    onApply({
      metaTitle: seoData.metaTitle,
      metaDescription: seoData.metaDescription,
      keywords: seoData.keywords,
      slug: seoData.slug,
      focusKeyword: seoData.focusKeyword,
      seoScore: seoData.seoScore,
      readingTime: seoData.readingTime,
      excerpt: seoData.improvedExcerpt || formData.excerpt,
    });
    setApplied(true);
  };

  return (
    <div className="border border-royal-blue/20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50/50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-royal-blue/5 border-b border-royal-blue/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-royal-blue" />
          <span className="font-bold text-navy">AI SEO Agent</span>
          {seoData && (
            <span className={`text-sm font-black px-2 py-0.5 rounded-full ${scoreBg(seoData.seoScore)} ${scoreColor(seoData.seoScore)}`}>
              {seoData.seoScore}/100
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {seoData && (
            <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-navy">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={analyze}
            disabled={loading}
            className="flex items-center gap-2 bg-royal-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Analyzing..." : seoData ? "Re-analyze" : "Analyze SEO"}
          </button>
        </div>
      </div>

      {!seoData && !loading && !error && (
        <div className="px-5 py-4 text-sm text-gray-500 text-center">
          Click <span className="font-semibold text-royal-blue">"Analyze SEO"</span> to get AI-powered SEO recommendations for your post.
        </div>
      )}

      {error && (
        <div className="px-5 py-3 bg-red-50 text-red-600 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {seoData && expanded && (
        <div className="p-5 space-y-5">
          {/* Score bar */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-gray-700">SEO Score</span>
              <span className={`font-black ${scoreColor(seoData.seoScore)}`}>{seoData.seoScore}/100</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${seoData.seoScore >= 80 ? "bg-green-500" : seoData.seoScore >= 50 ? "bg-amber-400" : "bg-red-500"}`}
                style={{ width: `${seoData.seoScore}%` }}
              />
            </div>
          </div>

          {/* Generated fields */}
          <div className="grid gap-3">
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Meta Title ({seoData.metaTitle.length} chars)</p>
              <p className="text-sm font-semibold text-navy">{seoData.metaTitle}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Meta Description ({seoData.metaDescription.length} chars)</p>
              <p className="text-sm text-gray-600">{seoData.metaDescription}</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white rounded-lg border border-gray-100 p-3 flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Focus Keyword</p>
                <p className="text-sm font-semibold text-royal-blue">{seoData.focusKeyword}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-100 p-3 flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Reading Time</p>
                <p className="text-sm font-semibold text-navy">{seoData.readingTime} min read</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Suggested Slug</p>
              <p className="text-sm font-mono text-gray-600">bwmc.ae/blog/<span className="text-royal-blue font-semibold">{seoData.slug}</span></p>
            </div>
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {seoData.keywords.map(k => (
                  <span key={k} className="px-2 py-0.5 bg-royal-blue/10 text-royal-blue rounded-full text-xs font-medium">{k}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Passed / Issues */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <p className="text-xs font-bold text-green-700 uppercase mb-2">✅ Passing</p>
              {seoData.seoPassed.length === 0 && <p className="text-xs text-green-700 italic">Nothing yet — write more content!</p>}
              {seoData.seoPassed.map((p, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-800">{p}</p>
                </div>
              ))}
            </div>
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <p className="text-xs font-bold text-red-700 uppercase mb-2">⚠️ Fix These</p>
              {seoData.seoIssues.length === 0 && <p className="text-xs text-green-700 italic">All good! No major issues found.</p>}
              {seoData.seoIssues.map((issue, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1">
                  <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-800">{issue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal links */}
          {seoData.internalLinks && seoData.internalLinks.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5" /> Internal Link Suggestions
              </p>
              {seoData.internalLinks.map((link, i) => (
                <div key={i} className="mb-2 p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-navy">Link to: "{link.title}"</p>
                  <p className="text-xs text-gray-500 mt-0.5">Use anchor text: <span className="text-royal-blue italic">"{link.suggestedText}"</span></p>
                  <p className="text-xs text-gray-400 mt-0.5">{link.reason}</p>
                </div>
              ))}
            </div>
          )}

          {/* Content Suggestions */}
          {seoData.contentSuggestions && seoData.contentSuggestions.length > 0 && (
            <div className="bg-amber-50 rounded-lg border border-amber-100 p-3">
              <p className="text-xs font-bold text-amber-700 uppercase mb-2">💡 Content Suggestions</p>
              {seoData.contentSuggestions.map((s, i) => (
                <p key={i} className="text-xs text-amber-800 mb-1">• {s}</p>
              ))}
            </div>
          )}

          {/* Apply button */}
          <button
            onClick={applyAll}
            disabled={applied}
            className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
              applied
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-gradient-to-r from-royal-blue to-sky-blue text-white hover:shadow-lg"
            }`}
          >
            {applied ? "✅ SEO fields applied to your post!" : "⚡ Apply All SEO Suggestions"}
          </button>
        </div>
      )}
    </div>
  );
}
