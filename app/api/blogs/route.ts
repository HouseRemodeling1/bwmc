import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const blogsFilePath = path.join(process.cwd(), "public", "data", "blogs.json");

// Helper to read blogs
function readBlogs() {
    const fileContents = fs.readFileSync(blogsFilePath, "utf8");
    return JSON.parse(fileContents);
}

// Helper to write blogs
function writeBlogs(data: any) {
    fs.writeFileSync(blogsFilePath, JSON.stringify(data, null, 2));
}

// GET all blogs
export async function GET() {
    try {
        const data = readBlogs();
        return NextResponse.json(data.blogs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

// POST new blog
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = readBlogs();

        const newBlog = {
            id: Date.now().toString(),
            ...body,
            slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        data.blogs.push(newBlog);
        writeBlogs(data);

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}
