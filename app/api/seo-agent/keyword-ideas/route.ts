import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBlogs } from "@/lib/blogs";

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
    const { category, count = 10 } = await req.json();

    // Get existing blog titles to avoid duplicates
    const existingBlogs = await getBlogs();
    const existingTitles = existingBlogs.map(b => b.title).join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an SEO expert specializing in UAE business content for BWMC (Bridge Water Management Consultancies) in Dubai.

Generate ${count} high-value blog keyword ideas for the category: "${category || "General UAE Business"}"

BWMC services: Business Setup (Mainland/Freezone), VAT Registration, Corporate Tax, Auditing, Accounting, Trademark, CFO Services.
Target audience: entrepreneurs, SMEs, and foreign investors wanting to set up or run a business in UAE.

Avoid these already-published topics:
${existingTitles}

Return ONLY valid JSON array, no markdown:
[
  {
    "keyword": "exact keyword phrase to target",
    "searchVolume": "Low|Medium|High",
    "difficulty": "Easy|Medium|Hard",
    "intent": "Informational|Commercial|Transactional",
    "suggestedTitle": "Compelling blog post title using the keyword",
    "suggestedAngle": "The specific angle or hook to use for this article (2 sentences)",
    "category": "${category || "Business Setup"}",
    "whyItWillRank": "Brief reason this keyword is a good opportunity for BWMC"
  }
]

Focus on:
- UAE-specific long-tail keywords (e.g. "how to set up LLC in Dubai 2025")
- Questions business owners actually Google
- Low competition but high buyer intent keywords
- Mix of evergreen and trending UAE business topics
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleaned = text.replace(/^```json?\s*/i, "").replace(/\s*```\s*$/, "").trim();
    const ideas = JSON.parse(cleaned);

    // Save to Supabase
    const saved = await Promise.all(ideas.map(async (idea: any) => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/keyword_ideas`, {
        method: "POST",
        headers: {
          ...headers(),
          "Prefer": "return=representation",
        },
        body: JSON.stringify({ ...idea }),
      });
      if (!res.ok) {
        console.error("Failed to save idea:", await res.text());
        return null;
      }
      return res.json();
    }));

    return NextResponse.json({ ideas: saved.filter(Boolean).flat() });
  } catch (error: any) {
    console.error("Keyword Ideas Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/keyword_ideas?order=createdAt.desc&status=neq.rejected`,
      {
        headers: headers(),
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch ideas");
    return NextResponse.json(await res.json());
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    const res = await fetch(`${SUPABASE_URL}/rest/v1/keyword_ideas?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        ...headers(),
        "Prefer": "return=representation",
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update idea");
    return NextResponse.json(await res.json());
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
