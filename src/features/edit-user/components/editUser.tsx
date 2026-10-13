"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserByAuthLogin,
  updateUserProfile,
  getAllCountries,
  type UpdateUserProfilePayload,
} from "../services/adminEditUsers.service";
import { toast } from "sonner";

export default function EditUserProfile() {
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [countryId, setCountryId] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [userData, setUserData] = useState({
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
  });

  // ============================================
  // 🌍 Countries Query
  // ============================================
  const { data: countriesRes } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getAllCountries(),
    staleTime: 1000 * 60 * 60, // 1 hour — countries rarely change
  });

  const countries = countriesRes?.data ?? [];

  // ============================================
  // 🔍 User Query
  // ============================================
  const {
    data: res,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-by-auth-login", searchId],
    queryFn: () => getUserByAuthLogin(searchId),
    enabled: !!searchId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  useEffect(() => {
    if (!res) return;
    const u = res.data;
    if (res.statusCode === 200 && u) {
      setUserData({
        userName: `${u.FName ?? ""} ${u.LName ?? ""}`.trim(),
        firstName: u.FName ?? "",
        lastName: u.LName ?? "",
        email: u.Email ?? "",
        country: u.Country_Name ?? "",
        code: u.phonecode ? `+${u.phonecode}` : "",
        mobile: u.Mobile ?? "",
        address: u.Address ?? "",
        wallet: u.WalletBep20 ?? "",
        authPass: "",
      });
      setCountryId(u.CountryId ?? 0);
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  }, [res]);

  // ============================================
  // 💾 Update Mutation
  // ============================================
  const updateMutation = useMutation({
    mutationFn: (payload: UpdateUserProfilePayload) => updateUserProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully ✅");
      setSuccessMsg("Profile updated successfully ✅");
      resetForm();
      queryClient.invalidateQueries({
        queryKey: ["user-by-auth-login", searchId],
      });
      setTimeout(() => setSuccessMsg(null), 3000);
    },
    onError: (err: any) => {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        (status === 401
          ? "Unauthorized. Please login again."
          : "Failed to update profile.");
      toast.error(msg);
    },
  });

  const errorMessage = (() => {
    if (!isError) return null;
    const status = (error as any)?.response?.status;
    if (status === 401) return "Unauthorized. Please login again.";
    if (status === 404) return "User not found.";
    return "Something went wrong. Please try again.";
  })();

  // ============================================
  // Handlers
  // ============================================
  const handleSearch = () => {
    const trimmed = userId.trim();
    if (!trimmed) return;
    setSuccessMsg(null);
    setSearchId(trimmed);
  };

  // Country change → countryId + phonecode + name update
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedCountry = countries.find((c) => c.Country_Id === selectedId);

    setCountryId(selectedId);
    setUserData((prev) => ({
      ...prev,
      country: selectedCountry?.Country_Name ?? "",
      code: selectedCountry?.phonecode ? `+${selectedCountry.phonecode}` : prev.code,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!searchId) return;

    const payload: UpdateUserProfilePayload = {
      LoginID: searchId,
      FName: userData.firstName.trim(),
      LName: userData.lastName.trim(),
      Address: userData.address.trim(),
      Email: userData.email.trim(),
      mobile: userData.mobile.trim(),
      countryid: countryId,
      WalletBep20: userData.wallet.trim(),
    };

    updateMutation.mutate(payload);
  };
// ============================================
// 🔄 Reset Form
// ============================================
const resetForm = () => {
  setUserId("");
  setSearchId("");
  setIsSearched(false);
  setCountryId(0);
  setUserData({
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
  });
};
  return (
    <div className="w-full min-h-screen bg-[#FAF6EC] p-4 pt-6 font-sans flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full overflow-hidden">

        {/* Header */}
        <div className="bg-[#D4AF37] px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">Edit User Profile</h1>
          <p className="text-gray-800 text-xs mt-0.5">
            Update user information and manage account details
          </p>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Search Box */}
          <div className="border border-dashed border-[#D4AF37]/40 rounded-lg p-5 mb-8 bg-[#FAF6EC]/50">
            <div className={`flex ${isSearched ? "flex-col md:flex-row gap-5 items-end" : "flex-col"}`}>
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
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Enter User ID to search"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                    />
                  </div>

                  <button
                    onClick={handleSearch}
                    disabled={userId.trim() === "" || isLoading || isFetching}
                    className="px-6 py-2 rounded-md text-sm font-bold transition-colors bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {(isLoading || isFetching) && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {isLoading || isFetching ? "Searching..." : "Search User"}
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-600 mt-2 font-medium">{errorMessage}</p>
                )}
              </div>

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

          {/* Form */}
          {isSearched && (
            <div className="space-y-4">

              {/* Row 1 */}
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

              {/* Row 2 — Email + Country (DYNAMIC) */}
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
                      value={countryId || ""}
                      onChange={handleCountryChange}
                      className="w-full appearance-none px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                    >
                      <option value="">Select Country</option>
                      {countries.map((c) => (
                        <option key={c.Country_Id} value={c.Country_Id}>
                          {c.CountryFlag ? "🌐 " : ""}
                          {c.Country_Name} (+{c.phonecode})
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
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

              {/* Row 4 */}
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

              {/* Row 5 */}
              {/* <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">AUTH PASS</label>
                <input
                  type="password"
                  name="authPass"
                  value={userData.authPass}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div> */}

              {successMsg && (
                <p className="text-sm text-green-600 font-medium">{successMsg}</p>
              )}

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={updateMutation.isPending}
                  className="w-full bg-[#D4AF37] hover:bg-[#B89328] text-gray-900 font-bold py-3 rounded-md transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Profile
                    </>
                  )}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}