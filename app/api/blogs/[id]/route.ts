import { NextRequest, NextResponse } from "next/server";
import { getBlogs, saveBlogs, Blog } from "@/lib/blogs";
import { revalidatePath } from "next/cache";

// GET single blog
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const blogs = await getBlogs();
        const blog = blogs.find((b: Blog) => b.id === id);

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
        const index = blogs.findIndex((b: Blog) => b.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        const oldSlug = blogs[index].slug;

        blogs[index] = {
            ...blogs[index],
            ...body,
            updatedAt: new Date().toISOString(),
        };

        await saveBlogs(blogs);

        // Revalidate
        revalidatePath("/blog");
        revalidatePath(`/blog/${oldSlug}`);
        if (body.slug && body.slug !== oldSlug) {
            revalidatePath(`/blog/${body.slug}`);
        }
        revalidatePath("/admin");

        return NextResponse.json(blogs[index]);
    } catch (error) {
        console.error("Update Blog Error:", error);
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
        const blogToDelete = blogs.find((b: Blog) => b.id === id);
        
        if (!blogToDelete) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        const filteredBlogs = blogs.filter((b: Blog) => b.id !== id);
        await saveBlogs(filteredBlogs);

        // Revalidate
        revalidatePath("/blog");
        revalidatePath(`/blog/${blogToDelete.slug}`);
        revalidatePath("/admin");

        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Delete Blog Error:", error);
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}

