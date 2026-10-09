"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function EditUserProfile() {
  const [userId, setUserId] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  // Hardcoded data
  const [userData, setUserData] = useState({
    userName: "System Root",
    firstName: "System",
    lastName: "Root",
    email: "altamasha6@gmail.com",
    country: "India",
    code: "+91",
    mobile: "7800361082",
    address: "Uttar Pradesh",
    wallet: "xgrgfrughrhgxrhgguegerrgurgugrrttctrytry",
    authPass: "",
  });

  const handleSearch = () => {
    if (userId.trim().toLowerCase() === "test@gmail.com") {
      setIsSearched(true);
    } else {
      alert("User not found! Please use test@gmail.com");
      setIsSearched(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF6EC] p-4 pt-6 font-sans flex justify-center items-start">
      
      {/* Main Unified Card - Full Width */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#D4AF37] px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">Edit User Profile</h1>
          <p className="text-gray-800 text-xs mt-0.5">Update user information and manage account details</p>
        </div>

        {/* Body Section */}
        <div className="p-6">
          
          {/* Search Box Area */}
          <div className="border border-dashed border-[#D4AF37]/40 rounded-lg p-5 mb-8 bg-[#FAF6EC]/50">
            <div className={`flex ${isSearched ? "flex-col md:flex-row gap-5 items-end" : "flex-col"}`}>
              
              {/* User ID Input */}
              <div className={`${isSearched ? "flex-1" : "w-full md:w-3/4"}`}>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  USER ID *
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Enter User ID to search"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                    />
                  </div>
                  
                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    disabled={userId.trim() === ""}
                    className="px-6 py-2 rounded-md text-sm font-bold transition-colors bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Search User
                  </button>
                </div>
              </div>

              {/* User Name */}
              {isSearched && (
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    USER NAME
                  </label>
                  <input
                    type="text"
                    disabled
                    value={userData.userName}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Area */}
          {isSearched && (
            <div className="space-y-4">
              
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">FIRST NAME *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">LAST NAME *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Row 2: Email & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">EMAIL *</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">COUNTRY</label>
                  <div className="relative">
                    <select
                      name="country"
                      value={userData.country}
                      onChange={handleChange}
                      className="w-full appearance-none px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                    >
                      <option value="Mali">🇲🇱 Mali</option>
                      <option value="India">🇮🇳 India</option>
                      <option value="USA">🇺🇸 USA</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Code & Mobile */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">CODE</label>
                  <input
                    type="text"
                    name="code"
                    value={userData.code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">MOBILE *</label>
                  <input
                    type="text"
                    name="mobile"
                    value={userData.mobile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Row 4: Address & Wallet */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">ADDRESS</label>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">WALLET BEP20</label>
                  <input
                    type="text"
                    name="wallet"
                    value={userData.wallet}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Row 5: Auth Pass */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">AUTH PASS</label>
                <input
                  type="password"
                  name="authPass"
                  value={userData.authPass}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              {/* Submit Button  */}
              <div className="pt-4">
                <button
                  type="button"
                  className="w-full bg-[#D4AF37] hover:bg-[#B89328] text-gray-900 font-bold py-3 rounded-md transition-colors text-sm"
                >
                  Update Profile
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}