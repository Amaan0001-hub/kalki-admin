import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/features/dashboard/services/dashboard.service";
import { QUERY_KEYS } from "@/lib/constants";

export function useDashboardSummary() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.summary,
    queryFn: dashboardService.getSummary,
  });
}