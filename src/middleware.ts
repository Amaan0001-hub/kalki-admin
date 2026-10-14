import { NextResponse, type NextRequest } from "next/server";

/**
 * Lightweight route-protection middleware for single admin access.
 *
 * Rules followed (see architecture spec):
 * - No database queries or heavy API/network requests here.
 * - Reads the access token from the session cookie and checks JWT expiry when
 *   the token is a JWT. Signature validation remains with the backend.
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
  "/bulk-registration",
  "/edit-user",
  "/admin-registration",
  "/all-users",
  "/change-adminuserpassword",
  "/change-password",
  "/change-sponser",
  "/credit-debit-fund",
  "/direct-affilates",
  "/downline-affilates",
  "/download-excel",
  "/gift-users",
  "/intelligent-tree-view",
  "/lvl-open",
  "/manage-news",
  "/mip-package",
  "/new-ticket",
  "/order-history",
  "/roi-history",
  "/roi-request",
  "/statement",
  "/ticket-logs",
  "/top-up-user",
  "/user-login",
  "/wallet-address",
  "/withdrawal-history",
  "/withdrawal-request",
];

const AUTH_PATHS = ["/login", "/forgot-password", "/reset-password"];

function getSessionToken(cookieValue: string | undefined): string | null {
  if (!cookieValue) return null;

  try {
    const session: unknown = JSON.parse(cookieValue);
    if (
      typeof session === "object" &&
      session !== null &&
      "token" in session &&
      typeof session.token === "string" &&
      session.token.trim()
    ) {
      return session.token;
    }
  } catch {
    return null;
  }

  return null;
}

function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) {
    return true;
  }

  try {
    const payload = parts[1];
    if (!payload) return false;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      Math.ceil(normalizedPayload.length / 4) * 4,
      "=",
    );
    const claims: unknown = JSON.parse(atob(paddedPayload));
    if (typeof claims !== "object" || claims === null) return false;

    const expiration = "exp" in claims ? claims.exp : undefined;
    return typeof expiration !== "number" || expiration > Date.now() / 1000;
  } catch {
    return false;
  }
}

function isPathMatch(pathname: string, paths: string[]): boolean {
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const hasValidToken = isTokenValid(getSessionToken(sessionCookie));

  if (isPathMatch(pathname, PROTECTED_PATHS) && !hasValidToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    const response = NextResponse.redirect(loginUrl);
    if (sessionCookie) {
      response.cookies.set(SESSION_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
    }
    return response;
  }

  if (isPathMatch(pathname, AUTH_PATHS) && hasValidToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();
  if (isPathMatch(pathname, AUTH_PATHS) && sessionCookie && !hasValidToken) {
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
