import { apiClient } from "@/lib/api-client";
import type { PermissionMenu } from "@/features/menu-permission/types";

export const menuPermissionService = {
  getNames: () => apiClient.get<string[]>("/menu-permission/names"),
  getMenus: (username: string) =>
    apiClient.get<PermissionMenu[]>(
      `/menu-permission/menu?username=${encodeURIComponent(username)}`,
    ),
};
