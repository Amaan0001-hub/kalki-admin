import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Footer } from "@/components/layout/Footer";
import { IdleLogout } from "@/components/auth/IdleLogout";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F9FA]">
      <IdleLogout />
      <Sidebar />
      <MobileSidebar />

      <div className="flex min-w-0 flex-1 flex-col h-screen">
        <Navbar />

        {/* Main Content  */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#FAF6EC] p-2 sm:p-4">
          {children}
        </main>

        {/* Footer - */}
        <Footer />
      </div>
    </div>
  );
}