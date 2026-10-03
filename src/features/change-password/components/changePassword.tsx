"use client";

import React, { useState } from "react";
import {
  Shield,
  Lock,
  User,
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function ChangeUserPassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Static data pre-filled
  const userId = "RvnrrAdmin";
  const [currentPassword, setCurrentPassword] = useState("dummyPassword123");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      alert("Please enter a new password!");
      return;
    }
    alert("Password changed successfully!");
  };

  return (
    <div className="flex w-full min-h-screen justify-center bg-[#FAF6EC] p-4 pt-4 font-sans">
      
      {/* Inner Container - Full width */}
      <div className="flex w-full flex-col gap-4">
        
        {/* 1. Page Header */}
        <div className="text-center">
          <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Change User Password</h1>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <ShieldAlert className="h-4 w-4 text-[#D4AF37]" />
            Update your account password securely
          </p>
        </div>

        {/* 2. Main Card - */}
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          
          {/* Card Header - KALKII Gold */}
          <div className="bg-[#D4AF37] px-5 py-3">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
              <Lock className="h-4 w-4" />
              Password Settings
            </h2>
            <p className="mt-0.5 text-[11px] text-gray-800">
              Enter your credentials to change password
            </p>
          </div>

          {/* Card Body */}
          <div className="p-5">
            <form onSubmit={handleSubmit}>
              
              {/* Row 1: User ID & Current Password */}
              <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                
                {/* User ID */}
                <div>
                  <label className="mb-1.5 block flex items-center gap-1.5 text-[11px] font-bold uppercase text-gray-500">
                    <User className="h-3.5 w-3.5 text-[#D4AF37]" /> User ID *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      disabled
                      value={userId}
                      className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-500"
                    />
                  </div>
                </div>

                {/* Current Password */}
                <div>
                  <label className="mb-1.5 block flex items-center gap-1.5 text-[11px] font-bold uppercase text-gray-500">
                    <Lock className="h-3.5 w-3.5 text-[#D4AF37]" /> Current Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: New Password */}
              <div className="mb-5">
                <label className="mb-1.5 block flex items-center gap-1.5 text-[11px] font-bold uppercase text-gray-500">
                  <Key className="h-3.5 w-3.5 text-[#D4AF37]" /> New Password *
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements Box */}
              <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <h4 className="mb-2 text-xs font-bold text-gray-700">Password Requirements:</h4>
                <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> Min 8 characters
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> One uppercase
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> One lowercase
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> One number
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> One special char
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-[#B89328]"
                >
                  <ArrowRight className="h-4 w-4" />
                  Change User Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. Security Tip Box */}
        <div className="flex w-full items-start gap-3 rounded-lg border border-[#D4AF37]/30 bg-[#FFF9E6] p-4">
          <div className="shrink-0 rounded-full bg-[#D4AF37]/20 p-1.5">
            <Shield className="h-4 w-4 text-[#D4AF37]" />
          </div>
          <div>
            <h4 className="mb-1 text-xs font-bold text-gray-800">Security Tip</h4>
            <ul className="space-y-0.5 text-[11px] text-gray-600">
              <li>• Never share your password with anyone</li>
              <li>• Use a unique password that you don&apos;t use elsewhere</li>
              <li>• Change your password regularly for better security</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
}