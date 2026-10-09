import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/constants";
import type { LoginCredentials } from "@/features/auth/types";
import { menuService } from "@/services/menu.service";
import { dashboardService } from "@/services/dashboard.service";
import { useToastStore } from "@/store/toast.store";

export function useLogin() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (user) => {
      setUser(user);
      showToast("Login successful");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.me });

      // Prefetch data for instant dashboard loading
      void Promise.all([
        queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.menu,
          queryFn: menuService.getMenu,
        }),
        queryClient.prefetchQuery({
          queryKey: QUERY_KEYS.dashboard.summary,
          queryFn: dashboardService.getSummary,
        }),
      ]).catch((error: unknown) => {
        console.error("Prefetch error:", error);
      });

      router.replace("/dashboard");
      router.refresh();
    },
  });
}
