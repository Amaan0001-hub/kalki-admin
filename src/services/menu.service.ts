import { apiClient } from "@/lib/api-client";
import type { NavItem } from "@/types/common";

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  children?: MenuItem[];
}

/**
 * Menu service for fetching navigation items from the backend
 */
export const menuService = {
  getMenu: () => apiClient.get<MenuItem[]>("/menu"),
};
