"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schema";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
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
      <form onSubmit={onSubmit} className="overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Header Section */}
        <div className="bg-slate-900 p-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/logos/kalki-vertical-logo.png"
              alt="KALKII Logo"
              width={100}
              height={88}
              className="h-[5.5rem] w-[100px] max-w-full rounded object-contain"
              priority
            />
            {/* <h1 className="text-2xl font-bold text-white tracking-wider">KALK<span className="text-yellow-400">II</span></h1> */}
          </div>
          <p className="mt-1 text-xs tracking-widest text-slate-400">ADMIN CONTROL PANEL</p>
        </div>

        {/* Form Section */}
        <div className="space-y-5 p-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                {...form.register("username")}
                type="text"
                autoComplete="username"
                placeholder="Enter Username"
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                {...form.register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter Password"
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-12 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900"
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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
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
            <p className="text-center text-sm text-red-600" role="alert">
              {login.error instanceof Error
                ? login.error.message
                : "Unable to sign in. Please check your username and password."}
            </p>
          )}

          {/* Encrypted Notice */}
          <p className="text-center text-xs text-slate-500">
            Encrypted - Powering the Future of Wealth
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
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
