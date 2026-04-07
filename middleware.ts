import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    // 1. Log or Handle Supabase Session Refresh (important for RLS)
    const supabaseResponse = await updateSession(request);

    // 2. Handle Admin-specific security (custom password session)
    const adminSession = request.cookies.get("admin-session");

    if (request.nextUrl.pathname.startsWith("/admin") &&
        !request.nextUrl.pathname.startsWith("/admin/login")) {
        if (!adminSession || adminSession.value !== "authenticated") {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
