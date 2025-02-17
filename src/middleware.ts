import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Protect `/admin` routes - redirect unauthenticated users
  if (!session && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
