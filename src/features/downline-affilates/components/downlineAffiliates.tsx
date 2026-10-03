"use client";

import React, { useState } from "react";
import { Search, Download, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

export default function DownlineAffiliates() {
  const [userId, setUserId] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  // Static downline data (bilkul screenshot jaisa)
  const downlines = [
    {
      sr: 1,
      loginId: "Ro*************@gmail.com",
      sponsorId: "",
      name: "RoventarSystem",
      email: "",
      mobile: "",
      teamBusiness: "$5012",
      rank: "Null",
      registerDate: "10/09/2026",
      topupDate: "30/09/2026",
      totalTeam: "0",
      activeTeam: "0",
      monthlySelf: "0",
      monthlyTeam: "0",
      level: "1",
      status: "active", // active = green badge
    },
    {
      sr: 2,
      loginId: "fa***************@gmail.com",
      sponsorId: "",
      name: "DjBravo",
      email: "",
      mobile: "",
      teamBusiness: "$0",
      rank: "Null",
      registerDate: "10/09/2026",
      topupDate: "-",
      totalTeam: "0",
      activeTeam: "0",
      monthlySelf: "0",
      monthlyTeam: "0",
      level: "1",
      status: "inactive",
    },
    {
      sr: 3,
      loginId: "am***************@gmail.com",
      sponsorId: "",
      name: "Amaantesttt",
      email: "",
      mobile: "",
      teamBusiness: "$0",
      rank: "Null",
      registerDate: "14/09/2026",
      topupDate: "-",
      totalTeam: "0",
      activeTeam: "0",
      monthlySelf: "0",
      monthlyTeam: "0",
      level: "1",
      status: "inactive",
    },
    {
      sr: 4,
      loginId: "pu*************@gmail.com",
      sponsorId: "",
      name: "TestingTesting",
      email: "",
      mobile: "",
      teamBusiness: "$0",
      rank: "Null",
      registerDate: "14/09/2026",
      topupDate: "-",
      totalTeam: "0",
      activeTeam: "0",
      monthlySelf: "0",
      monthlyTeam: "0",
      level: "1",
      status: "inactive",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim().toLowerCase() === "test@gmail.com") {
      setIsSearched(true);
    } else {
      alert("User not found! Please use test@gmail.com");
      setIsSearched(false);
    }
  };

  const handleExport = () => {
    alert("Exporting to Excel...");
  };

  const handleRefresh = () => {
    setUserId("");
    setIsSearched(false);
  };

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-5">

        {/* 1. Top Page Header */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Downline Affiliates</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              View and manage your complete downline affiliate network
            </p>
          </div>
        </div>

        {/* 2. Search Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          {/* Card Header */}
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Downline
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Enter user ID to view downline affiliates
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row gap-6 items-end">

                {/* User ID Input */}
                <div className="w-full md:w-1/3">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                    User ID *
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user ID"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                  />
                </div>

                {/* Actions Buttons */}
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                    Actions
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={!userId.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                      <Search className="w-4 h-4" />
                      Search
                    </button>

                    <button
                      type="button"
                      onClick={handleExport}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition"
                    >
                      <Download className="w-4 h-4" />
                      Export Excel
                    </button>

                    <button
                      type="button"
                      onClick={handleRefresh}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gray-500 text-white rounded-lg text-sm font-bold hover:bg-gray-600 transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>

        {/* 3. Results Table */}
        {isSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full animate-in fade-in slide-in-from-top-3 duration-300">

            {/* Table Top Bar */}
            <div className="bg-[#FFF9E6] border-b border-[#D4AF37]/30 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-bold text-gray-800">
                  Found 4 affiliates
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Last updated: 9/30/2026, 4:18:09 PM
              </span>
            </div>

            {/* Table with horizontal scroll */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1600px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3 whitespace-nowrap">Sr.No.</th>
                    <th className="px-4 py-3 whitespace-nowrap">Login ID</th>
                    <th className="px-4 py-3 whitespace-nowrap">Sponsor ID</th>
                    <th className="px-4 py-3 whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 whitespace-nowrap">Mobile</th>
                    <th className="px-4 py-3 whitespace-nowrap">Team Business ($)</th>
                    <th className="px-4 py-3 whitespace-nowrap">Rank</th>
                    <th className="px-4 py-3 whitespace-nowrap">Register Date</th>
                    <th className="px-4 py-3 whitespace-nowrap">Topup Date</th>
                    <th className="px-4 py-3 whitespace-nowrap">Total Team</th>
                    <th className="px-4 py-3 whitespace-nowrap">Active Team</th>
                    <th className="px-4 py-3 whitespace-nowrap">Monthly Self</th>
                    <th className="px-4 py-3 whitespace-nowrap">Monthly Team</th>
                    <th className="px-4 py-3 whitespace-nowrap">Level</th>
                    <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {downlines.map((item) => (
                    <tr key={item.sr} className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors">
                      <td className="px-4 py-3 font-medium">{item.sr}</td>
                      <td className="px-4 py-3">{item.loginId}</td>
                      <td className="px-4 py-3">{item.sponsorId || "-"}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                      <td className="px-4 py-3">{item.email || "-"}</td>
                      <td className="px-4 py-3">{item.mobile || "-"}</td>
                      <td className="px-4 py-3 font-medium text-green-700">{item.teamBusiness}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-200 text-[10px] font-semibold">
                          {item.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.registerDate}</td>
                      <td className="px-4 py-3">{item.topupDate}</td>
                      <td className="px-4 py-3 text-center">{item.totalTeam}</td>
                      <td className="px-4 py-3 text-center">{item.activeTeam}</td>
                      <td className="px-4 py-3 text-center">{item.monthlySelf}</td>
                      <td className="px-4 py-3 text-center">{item.monthlyTeam}</td>
                      <td className="px-4 py-3 text-center font-medium">{item.level}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block w-8 h-3 rounded-full ${
                            item.status === "active"
                              ? "bg-green-500"
                              : "bg-red-300"
                          }`}
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer / Pagination */}
            <div className="bg-white border-t border-gray-100 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>Rows per page:</span>
                <select className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white">
                  <option>500</option>
                  <option>100</option>
                  <option>50</option>
                </select>
              </div>

              <div className="text-xs text-gray-600">
                Showing 1 to 4 of 4 entries
              </div>

              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}