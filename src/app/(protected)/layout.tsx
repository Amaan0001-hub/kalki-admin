import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Footer } from "@/components/layout/Footer";


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA]">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <MobileSidebar />
        <main className="flex-1 p-6 bg-[#F8F9FA]">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
