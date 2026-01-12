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
        let blogs = await kv.get("blogs");
        if (!blogs) {
            const fileContents = fs.readFileSync(blogsFilePath, "utf8");
            const data = JSON.parse(fileContents);
            blogs = data.blogs || [];
            await kv.set("blogs", blogs);
        }
        return blogs as any[];
    } catch (error) {
        // Fallback
        const fileContents = fs.readFileSync(blogsFilePath, "utf8");
        return JSON.parse(fileContents).blogs;
    }
}

// GET single blog
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const blogs = await getBlogs();
        const blog = blogs.find((b: any) => b.id === id);

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}

// PUT update blog
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const blogs = await getBlogs();
        const index = blogs.findIndex((b: any) => b.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        blogs[index] = {
            ...blogs[index],
            ...body,
            updatedAt: new Date().toISOString(),
        };

        if (process.env.NODE_ENV === 'development') {
            try {
                fs.writeFileSync(blogsFilePath, JSON.stringify({ blogs }, null, 2));
            } catch (fsError) {
                console.error("Failed to write to local file:", fsError);
            }
        }

        try {
            await kv.set("blogs", blogs);
        } catch (error) {
            console.warn("KV update failed:", error);
        }

        return NextResponse.json(blogs[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

// DELETE blog
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const blogs = await getBlogs();
        const filteredBlogs = blogs.filter((b: any) => b.id !== id);

        if (filteredBlogs.length === blogs.length) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        if (process.env.NODE_ENV === 'development') {
            try {
                fs.writeFileSync(blogsFilePath, JSON.stringify({ blogs: filteredBlogs }, null, 2));
            } catch (fsError) {
                console.error("Failed to write to local file:", fsError);
            }
        }

        try {
            await kv.set("blogs", filteredBlogs);
        } catch (error) {
            console.warn("KV delete failed:", error);
        }

        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}
