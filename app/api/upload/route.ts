import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = "blog-images";

export async function POST(req: NextRequest) {
  try {
    // Check env vars first
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error("Missing Supabase env vars:", {
        url: !!SUPABASE_URL,
        key: !!SUPABASE_KEY,
      });
      return NextResponse.json(
        { error: "Server configuration error: missing Supabase credentials" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Basic validation
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max size is 5MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${filePath}`;

    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: buffer,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Supabase Storage Error:", res.status, errorText);
      // Return the actual error so the user/developer can see what's wrong
      let parsed: any = {};
      try { parsed = JSON.parse(errorText); } catch {}
      const message = parsed?.message || parsed?.error || errorText || "Unknown storage error";
      return NextResponse.json(
        { error: `Storage error (${res.status}): ${message}` },
        { status: 500 }
      );
    }

    // Get public URL
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
