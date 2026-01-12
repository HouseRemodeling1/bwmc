import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createClient } from "@vercel/kv";

// Create KV client with fallback to Upstash variables if standard KV vars aren't present
const kv = createClient({
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const blogsFilePath = path.join(process.cwd(), "public", "data", "blogs.json");

// Helper to get blogs (from KV or fallback to file)
async function getBlogs() {
    try {
        // Try to get from KV
        let blogs = await kv.get("blogs");

        // If KV is empty, seed it from the local JSON file
        if (!blogs) {
            console.log("KV is empty, seeding from blogs.json...");
            const fileContents = fs.readFileSync(blogsFilePath, "utf8");
            const data = JSON.parse(fileContents);
            blogs = data.blogs || [];

            // Save to KV for next time
            await kv.set("blogs", blogs);
        }

        return blogs as any[];
    } catch (error) {
        console.error("KV Error:", error);
        // Fallback to file if KV fails (e.g. missing env vars locally)
        const fileContents = fs.readFileSync(blogsFilePath, "utf8");
        return JSON.parse(fileContents).blogs;
    }
}

// GET all blogs
export async function GET() {
    try {
        const blogs = await getBlogs();
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

// POST new blog
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const blogs = await getBlogs();

        const newBlog = {
            id: Date.now().toString(),
            ...body,
            slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        blogs.push(newBlog);

        // Save to KV (Production Persistence)
        // Save to KV (Production Persistence)
        if (process.env.NODE_ENV === 'production') {
            const hasKV = (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
            const hasUpstash = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

            if (!hasKV && !hasUpstash) {
                throw new Error("Vercel KV not configured. Please add KV database in Vercel.");
            }
            try {
                await kv.set("blogs", blogs);
            } catch (kvError) {
                console.error("Vercel KV save failed:", kvError);
                throw new Error("Failed to save to Vercel KV");
            }
        } else {
            // Development: Try KV but don't crash if it fails (likely just testing without credentials)
            try {
                await kv.set("blogs", blogs);
            } catch (e) { /* ignore */ }
        }

        // Save to Local File (Development Persistence)
        // This allows the dashboard to work locally without Vercel KV
        if (process.env.NODE_ENV === 'development') {
            try {
                fs.writeFileSync(blogsFilePath, JSON.stringify({ blogs }, null, 2));
                console.log("Saved blog to local file:", blogsFilePath);
            } catch (fsError) {
                console.error("Failed to write to local file:", fsError);
            }
        }

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error: any) {
        console.error("Create Blog Error:", error);
        return NextResponse.json({ error: error.message || "Failed to create blog" }, { status: 500 });
    }
}
