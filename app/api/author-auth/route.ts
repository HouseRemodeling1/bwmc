import { NextRequest, NextResponse } from "next/server";
import { getAuthorByUsername, createAuthorSession, deleteAuthorSession } from "@/lib/authors";
import { createHash } from "crypto";
import { cookies } from "next/headers";

function hashPassword(password: string): string {
  const salt = process.env.ADMIN_PASSWORD || "bwmc-default-salt";
  return createHash("sha256").update(password + salt).digest("hex");
}

// POST — login
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const author = await getAuthorByUsername(username);
    if (!author) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const hash = hashPassword(password);
    if (hash !== author.password_hash) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const token = await createAuthorSession(author.id);

    const cookieStore = await cookies();
    cookieStore.set("author-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ 
      success: true, 
      author: { id: author.id, name: author.name, avatar: author.avatar, role: author.role }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 });
  }
}

// DELETE — logout
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("author-session")?.value;
    if (token) await deleteAuthorSession(token);
    cookieStore.delete("author-session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: "An error occurred during logout" }, { status: 500 });
  }
}
