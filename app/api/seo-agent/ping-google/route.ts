import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  const url = `https://bwmc.ae/blog/${slug}`;

  try {
    // Ping Google using the Indexing API sitemap notification
    await fetch(
      `https://www.google.com/ping?sitemap=https://bwmc.ae/sitemap.xml`,
      { method: "GET" }
    );

    // Also ping Bing
    await fetch(
      `https://www.bing.com/ping?sitemap=https://bwmc.ae/sitemap.xml`,
      { method: "GET" }
    );

    return NextResponse.json({ 
      success: true, 
      message: `Pinged search engines for ${url}` 
    });
  } catch (err) {
    return NextResponse.json({ error: "Ping failed" }, { status: 500 });
  }
}
