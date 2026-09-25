import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { createBackendClient } from "@/lib/backend-client";

interface BackendMenuItem {
  menuId: string;
  menuName: string;
  pageName: string;
  menuIcon: string;
  displayOrder: number;
  subMenus: BackendSubMenu[];
}

interface BackendSubMenu {
  subMenuId: string;
  subMenuName: string;
  subMenuPageName: string;
  displayOrder: number;
  hasSubMenuPermission: boolean;
}

interface FrontendMenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  children?: FrontendMenuItem[];
}

/**
 * Transform backend menu structure to frontend format
 */
function transformMenuData(backendMenu: BackendMenuItem[]): FrontendMenuItem[] {
  return backendMenu.map((item) => ({
    id: item.menuId,
    label: item.menuName,
    href: `/${item.pageName}`,
    icon: item.menuIcon,
    children: item.subMenus?.map((subItem) => ({
      id: subItem.subMenuId,
      label: subItem.subMenuName,
      href: `/${subItem.subMenuPageName}`,
      icon: item.menuIcon, // Use parent icon for submenus
    })) || [],
  }));
}

/**
 * GET /api/menu
 *
 * Fetches menu items from the backend using adminUserId from session cookie
 */
export async function GET(request: NextRequest) {
  const { SESSION_COOKIE_NAME } = getServerEnv();
  
  // Get session data from cookie
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie) {
    return NextResponse.json(
      [],
      { status: 401 },
    );
  }

  try {
    const sessionData = JSON.parse(sessionCookie.value);
    const { userData, token } = sessionData;
    
    if (!userData?.adminUserId) {
      return NextResponse.json(
        [],
        { status: 400 },
      );
    }

    const backend = createBackendClient();
    const { data } = await backend.get(`/Menu/getAllMenu?adminUserId=${userData.adminUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    // Ensure we return an array, handle different response structures
    const menuData = Array.isArray(data) ? data : (data?.data || []);
    
    // Transform backend data to frontend format
    const transformedMenu = transformMenuData(menuData as BackendMenuItem[]);
    
    return NextResponse.json(transformedMenu);
  } catch (error) {
    console.error("Menu fetch error:", error);
    return NextResponse.json(
      [],
      { status: 500 },
    );
  }
}
