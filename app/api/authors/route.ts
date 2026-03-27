import { NextRequest, NextResponse } from "next/server";
import { getAuthors, saveAuthor } from "@/lib/authors";
import { createHash } from "crypto";

function hashPassword(password: string): string {
  // Use a fallback salt if ADMIN_PASSWORD is not set in dev
  const salt = process.env.ADMIN_PASSWORD || "bwmc-default-salt";
  return createHash("sha256").update(password + salt).digest("hex");
}

export async function GET() {
  try {
    const authors = await getAuthors();
    return NextResponse.json(authors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Explicitly destructure what we want to save, leaving out plain text password
    const authorData: any = {
      name: body.name,
      bio: body.bio || "",
      avatar: body.avatar || "",
      role: body.role || "Writer",
      username: body.username || "",
      linkedin: body.linkedin || "",
      twitter: body.twitter || "",
      instagram: body.instagram || "",
      website: body.website || "",
      id: body.id || crypto.randomUUID()
    };

    // Hash password if provided
    if (body.password) {
      authorData.password_hash = hashPassword(body.password);
    }
    
    const author = await saveAuthor(authorData);
    return NextResponse.json(author, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 });
  }
}
