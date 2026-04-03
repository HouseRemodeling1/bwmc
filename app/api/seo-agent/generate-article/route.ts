import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBlogs, saveBlogs, Blog } from "@/lib/blogs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function headers() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { keyword, title, angle, category, stylePrompt, authorId } = await req.json();
    const keywordId = req.headers.get("x-keyword-id");

    // Fetch existing blogs for internal linking context
    const existingBlogs = await getBlogs();
    const published = existingBlogs
      .filter(b => b.published)
      .map(b => ({ title: b.title, slug: b.slug }))
      .slice(0, 15);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const systemPrompt = stylePrompt || 
      "Write in a professional, authoritative tone as a senior BWMC consultant in Dubai. Use data and UAE statistics. Sound like a senior BWMC consultant speaking to a CEO. No fluff, only value.";

    const prompt = `
${systemPrompt}

Write a comprehensive, SEO-optimized blog post for BWMC (Bridge Water Management Consultancies), Dubai.

Target Keyword: "${keyword}"
Title: "${title}"
Angle: "${angle}"
Category: ${category}

REQUIREMENTS:
1. Length: Minimum 1500 words.
2. Structure:
   - Start with a compelling hook about a UAE business owner's pain point.
   - Use HTML formatting: <h2>, <h3>, <p>, <ul><li>, <strong>.
   - Include the keyword naturally in the first paragraph, at least 4 H2 headings, and the conclusion.
3. Content:
   - Add specific UAE-specific data, FTA rules, DED/DIFC/ADGM references where relevant.
   - Weave in 2-3 internal links to these existing BWMC articles using <a href="/blog/SLUG">TITLE</a>:
     ${JSON.stringify(published)}
4. Conclusion:
   - End with a clear CTA directing readers to BWMC's services (Business Setup, Tax, Audit).
   - Add an FAQ section (3-4 questions) using <h3> for questions and <p> for answers.

BWMC CTA should mention: Free consultation, strategic growth, and UAE compliance experts.

Return ONLY the HTML content. Do NOT include a title tag or markdown code blocks (unless the prompt asks for it, but here just return raw HTML string).
`;

    const result = await model.generateContent(prompt);
    const content = result.response.text().trim().replace(/^```html\s*/i, "").replace(/\s*```$/, "");

    // Prepare for SEO Agent analysis
    // We'll call our existing SEO Agent logic internally if possible, or just mock the data fetch
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bwmc.ae";
    
    // Simulate SEO Analysis call
    const seoRes = await fetch(`${siteUrl}/api/seo-agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt: angle, content, category, slug: "" }),
    }).catch(() => null);

    const seoData = seoRes?.ok ? (await seoRes.json()).seoData : null;

    // Generate a unique ID and slug
    const blogId = Date.now().toString();
    const slug = (seoData?.slug || title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")) + "-" + Math.random().toString(36).slice(2, 5);

    const newBlog: Blog = {
      id: blogId,
      title: title,
      slug: slug,
      excerpt: seoData?.improvedExcerpt || angle,
      content: content,
      category: category || "Business",
      author: "BWMC Team",
      authorId: authorId || null,
      published: false,
      coverImage: "",
      keywords: seoData?.keywords || [],
      metaTitle: seoData?.metaTitle || title,
      metaDescription: seoData?.metaDescription || angle,
      focusKeyword: seoData?.focusKeyword || keyword,
      seoScore: seoData?.seoScore || 0,
      readingTime: seoData?.readingTime || 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      structuredData: seoData?.structuredData || {},
    };

    // Save as draft
    await saveBlogs([newBlog]);

    // Update keyword idea status if keywordId provided
    if (keywordId) {
      await fetch(`${SUPABASE_URL}/rest/v1/keyword_ideas?id=eq.${keywordId}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({ status: "published", blogId: newBlog.id }),
      });
    }

    return NextResponse.json({ 
      success: true, 
      blog: newBlog,
      seoScore: seoData?.seoScore || 0 
    });

  } catch (error: any) {
    console.error("Generate Article Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
