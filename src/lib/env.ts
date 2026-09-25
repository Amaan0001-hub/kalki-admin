/**
 * Centralized, validated environment variable access.
 *
 * Import from this file instead of reading `process.env` directly anywhere
 * else in the codebase. This keeps server-only secrets (like the backend
 * API URL) from ever being accidentally referenced in client components.
 */
import { z } from "zod";

const serverEnvSchema = z.object({
  BACKEND_API_URL: z.string().url(),
  AUTH_SECRET: z.string().min(1),
  SESSION_COOKIE_NAME: z.string().min(1).default("session_token"),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("App"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

/**
 * Server-only environment variables.
 * NEVER import this file into a "use client" component.
 */
export function getServerEnv() {
  const parsed = serverEnvSchema.safeParse({
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid server environment variables: ${parsed.error.message}`,
    );
  }

  return parsed.data;
}

/**
 * Public environment variables, safe to use in client components.
 */
export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
