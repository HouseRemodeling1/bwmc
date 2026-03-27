import { NextRequest, NextResponse } from "next/server";
import { getBlogs, saveBlogs, deleteBlog, Blog } from "@/lib/blogs";
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

        // Normalize authorId: convert empty string or undefined to null
        if (body.authorId === "" || body.authorId === undefined) {
            body.authorId = null;
        }
        
        // We still need current blog to know the old slug for revalidation
        const blogs = await getBlogs();
        const existingBlog = blogs.find((b: Blog) => b.id === id);

        if (!existingBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        const oldSlug = existingBlog.slug;

        const updatedBlog: Blog = {
            ...existingBlog,
            ...body,
            id, // Ensure ID doesn't change
            updatedAt: new Date().toISOString(),
        };

        // saveBlogs handles upsert
        await saveBlogs([updatedBlog]);

        // Revalidate
        revalidatePath("/blog");
        revalidatePath(`/blog/${oldSlug}`);
        if (body.slug && body.slug !== oldSlug) {
            revalidatePath(`/blog/${body.slug}`);
        }
        revalidatePath("/admin");

        // If newly published, ping search engines
        if (updatedBlog.published && !existingBlog.published && updatedBlog.slug) {
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://bwmc.ae"}/api/seo-agent/ping-google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug: updatedBlog.slug }),
            }).catch(() => {});
        }

        return NextResponse.json(updatedBlog);
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

        await deleteBlog(id);

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
