"use client";

import React, { useState } from "react";
import { Users, User, UserPlus, Info } from "lucide-react";

export default function ChangeSponsor() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userError, setUserError] = useState("");
  const [isUserValid, setIsUserValid] = useState(false);

  const [sponsorId, setSponsorId] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  // User ID Instant Validation 
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserId(value);

    if (value.trim().toLowerCase() === "test@gmail.com") {
      setIsUserValid(true);
      setUserName("System Root");
      setUserError("");
    } else {
      setIsUserValid(false);
      setUserName("");
      setSponsorId("");
      setSponsorName("");
      if (value.trim() !== "") {
        setUserError("User not found");
      } else {
        setUserError("");
      }
    }
  };

  // Sponsor ID Instant Validation
  const handleSponsorIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSponsorId(value);

    if (value.trim().toLowerCase() === "sponsor@gmail.com") {
      setSponsorName("Sponsor Root");
    } else {
      setSponsorName("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUserValid) return;
    alert(`Sponsor changed successfully! 
User: ${userName} 
Sponsor ID: ${sponsorId || "Not provided"} 
Level Open: ${isLevelOpen}`);
  };

  return (
    <div className="w-full bg-[#FAF6EC] px-3 sm:px-4 pt-2 pb-4 font-sans flex justify-center items-start">
      
      <div className="w-full flex flex-col gap-4 sm:gap-5">
        
        {/* 1. Page Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D4AF37] text-gray-900 mb-2 sm:mb-3 shadow-sm">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Change Sponsor</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Update sponsor association for any user
          </p>
        </div>

        {/* 2. Main Card - Full Width */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          
          {/* Card Header - KALKII Gold */}
          <div className="bg-[#D4AF37] px-4 sm:px-6 py-3 sm:py-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Sponsor Details</h2>
            <p className="text-gray-800 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
              Enter user and sponsor information below
            </p>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit}>
              
              {/* Section 1: User Information */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="p-1.5 bg-[#FAF6EC] rounded-md text-[#D4AF37]">
                    <User className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                    User Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="min-w-0">
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1.5 sm:mb-2">
                      User ID *
                    </label>
                    <input
                      type="text"
                      value={userId}
                      onChange={handleUserIdChange}
                      placeholder="Enter user ID"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                        userError ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {userError && (
                      <p className="text-red-500 text-xs mt-1.5">{userError}</p>
                    )}
                  </div>
                  <div className="min-w-0">
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1.5 sm:mb-2">
                      User Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={userName}
                      placeholder="User name will appear here"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Sponsor Information */}
              {isUserValid && (
                <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-xl bg-[#FFF9E6] border border-[#D4AF37]/30 animate-in fade-in slide-in-from-top-3 duration-300">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="p-1.5 bg-[#D4AF37]/20 rounded-md text-[#D4AF37]">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                      Sponsor Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="min-w-0">
                      <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1.5 sm:mb-2">
                        Sponsor User ID *
                      </label>
                      <input
                        type="text"
                        value={sponsorId}
                        onChange={handleSponsorIdChange}
                        placeholder="Enter sponsor user ID"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      />
                    </div>
                    <div className="min-w-0">
                      <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1.5 sm:mb-2">
                        Sponsor Name
                      </label>
                      <input
                        type="text"
                        disabled
                        value={sponsorName}
                        placeholder="Sponsor name will appear here"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-2 mt-4 sm:mt-5">
                    <input
                      type="checkbox"
                      id="levelOpen"
                      checked={isLevelOpen}
                      onChange={(e) => setIsLevelOpen(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-[#D4AF37] bg-gray-100 border-gray-300 rounded focus:ring-[#D4AF37] focus:ring-2 cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="levelOpen"
                      className="text-xs sm:text-sm text-gray-700 cursor-pointer select-none leading-relaxed"
                    >
                      Level Open{" "}
                      <span className="text-gray-400 block sm:inline">
                        (Enable this option to open sponsor level)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Button  */}
              <div className="pt-4 sm:pt-6">
                <button
                  type="submit"
                  disabled={!isUserValid}
                  className="w-full flex justify-center items-center px-4 py-2.5 sm:py-3 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Change Sponsor
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. Important Information Box */}
        <div className="bg-[#FFF9E6] border border-[#D4AF37]/30 rounded-xl p-4 sm:p-5 flex gap-3 sm:gap-4 w-full">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-1 sm:mb-1.5">
              Important Information
            </h4>
            <ul className="list-disc list-inside text-[10px] sm:text-xs text-gray-700 space-y-0.5 sm:space-y-1">
              <li>User ID and Sponsor ID cannot be the same</li>
              <li>Both User ID and Sponsor ID must be valid registered users</li>
              <li>Level Open option controls sponsor hierarchy level access</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}