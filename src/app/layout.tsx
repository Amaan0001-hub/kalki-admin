import type { Metadata } from "next";
import { Providers } from "@/providers/Providers";
import { siteConfig } from "@/config/site";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/icons/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
