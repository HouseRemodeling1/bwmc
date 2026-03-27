import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBlogs } from "@/lib/blogs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { title, excerpt, content, category, slug } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "title and content required" }, { status: 400 });
  }

  // Fetch existing blogs for internal linking suggestions
  const existingBlogs = await getBlogs();
  const publishedTitles = existingBlogs
    .filter(b => b.published && b.slug !== slug)
    .map(b => ({ title: b.title, slug: b.slug, category: b.category }))
    .slice(0, 20);

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an expert SEO specialist for BWMC, a UAE business consultancy based in Dubai.
Analyze this blog post and return ONLY a valid JSON object, no markdown:

Title: ${title}
Category: ${category}
Excerpt: ${excerpt}
Content (first 3000 chars): ${content.substring(0, 3000)}

Existing blog posts for internal linking:
${JSON.stringify(publishedTitles)}

Return this exact JSON structure:
{
  "metaTitle": "SEO title under 60 characters including primary keyword",
  "metaDescription": "Compelling meta description under 155 characters with CTA",
  "focusKeyword": "single most important keyword phrase",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "slug": "seo-friendly-url-slug",
  "ogImage": "suggest a descriptive alt text for the cover image",
  "readingTime": reading_time_minutes_as_number,
  "seoScore": score_0_to_100,
  "seoIssues": [
    "specific issue 1 to fix",
    "specific issue 2 to fix"
  ],
  "seoPassed": [
    "what is already good 1",
    "what is already good 2"
  ],
  "internalLinks": [
    {
      "suggestedText": "anchor text to use in the article",
      "slug": "existing-blog-slug",
      "title": "existing blog title",
      "reason": "why this is relevant"
    }
  ],
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "full title",
    "description": "excerpt",
    "keywords": "comma separated keywords",
    "articleSection": "${category}",
    "publisher": {
      "@type": "Organization",
      "name": "BWMC",
      "url": "https://bwmc.ae"
    }
  },
  "improvedExcerpt": "a better version of the excerpt if needed",
  "contentSuggestions": [
    "Add an H2 section about...",
    "Include a FAQ section on..."
  ]
}

SEO scoring rules:
- Title has focus keyword: +15
- Meta description under 155 chars: +10
- Content over 800 words: +15
- Has numbered/bullet lists: +10
- Has H2/H3 headings in content: +15
- Focus keyword in first paragraph: +10
- Internal linking opportunities found: +10
- Category is specific: +5
- Slug is clean and has keyword: +10
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleaned = text.replace(/^```json?\s*/i, "").replace(/\s*```\s*$/, "").trim();
    const seoData = JSON.parse(cleaned);

    return NextResponse.json({ seoData });
  } catch (err) {
    console.error("SEO Agent error:", err);
    return NextResponse.json({ error: "SEO analysis failed" }, { status: 500 });
  }
}
