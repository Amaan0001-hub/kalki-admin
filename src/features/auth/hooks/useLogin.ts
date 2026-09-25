import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/constants";
import type { LoginCredentials } from "@/features/auth/types";
import { menuService } from "@/services/menu.service";
import { dashboardService } from "@/services/dashboard.service";

export function useLogin() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: async (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.me });
      
      // Prefetch data for instant dashboard loading
      try {
        await Promise.all([
          queryClient.prefetchQuery({
            queryKey: QUERY_KEYS.menu,
            queryFn: menuService.getMenu,
          }),
          queryClient.prefetchQuery({
            queryKey: QUERY_KEYS.dashboard.summary,
            queryFn: dashboardService.getSummary,
          }),
        ]);
      } catch (error) {
        console.error("Prefetch error:", error);
        // Continue with redirect even if prefetch fails
      }
      
      // Redirect to the page the user was trying to access, or dashboard
      const from = searchParams.get("from");
      router.push(from || "/dashboard");
      router.refresh();
    },
  });
}
