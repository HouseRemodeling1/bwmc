import fs from "fs";
import path from "path";
import { createClient } from "@vercel/kv";

const kv = createClient({
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const blogsFilePath = path.join(process.cwd(), "public", "data", "blogs.json");

export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    author: string;
    published: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export async function getBlogs(): Promise<Blog[]> {
    try {
        let blogs = await kv.get("blogs");
        if (!blogs) {
            if (fs.existsSync(blogsFilePath)) {
                const fileContents = fs.readFileSync(blogsFilePath, "utf8");
                const data = JSON.parse(fileContents);
                blogs = data.blogs || [];
                // Seeding KV if empty
                try {
                    await kv.set("blogs", blogs);
                } catch (e) {
                    console.warn("Could not seed KV:", e);
                }
            } else {
                blogs = [];
            }
        }
        return blogs as Blog[];
    } catch (error) {
        console.error("Error in getBlogs (KV fail, fallback to local):", error);
        if (fs.existsSync(blogsFilePath)) {
            const fileContents = fs.readFileSync(blogsFilePath, "utf8");
            return JSON.parse(fileContents).blogs || [];
        }
        return [];
    }
}

export async function saveBlogs(blogs: Blog[]) {
    // Production & Development: Always try KV
    try {
        const hasKV = (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) || 
                      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
        
        if (hasKV) {
            await kv.set("blogs", blogs);
        }
    } catch (error) {
        console.error("Failed to save to KV:", error);
        if (process.env.NODE_ENV === 'production') {
            throw new Error("Persistence error: Failed to save to KV database");
        }
    }

    // Local file persistence (Always for consistency if possible, essential for Dev)
    try {
        // Ensure directory exists
        const dir = path.dirname(blogsFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(blogsFilePath, JSON.stringify({ blogs }, null, 2));
    } catch (error) {
        console.error("Failed to save to local file:", error);
    }
}
