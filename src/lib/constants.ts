
export const APP_ROUTES = {
  home: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",
  profile: "/profile",
  users: "/users",
  transactions: "/transactions",
  settings: "/settings",
} as const;

export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
  },
  menu: ["menu"] as const,
  dashboard: {
    summary: ["dashboard", "summary"] as const,
  },
  users: {
    all: ["users"] as const,
    detail: (id: string) => ["users", id] as const,
  },
  transactions: {
    all: ["transactions"] as const,
    detail: (id: string) => ["transactions", id] as const,
  },
} as const;

export const DEFAULT_PAGE_SIZE = 20;
