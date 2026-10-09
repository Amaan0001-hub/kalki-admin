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

export default function ChangeAdminPassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Static data pre-filled
  const username = "RvnrrAdmin";
  const [currentPassword, setCurrentPassword] = useState("dummyPassword123");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      alert("Please enter a new password!");
      return;
    }
    alert("Admin password changed successfully!");
  };

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-4">

        {/* 1. Page Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 mb-2 shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Change Admin Password</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
            Update your account password securely
          </p>
        </div>

        {/* 2. Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">

          {/* Card Header - KALKII Gold */}
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Password Settings
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Enter your credentials to change password
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>

              {/* Row 1: Username & Current Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">

                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Username *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      disabled
                      value={username}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Current Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" /> Current Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: New Password */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#D4AF37]" /> New Password *
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
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
              <div className="mb-5 rounded-lg border border-gray-200 bg-[#FAF6EC]/60 p-4">
                <h4 className="text-xs font-bold text-gray-700 mb-2">Password Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> Minimum 8 characters
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> At least one uppercase letter
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> At least one lowercase letter
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> At least one number
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" /> At least one special character
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition"
                >
                  <ArrowRight className="w-4 h-4" />
                  Change Admin Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. Security Tip Box */}
        <div className="bg-[#FFF9E6] border border-[#D4AF37]/30 rounded-xl p-5 flex gap-4 w-full">
          <div className="shrink-0 rounded-full bg-[#D4AF37]/20 p-1.5">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">Security Tip</h4>
            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
              <li>Never share your password with anyone</li>
              <li>Use a unique password that you don&apos;t use elsewhere</li>
              <li>Change your password regularly for better security</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}