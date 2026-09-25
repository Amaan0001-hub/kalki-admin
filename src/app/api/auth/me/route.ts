import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";

/**
 * GET /api/auth/me
 * Reads the session cookie and (once implemented) validates it against the
 * .NET backend to return the current user's profile.
 */
export async function GET(request: NextRequest) {
  const { SESSION_COOKIE_NAME } = getServerEnv();
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  // Placeholder response. Replace with:
  // const backend = createBackendClient(token);
  // const { data } = await backend.get("/auth/me");
  return NextResponse.json(
    { success: false, message: "Backend integration not implemented yet" },
    { status: 501 },
  );
}
