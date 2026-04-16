export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  username?: string;
  password_hash?: string;
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

/**
 * Helper to ensure names are always displayed as full names
 */
export function transformAuthor(author: Author): Author {
  const nameMap: Record<string, string> = {
    "Auf": "Abdul Rahman Auf",
    "Barkha": "Barkha Singh",
    "Nancy": "Nancy",
  };

  if (nameMap[author.name]) {
    return { ...author, name: nameMap[author.name] };
  }
  return author;
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/authors?select=id,name,bio,avatar,role,username,linkedin,twitter,instagram,website,createdAt&order=createdAt.desc`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch authors: ${await res.text()}`);
    const data: Author[] = await res.json();
    return data.map(transformAuthor);
  } catch (error) {
    console.error("getAuthors error:", error);
    return [];
  }
}

export async function getAuthorById(id: string): Promise<Author | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/authors?id=eq.${id}&select=id,name,bio,avatar,role,username,linkedin,twitter,instagram,website,createdAt`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] ? transformAuthor(data[0]) : null;
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
  return data[0] ? transformAuthor(data[0]) : data[0];
}

export async function deleteAuthor(id: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/authors?id=eq.${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error(`Failed to delete author: ${await res.text()}`);
}

// Find author by username (for login) - returns with password_hash
export async function getAuthorByUsername(username: string): Promise<Author | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/authors?username=eq.${encodeURIComponent(username)}&select=*`,
      { headers: headers(), cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] ? transformAuthor(data[0]) : null;
  } catch (error) {
    console.error(`getAuthorByUsername(${username}) error:`, error);
    return null;
  }
}

// Create/validate author session token
export async function createAuthorSession(authorId: string): Promise<string> {
  const token = crypto.randomUUID() + crypto.randomUUID();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/author_sessions`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ id: crypto.randomUUID(), authorId, token }),
  });
  if (!res.ok) throw new Error("Failed to create session");
  return token;
}

export async function getAuthorBySessionToken(token: string): Promise<Author | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/author_sessions?token=eq.${token}&select=authorId,expiresAt`,
      { headers: headers(), cache: "no-store" }
    );
    if (!res.ok) return null;
    const sessions = await res.json();
    if (!sessions[0]) return null;
    
    // Check expiry
    if (new Date(sessions[0].expiresAt) < new Date()) return null;
    
    return getAuthorById(sessions[0].authorId);
  } catch (error) {
    console.error(`getAuthorBySessionToken error:`, error);
    return null;
  }
}

export async function deleteAuthorSession(token: string): Promise<void> {
  await fetch(`${SUPABASE_URL}/rest/v1/author_sessions?token=eq.${token}`, {
    method: "DELETE",
    headers: headers(),
  });
}
