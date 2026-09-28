"use client";

import { useIdleTimeout } from "@/hooks/useIdleTimeout";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function IdleLogout() {
  const logout = useLogout();

  useIdleTimeout(() => {
    logout.mutate();
  }, 15 * 60_000); // 15 minutes

  return null;
}
