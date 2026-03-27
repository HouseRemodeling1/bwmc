import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthorBySessionToken } from "@/lib/authors";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("author-session")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const author = await getAuthorBySessionToken(token);
    
    if (!author) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    return NextResponse.json({ author });
  } catch (error) {
    console.error("Session Check Error:", error);
    return NextResponse.json({ error: "An error occurred checking session" }, { status: 500 });
  }
}
