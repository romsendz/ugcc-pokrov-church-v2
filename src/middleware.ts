import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Allow access to sign-in and sign-up pages for unauthenticated users
      const isAuthPage =
        req.nextUrl.pathname.startsWith("/admin/sign-in") ||
        req.nextUrl.pathname.startsWith("/admin/sign-up");

      if (isAuthPage) {
        return true; // Allow access without authentication
      }

      return !!token; // Allow only authenticated users to other /admin routes
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"], // Protect all /admin routes
};
