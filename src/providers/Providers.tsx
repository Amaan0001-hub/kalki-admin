"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "@/providers/QueryProvider";
import { ToastViewport } from "@/components/ui/ToastViewport";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <ToastViewport />
    </QueryProvider>
  );
}
