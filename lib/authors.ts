export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  createdAt: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function headers() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    Prefer: "return=representation",
  };
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/authors?order=createdAt.desc`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch authors: ${await res.text()}`);
    return res.json();
  } catch (error) {
    console.error("getAuthors error:", error);
    return [];
  }
}

export async function getAuthorById(id: string): Promise<Author | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/authors?id=eq.${id}`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] ?? null;
  } catch (error) {
    console.error(`getAuthorById(${id}) error:`, error);
    return null;
  }
}

export async function saveAuthor(author: Partial<Author> & { id?: string }): Promise<Author> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/authors`, {
    method: "POST",
    headers: { ...headers(), Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(author),
  });
  if (!res.ok) throw new Error(`Failed to save author: ${await res.text()}`);
  const data = await res.json();
  return data[0];
}

export async function deleteAuthor(id: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/authors?id=eq.${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error(`Failed to delete author: ${await res.text()}`);
}
