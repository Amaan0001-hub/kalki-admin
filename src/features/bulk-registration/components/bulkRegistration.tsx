"use client";

import React, { useState } from "react";
import { Users, User, FileText } from "lucide-react";

export default function BulkRegistration() {
  const [referralId, setReferralId] = useState("");
  const [referralName, setReferralName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  // Static / Hardcoded Data
  const [formData, setFormData] = useState({
    firstName: "System",
    lastName: "Root",
    mobile: "7800361082",
    email: "altamasha6@gmail.com",
    password: "password123",
    numIds: "10",
    country: "India",
  });

  // Instant Validation 
  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReferralId(value);

    if (value.trim().toLowerCase() === "test@gmail.com") {
      setIsValid(true);
      setReferralName("System Root");
      setError("");
    } else {
      setIsValid(false);
      setReferralName("");
      if (value.trim() !== "") {
        setError("User not found");
      } else {
        setError("");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    alert("Form submitted successfully!");
  };

  return (
    // Yahan min-h-screen add kar diya hai taaki footer neeche chala jaye
    <div className="w-full min-h-screen bg-[#FAF6EC] p-4 pt-4 font-sans flex justify-center items-start">
      
      <div className="w-full flex flex-col">
        
        {/* 1. Page Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#D4AF37] text-gray-900 mb-2 shadow-sm">
            <Users className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Registration</h1>
          <p className="text-xs text-gray-500 mt-1">
            Register multiple users efficiently in one go
          </p>
        </div>

        {/* 2. Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          
          {/* Card Header */}
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">Registration Details</h2>
            <p className="text-gray-800 text-xs mt-0.5">
              Fill in the information below to register users in bulk
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              
              {/* Section 1: Referral User Information */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-base font-semibold text-gray-800">
                    Referral User Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      Referral User ID *
                    </label>
                    <input
                      type="text"
                      value={referralId}
                      onChange={handleReferralChange}
                      placeholder="Enter referral user ID"
                      className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1.5">{error}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      Referral Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={referralName}
                      placeholder="Referral name will appear here"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: User Registration Details  */}
              {isValid && (
                <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center gap-2 mt-6 mb-3">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-base font-semibold text-gray-800">
                      User Registration Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Mobile Number *</label>
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Password *</label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Number of IDs *</label>
                      <input type="number" name="numIds" value={formData.numIds} onChange={handleChange} className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Country *</label>
                      <div className="relative">
                        <select name="country" value={formData.country} onChange={handleChange} className="w-full appearance-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white">
                          <option value="Mali">🇲🇱 Mali</option>
                          <option value="India">🇮🇳 India</option>
                          <option value="USA">🇺🇸 USA</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}