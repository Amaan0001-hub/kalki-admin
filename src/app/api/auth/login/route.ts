import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { createBackendClient } from "@/lib/backend-client";

interface BackendAdminUser {
  adminUserId?: string | number;
  id?: string | number;
  name?: string;
  adminName?: string;
  email?: string;
  authLogin?: string;
  role?: string | string[];
  roles?: string[];
  sub?: string;
}

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  adminUserId?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getUserFromToken(token: string, username: string): BackendAdminUser {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      throw new Error("JWT payload is missing");
    }

    const claims: unknown = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    if (!isRecord(claims)) {
      throw new Error("JWT payload is invalid");
    }

    const name =
      claims.name ??
      claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ??
      claims.sub;
    const role =
      claims.role ??
      claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return {
      id: typeof claims.sub === "string" ? claims.sub : username,
      name: typeof name === "string" ? name : username,
      role: typeof role === "string" ? role : undefined,
    };
  } catch {
    return { id: username, name: username };
  }
}

function normalizeUser(user: BackendAdminUser): AuthenticatedUser {
  const adminUserId = user.adminUserId;
  const login = user.authLogin ?? user.email ?? user.sub ?? "";
  const roles = user.roles ?? user.role ?? [];

  return {
    id: String(adminUserId ?? user.id ?? login),
    name: (user.name ?? user.adminName ?? login) || "Admin",
    email: user.email ?? user.authLogin ?? "",
    roles: (Array.isArray(roles) ? roles : [roles]).filter(
      (role): role is string => typeof role === "string",
    ),
    ...(adminUserId !== undefined
      ? { adminUserId: String(adminUserId) }
      : {}),
  };
}

/**
 * POST /api/auth/login
 *
 * Proxies credentials to the .NET backend and stores its access token in an
 * HttpOnly cookie. The token is never returned in the browser response.
 */
export async function POST(request: NextRequest) {
  const { SESSION_COOKIE_NAME } = getServerEnv();
  const body = await request.json().catch(() => null);

  if (!body?.username || !body?.password) {
    return NextResponse.json(
      { success: false, message: "Username and password are required" },
      { status: 400 },
    );
  }

  try {
    const backend = createBackendClient();
    const { data: responseData } = await backend.post<unknown>(
      "/AdminAuthentication/adminLogin",
      {
        username: body.username,
        password: body.password,
      },
    );

    if (!isRecord(responseData)) {
      return NextResponse.json(
        { success: false, message: "Invalid response from authentication server" },
        { status: 502 },
      );
    }

    if (
      responseData.success === false ||
      (typeof responseData.statusCode === "number" &&
        responseData.statusCode >= 400)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            typeof responseData.message === "string"
              ? responseData.message
              : "Invalid username or password",
        },
        { status: 401 },
      );
    }

    const token =
      typeof responseData.token === "string" ? responseData.token : "";
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication server did not return an access token",
        },
        { status: 502 },
      );
    }

    const backendUser = isRecord(responseData.data)
      ? (responseData.data as BackendAdminUser)
      : getUserFromToken(token, body.username);
    const user = normalizeUser(backendUser);
    const response = NextResponse.json(user);
    const sessionData = JSON.stringify({ token, userData: user });

    response.cookies.set(SESSION_COOKIE_NAME, sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    const status =
      isRecord(error) &&
      isRecord(error.response) &&
      typeof error.response.status === "number" &&
      error.response.status >= 400 &&
      error.response.status < 500
        ? error.response.status
        : 502;
    const responseData =
      isRecord(error) && isRecord(error.response)
        ? error.response.data
        : undefined;
    const message =
      isRecord(responseData) && typeof responseData.message === "string"
        ? responseData.message
        : "Authentication failed";

    return NextResponse.json({ success: false, message }, { status });
  }
}
