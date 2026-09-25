import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { createBackendClient } from "@/lib/backend-client";

/**
 * POST /api/auth/login
 *
 * Proxies credentials to the .NET backend and, on success, sets the session
 * token as an HttpOnly cookie. The token itself is never returned to the
 * browser in the JSON body — only the non-sensitive user profile is.
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
    const { data } = await backend.post("/AdminAuthentication/adminLogin", {
      username: body.username,
      password: body.password,
    });

    // Backend returns: { statusCode, message, token, data: { role, authLogin } }
    const { token, data: userData, statusCode, message } = data;

    const response = NextResponse.json({
      statusCode,
      message,
      token,
      data: userData,
    });
    
    // Store both token and userData in the cookie
    const sessionData = JSON.stringify({
      token,
      userData,
    });
    
    response.cookies.set(SESSION_COOKIE_NAME, sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 },
    );
  }
}
