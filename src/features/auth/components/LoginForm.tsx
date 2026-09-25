"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schema";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import { useState } from "react";

/**
 * Custom styled login form matching the KALKII admin design
 */
export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = form.handleSubmit((values) => {
    login.mutate(values);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-900 p-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <img 
              src="/logos/icon.jpg" 
              alt="KALKII Logo" 
              className="h-10 w-15 rounded"
            />
            <h1 className="text-2xl font-bold text-white tracking-wider">KALK<span className="text-yellow-400">II</span></h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 tracking-widest">ADMIN CONTROL PANEL</p>
         
        </div>

        {/* Form Section */}
        <div className="p-6 space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                {...form.register("username")}
                type="text"
                autoComplete="username"
                placeholder="Enter Username"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                {...form.register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter Password"
                className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={login.isPending}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {login.isPending ? (
              "Signing in..."
            ) : (
              <>
                Sign in to Dashboard
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Error Message */}
          {login.isError && (
            <p className="text-center text-sm text-red-600">
              Invalid email or password.
            </p>
          )}

          {/* Encrypted Notice */}
          <p className="text-center text-xs text-slate-500">
            Encrypted - Powering the Future of Wealth
          </p>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>admin@kalkii.io</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure login area</span>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
