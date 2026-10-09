import { NextResponse, type NextRequest } from "next/server";

/**
 * Lightweight route-protection middleware for single admin access.
 *
 * Rules followed (see architecture spec):
 * - No database queries or heavy API/network requests here.
 * - Only inspects the presence of the session cookie; it does NOT validate
 *   the token's signature/expiry (that stays server-side in Route Handlers /
 *   the .NET backend) to keep this fast on every request.
 * - Redirects unauthenticated users away from protected routes to /login.
 * - Redirects authenticated users away from /login to /dashboard.
 * - All authenticated users (admin only) have access to all protected routes.
 */

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "session_token";

const PROTECTED_PATHS = [
  "/dashboard",
  "/profile",
  "/users",
  "/transactions",
  "/settings",
  "/menu-permission",
  "/all-access",
];

const AUTH_PATHS = ["/login", "/forgot-password", "/reset-password"];

function isPathMatch(pathname: string, paths: string[]): boolean {
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);

  if (isPathMatch(pathname, PROTECTED_PATHS) && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPathMatch(pathname, AUTH_PATHS) && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/users/:path*",
    "/transactions/:path*",
    "/settings/:path*",
    "/menu-permission/:path*",
    "/all-access/:path*",
    "/login",
    "/forgot-password",
    "/reset-password",
  ],
};
