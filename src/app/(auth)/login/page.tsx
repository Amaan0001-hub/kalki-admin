import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6 relative overflow-hidden">
      {/* Grid background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
