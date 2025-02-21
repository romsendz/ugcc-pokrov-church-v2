import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ROUTES } from "@lib/routes";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow unauthenticated users to access /admin/privacy-policy
  if (pathname === ROUTES.admin.privacyPolicy) {
    return NextResponse.next();
  }

  // Protect `/admin` routes - redirect unauthenticated users
  if (!session && pathname.startsWith(ROUTES.admin.index)) {
    return NextResponse.redirect(new URL(ROUTES.auth.signIn, req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
