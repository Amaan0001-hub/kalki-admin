import { apiClient } from "@/lib/api-client";
import type { PermissionMenu } from "@/features/menu-permission/types";

export interface AddMenuPermissionPayload {
  SubmenuId: string[];
  UserName: string;
}

export interface AddMenuPermissionResponse {
  statusCode?: number;
  message?: string;
  data?: unknown;
}

export const menuPermissionService = {
  getNames: () => apiClient.get<string[]>("/menu-permission/names"),
  getMenus: (username: string) =>
    apiClient.get<PermissionMenu[]>(
      `/menu-permission/menu?username=${encodeURIComponent(username)}`,
    ),
  addPermission: (payload: AddMenuPermissionPayload) =>
    apiClient.post<AddMenuPermissionResponse, AddMenuPermissionPayload>(
      "/menu-permission/add",
      payload,
    ),
};
