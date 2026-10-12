"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { useMenu } from "@/features/menu/hooks/useMenu";
import { useSidebarStore } from "@/store/sidebar.store";
import { useState } from "react";
import type { MenuItem } from "@/services/menu.service";
import { Spinner } from "@/components/ui/Spinner";

export function MobileSidebar() {
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
  const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);
  const { data: menuItems, isLoading, error } = useMenu();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Fallback to empty array while loading or on error
  // Ensure menuItems is an array before using it
  const navItems = Array.isArray(menuItems) ? menuItems : [];

  // Filter out items without href to prevent Link errors
  const validNavItems = navItems.filter((item) => item.href && typeof item.href === 'string');

  const toggleExpanded = (itemId: string | undefined) => {
    if (!itemId) return;
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const itemId = item.id || item.href;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = itemId ? expandedItems.has(itemId) : false;

    return (
      <div key={item.id || item.href || `menu-item-${level}`}>
        {hasChildren ? (
          <div
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium cursor-pointer text-sidebar-foreground hover:bg-sidebar-muted"
            style={{ paddingLeft: `${level * 12 + 12}px` }}
            onClick={() => toggleExpanded(itemId)}
          >
            <span>{item.label}</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        ) : (
          <Link
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="block rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-muted"
            style={{ paddingLeft: `${level * 12 + 12}px` }}
          >
            {item.label}
          </Link>
        )}

        {hasChildren && isExpanded && item.children && (
          <div className="flex flex-col">
            {item.children.map((child: MenuItem) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!isMobileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="w-80 bg-sidebar-bg p-4">
        {/* ============ LOGO SECTION  ============ */}
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/logos/kalki-horizontal-logo.png"
            alt="Kalkii Logo"
            width={112}
            height={112}
            className="w-[7rem] h-auto rounded-md object-contain"
          />

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="rounded-md p-2 hover:bg-sidebar-muted text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* ============ LOGO SECTION END ============ */}

        <nav className="flex flex-col gap-1">
          {isLoading ? (
            <div
              className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-muted-foreground"
              role="status"
              aria-label="Loading menu"
            >
              <Spinner className="h-4 w-4 text-sidebar-muted-foreground" />
              <span>Loading menu...</span>
            </div>
          ) : error ? (
            <div className="px-3 py-2 text-sm text-destructive">Failed to load menu</div>
          ) : (
            validNavItems.map((item) => renderMenuItem(item))
          )}
        </nav>
      </div>
      <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
    </div>
  );
}