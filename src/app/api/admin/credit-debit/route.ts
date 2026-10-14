import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { createBackendClient } from "@/lib/backend-client";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function getTokenFromRequest(request: NextRequest): string | null {
  const { SESSION_COOKIE_NAME } = getServerEnv();
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return null;
  try {
    const session: unknown = JSON.parse(cookie);
    const token = isRecord(session) ? session.token : undefined;
    return typeof token === "string" && token ? token : null;
  } catch {
    return null;
  }
}

function buildErrorResponse(error: unknown, fallback: string) {
  const rd =
    isRecord(error) && isRecord(error.response) ? error.response.data : undefined;
  const status =
    isRecord(error) &&
    isRecord(error.response) &&
    typeof error.response.status === "number"
      ? error.response.status
      : 502;
  const message =
    isRecord(rd) && typeof rd.message === "string" ? rd.message : fallback;
  return NextResponse.json(
    { message },
    { status: status >= 400 && status < 500 ? status : 502 }
  );
}

// POST /api/admin/credit-debit
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "A valid JSON body is required" },
      { status: 400 }
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { message: "A valid JSON object body is required" },
      { status: 400 }
    );
  }

  const token = getTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const backend = createBackendClient(token);
    const { data } = await backend.post(
      "/AdminManageUser/addCreditAndDebitFund",   // 👈 backend endpoint confirm karo
      body
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Credit/Debit error:", error);
    return buildErrorResponse(error, "Failed to process transaction");
  }
}