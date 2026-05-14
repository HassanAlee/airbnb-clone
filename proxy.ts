import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(async function proxy() {}, {
  // Proxy still runs on all routes, but doesn't protect the home route
  publicPaths: ["/", "/api/auth/.*"],
});

// middleware.ts - make sure auth routes are excluded
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
