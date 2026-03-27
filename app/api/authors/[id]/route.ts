import { NextRequest, NextResponse } from "next/server";
import { saveAuthor, deleteAuthor } from "@/lib/authors";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const author = await saveAuthor({ ...body, id });
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
