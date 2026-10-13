"use client";

import React, { useState } from "react";
import axios from "axios";
import { LoaderCircle, Search } from "lucide-react";
import { editUserService } from "@/features/edit-user/services/editUser.service";

interface UserFormData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  code: string;
  mobile: string;
  address: string;
  wallet: string;
  authPass: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getField(record: Record<string, unknown>, names: string[]): unknown {
  for (const name of names) {
    const entry = Object.entries(record).find(([key]) => key.toLowerCase() === name.toLowerCase());
    if (entry) return entry[1];
  }
  return undefined;
}

function getText(record: Record<string, unknown>, names: string[]): string {
  const value = getField(record, names);
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function extractUserProfile(value: unknown, depth = 0): UserFormData | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const profile = extractUserProfile(item, depth + 1);
      if (profile) return profile;
    }
    return null;
  }
  if (!isRecord(value) || depth > 4) return null;

  const firstName = getText(value, ["FName", "firstName"]);
  const lastName = getText(value, ["LName", "lastName"]);
  const email = getText(value, ["Email", "email"]);
  const mobile = getText(value, ["Mobile", "mobile"]);
  const name = getText(value, ["userName", "username", "Name", "name"]);
  const country = getText(value, ["Country_Name", "countryName", "country"]);
  const code = getText(value, ["phonecode", "phoneCode", "code"]);
  const address = getText(value, ["Address", "address"]);
  const wallet = getText(value, ["WalletBep20", "walletBep20", "wallet"]);

  if (firstName || lastName || email || mobile || name) {
    return {
      ...emptyUserData,
      userName: name || [firstName, lastName].filter(Boolean).join(" "),
      firstName,
      lastName,
      email,
      country,
      code: code ? (code.startsWith("+") ? code : `+${code}`) : "",
      mobile,
      address,
      wallet,
    };
  }

  for (const key of ["data", "result"]) {
    if (key in value) {
      const profile = extractUserProfile(value[key], depth + 1);
      if (profile) return profile;
    }
  }
  return null;
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: unknown }>(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.trim()) return message;
  }

  return error instanceof Error ? error.message : "Failed to search user";
}

const emptyUserData: UserFormData = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  code: "",
  mobile: "",
  address: "",
  wallet: "",
  authPass: "",
};

export default function EditUserProfile() {
  const [userId, setUserId] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [userData, setUserData] = useState<UserFormData>(emptyUserData);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authLogin = userId.trim();
    if (!authLogin || isSearching) return;

    setIsSearching(true);
    setSearchError("");
    setIsSearched(false);
    setUserData(emptyUserData);

    try {
      const response = await editUserService.lookup(authLogin);
      const profile = extractUserProfile(response);
      if (!profile) {
        setSearchError("User not found. Please check the user ID and try again.");
        return;
      }

      setUserData(profile);
      setIsSearched(true);
    } catch (error) {
      setSearchError(getErrorMessage(error));
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-[#FAF6EC] p-4 pt-6 font-sans">
      {/* Main Unified Card - Full Width */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header Section */}
        <div className="bg-[#D4AF37] px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">Edit User Profile</h1>
          <p className="mt-0.5 text-xs text-gray-800">
            Update user information and manage account details
          </p>
        </div>

        {/* Body Section */}
        <div className="p-6">
          {/* Search Box Area */}
          <div className="mb-8 rounded-lg border border-dashed border-[#D4AF37]/40 bg-[#FAF6EC]/50 p-5">
            <div
              className={`flex ${isSearched ? "flex-col items-end gap-5 md:flex-row" : "flex-col"}`}
            >
              {/* User ID Input */}
              <div className={`${isSearched ? "flex-1" : "w-full md:w-3/4"}`}>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                  USER ID *
                </label>
                <form onSubmit={handleSearch} className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                      aria-hidden
                    />
                    <input
                      type="text"
                      value={userId}
                      disabled={isSearching}
                      onChange={(e) => {
                        setUserId(e.target.value);
                        setIsSearched(false);
                        setSearchError("");
                      }}
                      placeholder="Enter User ID to search"
                      aria-label="User ID"
                      className="w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    disabled={userId.trim() === "" || isSearching}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-[#B89328] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    {isSearching && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />}
                    {isSearching ? "Searching..." : "Search User"}
                  </button>
                </form>
                {searchError && (
                  <p className="mt-2 text-sm text-red-700" role="alert">
                    {searchError}
                  </p>
                )}
              </div>

              {/* User Name */}
              {isSearched && (
                <div className="flex-1">
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    USER NAME
                  </label>
                  <input
                    type="text"
                    disabled
                    value={userData.userName}
                    className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Area */}
          {isSearched && (
            <div className="space-y-4">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Row 2: Email & Country */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    COUNTRY
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={userData.country}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    >
                      <option value="">Select country</option>
                      {userData.country &&
                        !["Mali", "India", "USA"].some(
                          (country) => country.toLowerCase() === userData.country.toLowerCase(),
                        ) && <option value={userData.country}>{userData.country}</option>}
                      <option value="Mali">🇲🇱 Mali</option>
                      <option value="India">🇮🇳 India</option>
                      <option value="USA">🇺🇸 USA</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Code & Mobile */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full md:w-1/4">
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    CODE
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={userData.code}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    MOBILE *
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={userData.mobile}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Row 4: Address & Wallet */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    ADDRESS
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                    WALLET BEP20
                  </label>
                  <input
                    type="text"
                    name="wallet"
                    value={userData.wallet}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Row 5: Auth Pass */}
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-gray-500">
                  AUTH PASS
                </label>
                <input
                  type="password"
                  name="authPass"
                  value={userData.authPass}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              {/* Submit Button  */}
              <div className="pt-4">
                <button
                  type="button"
                  className="w-full rounded-md bg-[#D4AF37] py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-[#B89328]"
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
