export interface PermissionMenu {
  id: string;
  name: string;
  subMenus: PermissionSubMenu[];
}

export interface PermissionSubMenu {
  id: string;
  name: string;
  permission: string | null;
}
