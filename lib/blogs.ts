import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});

const blogsFilePath = path.join(process.cwd(), "public", "data", "blogs.json");

export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    coverimage: string;
    category: string;
    author: string;
    published: boolean;
    slug: string;
    createdat: string;
    updatedat: string;
    keywords?: string[];
    relatedposts?: string[];
    relatedservices?: string[];
}

export async function getBlogs(): Promise<Blog[]> {
    try {
        const { data, error } = await supabase
            .from("blogs")
            .select("*")
            .order("createdat", { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            // Only seed in development to avoid build hangs
            if (process.env.NODE_ENV === 'development' && fs.existsSync(blogsFilePath)) {
                try {
                    const fileContents = fs.readFileSync(blogsFilePath, "utf8");
                    const localData = JSON.parse(fileContents);
                    const localBlogs = localData.blogs || [];
                    
                    if (localBlogs.length > 0) {
                        console.info("Seeding Supabase with local blogs...");
                        // Map local camelCase to lowercase for seeding
                        const mappedBlogs = localBlogs.map((b: any) => ({
                            id: b.id,
                            title: b.title,
                            excerpt: b.excerpt,
                            content: b.content,
                            coverimage: b.coverImage || b.coverimage,
                            category: b.category,
                            author: b.author,
                            published: b.published,
                            slug: b.slug,
                            createdat: b.createdAt || b.createdat,
                            updatedat: b.updatedAt || b.updatedat,
                            keywords: b.keywords,
                            relatedposts: b.relatedPosts || b.relatedposts,
                            relatedservices: b.relatedServices || b.relatedservices
                        }));
                        await saveBlogs(mappedBlogs);
                        return mappedBlogs;
                    }
                } catch (seedError) {
                    console.error("Seeding failed:", seedError);
                }
            }
            return [];
        }

        return data as Blog[];
    } catch (error: any) {
        console.error("Error in getBlogs:", error);
        
        // Fallback to local data only in development
        if (process.env.NODE_ENV === 'development' && fs.existsSync(blogsFilePath)) {
            try {
                const fileContents = fs.readFileSync(blogsFilePath, "utf8");
                const localBlogs = JSON.parse(fileContents).blogs || [];
                // Map local camelCase to lowercase for fallback
                return localBlogs.map((b: any) => ({
                    id: b.id,
                    title: b.title,
                    excerpt: b.excerpt,
                    content: b.content,
                    coverimage: b.coverImage || b.coverimage,
                    category: b.category,
                    author: b.author,
                    published: b.published,
                    slug: b.slug,
                    createdat: b.createdAt || b.createdat,
                    updatedat: b.updatedAt || b.updatedat,
                    keywords: b.keywords,
                    relatedposts: b.relatedPosts || b.relatedposts,
                    relatedservices: b.relatedServices || b.relatedservices
                }));
            } catch (e) {
                return [];
            }
        }
        
        // In production/build, return empty array to prevent build failure
        return [];
    }
}

export async function saveBlogs(blogs: Blog[]) {
    try {
        if (!supabaseUrl || !supabaseServiceRoleKey) return;

        const { error } = await supabase
            .from("blogs")
            .upsert(blogs, { onConflict: 'id' });

        if (error) throw error;
    } catch (error: any) {
        console.error("Failed to save to Supabase:", error);
        throw new Error(`Persistence error: ${error.message || "Failed to save to Supabase"}. Please ensure you have run the SQL script in Supabase to create the 'blogs' table with lowercase columns.`);
    }

    if (process.env.NODE_ENV === 'development') {
        try {
            const dir = path.dirname(blogsFilePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            // We can keep camelCase in the JSON if we want, but for consistency let's use the new interface
            fs.writeFileSync(blogsFilePath, JSON.stringify({ blogs }, null, 2));
        } catch (error) {
            console.error("Failed to sync to local file:", error);
        }
    }
}

export async function deleteBlog(id: string) {
    try {
        const { error } = await supabase
            .from("blogs")
            .delete()
            .eq("id", id);

        if (error) throw error;
    } catch (error: any) {
        console.error("Failed to delete from Supabase:", error);
        throw new Error(`Persistence error: ${error.message || "Failed to delete from Supabase"}`);
    }
}
