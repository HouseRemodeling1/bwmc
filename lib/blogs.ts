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
  authorId?: string;
  keywords?: string[];
  relatedPosts?: string[];
  relatedServices?: string[];
  createdAt: string;
  updatedAt: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function supabaseHeaders() {
  return {
    "Content-Type": "application/json",
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Prefer": "return=representation",
  };
}

// GET all blogs
export async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs?order=createdAt.desc`, {
      headers: supabaseHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${await res.text()}`);
    return res.json();
  } catch (error) {
    console.error("getBlogs error:", error);
    return [];
  }
}

// UPSERT (insert or update) blogs
export async function saveBlogs(blogs: Blog[]): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs`, {
    method: "POST",
    headers: {
      ...supabaseHeaders(),
      "Prefer": "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(blogs),
  });
  if (!res.ok) throw new Error(`Failed to save blogs: ${await res.text()}`);
}

// DELETE a blog by id
export async function deleteBlog(id: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blogs?id=eq.${id}`, {
    method: "DELETE",
    headers: supabaseHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to delete blog: ${await res.text()}`);
}
