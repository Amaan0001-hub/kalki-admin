import { useQuery } from "@tanstack/react-query";
import { menuService } from "@/services/menu.service";
import { QUERY_KEYS } from "@/lib/constants";

export function useMenu() {
  return useQuery({
    queryKey: QUERY_KEYS.menu,
    queryFn: menuService.getMenu,
  });
}
