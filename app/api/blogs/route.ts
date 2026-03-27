import { NextRequest, NextResponse } from "next/server";
import { getBlogs, saveBlogs, Blog } from "@/lib/blogs";
import { revalidatePath } from "next/cache";

// GET all blogs
export async function GET() {
    try {
        const blogs = await getBlogs();
        return NextResponse.json(blogs);
    } catch (error) {
        console.error("GET Blogs Error:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

// POST new blog
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Normalize authorId: convert empty string or undefined to null
        if (body.authorId === "" || body.authorId === undefined) {
            body.authorId = null;
        }

        const newBlog: Blog = {
            id: Date.now().toString(),
            ...body,
            slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // saveBlogs handles upsert, we just pass the new blog in an array
        await saveBlogs([newBlog]);

        // Revalidate blog pages
        revalidatePath("/blog");
        revalidatePath("/admin");

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error: any) {
        console.error("Create Blog Error:", error);
        return NextResponse.json({ error: error.message || "Failed to create blog" }, { status: 500 });
    }
}


