import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03030D] p-6">

      {/* Main purple glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-950/40
          blur-[160px]
        "
      />

      {/* Blue glow */}
      <div
        className="
          absolute
          -left-32
          top-1/4
          h-[350px]
          w-[350px]
          rounded-full
          bg-blue-700/20
          blur-[130px]
        "
      />

      {/* Orange glow */}
      <div
        className="
          absolute
          -right-32
          bottom-1/4
          h-[350px]
          w-[350px]
          rounded-full
          bg-orange-600/15
          blur-[130px]
        "
      />

      {/* Very subtle center light */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[180px]
          w-[180px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-[80px]
        "
      />

      {/* Login */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>

    </div>
  );
}