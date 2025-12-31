import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const blogsFilePath = path.join(process.cwd(), "public", "data", "blogs.json");

function readBlogs() {
    const fileContents = fs.readFileSync(blogsFilePath, "utf8");
    return JSON.parse(fileContents);
}

function writeBlogs(data: any) {
    fs.writeFileSync(blogsFilePath, JSON.stringify(data, null, 2));
}

// GET single blog
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const data = readBlogs();
        const blog = data.blogs.find((b: any) => b.id === params.id);

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
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const data = readBlogs();
        const index = data.blogs.findIndex((b: any) => b.id === params.id);

        if (index === -1) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        data.blogs[index] = {
            ...data.blogs[index],
            ...body,
            updatedAt: new Date().toISOString(),
        };

        writeBlogs(data);
        return NextResponse.json(data.blogs[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

// DELETE blog
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const data = readBlogs();
        const filteredBlogs = data.blogs.filter((b: any) => b.id !== params.id);

        if (filteredBlogs.length === data.blogs.length) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        data.blogs = filteredBlogs;
        writeBlogs(data);

        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}
