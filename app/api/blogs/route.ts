import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";

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

        // Save to KV
        await kv.set("blogs", blogs);

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.error("Create Blob Error:", error);
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}
