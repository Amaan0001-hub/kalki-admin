import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/constants";

export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearUser();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.me });
      router.push("/login");
      router.refresh();
    },
  });
}
