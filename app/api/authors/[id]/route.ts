import { NextRequest, NextResponse } from "next/server";
import { saveAuthor, deleteAuthor } from "@/lib/authors";
import { createHash } from "crypto";

function hashPassword(password: string): string {
  // Use a fallback salt if ADMIN_PASSWORD is not set in dev
  const salt = process.env.ADMIN_PASSWORD || "bwmc-default-salt";
  return createHash("sha256").update(password + salt).digest("hex");
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updateData: any = {
      id,
      name: body.name,
      bio: body.bio,
      avatar: body.avatar,
      role: body.role,
      username: body.username,
      linkedin: body.linkedin,
      twitter: body.twitter,
      instagram: body.instagram,
      website: body.website,
    };

    // Only update password if a new one is provided
    if (body.password && body.password.trim() !== "") {
      updateData.password_hash = hashPassword(body.password);
    }

    const author = await saveAuthor(updateData);
    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update author" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteAuthor(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete author" }, { status: 500 });
  }
}
