"use client";

import React, { useState } from "react";
import {
  RotateCw,
  Wallet,
  AlertTriangle,
  Search,
  Download,
  RotateCcw,
  Calendar,
  User,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function WithdrawalRequests() {
  // Search filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const [isSearched, setIsSearched] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);

  // Static withdrawal data
  const allRequests = [
    {
      sr: 1,
      userId: "umamansari789@gmail.com",
      name: "HARRY CARTER",
      date: "2026-09-22",
      request: "$100",
      charges: "$2",
      release: "$98",
      email: "umamansari789@gmail.com",
      walletAddress: "Xjsjdhdhdbjej...",
      status: "Pending",
      remark: "Withdrawal Request on $98.00",
    },
    {
      sr: 2,
      userId: "umamansari789@gmail.com",
      name: "HARRY CARTER",
      date: "2026-09-22",
      request: "$10",
      charges: "$0.2",
      release: "$9.8",
      email: "umamansari789@gmail.com",
      walletAddress: "Xjsjdhdhdbjej...",
      status: "Pending",
      remark: "Withdrawal Request on $9.80",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
    setCurrentPage(1);
  };

  const handleExport = () => {
    alert("Exporting withdrawal requests...");
  };

  const handleRefresh = () => {
    setFromDate("");
    setToDate("");
    setUserId("");
    setUsername("");
    setIsSearched(false);
  };

  const totalPages = Math.ceil(allRequests.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRequests = allRequests.slice(startIndex, endIndex);

  // Stat values (static)
  const totalRequests = allRequests.length;
  const totalRelease = "$107.8";

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-4">

        {/* ============ 1. Page Header ============ */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <RotateCw className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Withdrawal Requests</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage and process withdrawal requests
            </p>
          </div>
        </div>

        {/* ============ 2. Wallet Connection Banner ============ */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 overflow-hidden w-full">
          {/* Orange Header */}
          <div className="bg-orange-500 px-6 py-3 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold text-white">Wallet Connection</h2>
          </div>
          {/* Body */}
          <div className="bg-[#FFF9E6] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
              <span>MetaMask not detected.</span>
              <a href="#" className="text-orange-600 font-bold underline hover:text-orange-700">
                Install MetaMask
              </a>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition whitespace-nowrap">
              Install MetaMask
            </button>
          </div>
        </div>

        {/* ============ 3. Stat Cards (Only after search) ============ */}
        {isSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full animate-in fade-in slide-in-from-top-3 duration-300">
            {/* Total Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {totalRequests}
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-teal-100 flex items-center justify-center">
                <RotateCw className="w-5 h-5 text-teal-600" />
              </div>
            </div>

            {/* Total Release Amount */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Release Amount
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {totalRelease}
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        )}

        {/* ============ 4. Search Filters Card ============ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          {/* Card Header - KALKII Gold */}
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Filters
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Filter withdrawal requests by date or user
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <form onSubmit={handleSearch}>
              {/* Filter Grid - 4 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

                {/* From Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> From Date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700"
                  />
                </div>

                {/* To Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700"
                  />
                </div>

                {/* User ID */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> User ID
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user ID"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username will appear here"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                  />
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition"
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
                  Export
                </button>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ============ 5. Results Table (Only after search) ============ */}
        {isSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full animate-in fade-in slide-in-from-top-3 duration-300">

            {/* Table Top Bar */}
            <div className="bg-[#FFF9E6] border-b border-[#D4AF37]/30 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-bold text-gray-800">
                  Found {totalRequests} pending requests
                </span>
              </div>
              <span className="text-xs text-gray-600">
                Total Pending Release: <span className="font-bold text-green-700">{totalRelease}</span>
              </span>
            </div>

            {/* Table with horizontal scroll */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1500px]">
                <thead>
                  <tr className="bg-[#FAF6EC] border-b border-gray-200 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                    <th className="px-3 py-3 border-r border-gray-200">#</th>
                    <th className="px-3 py-3 border-r border-gray-200">USDT Action</th>
                    <th className="px-3 py-3 border-r border-gray-200">Action</th>
                    <th className="px-3 py-3 border-r border-gray-200">User ID</th>
                    <th className="px-3 py-3 border-r border-gray-200">Name</th>
                    <th className="px-3 py-3 border-r border-gray-200">Date</th>
                    <th className="px-3 py-3 border-r border-gray-200">Request ($)</th>
                    <th className="px-3 py-3 border-r border-gray-200">Charges ($)</th>
                    <th className="px-3 py-3 border-r border-gray-200">Release ($)</th>
                    <th className="px-3 py-3 border-r border-gray-200">Email</th>
                    <th className="px-3 py-3 border-r border-gray-200">Wallet Address</th>
                    <th className="px-3 py-3 border-r border-gray-200">Status</th>
                    <th className="px-3 py-3 border-r border-gray-200">Remark</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {currentRequests.map((item) => (
                    <tr
                      key={item.sr}
                      className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                    >
                      <td className="px-3 py-4 border-r border-gray-100 font-medium">{item.sr}</td>
                      <td className="px-3 py-4 border-r border-gray-100">
                        <button className="px-3 py-1.5 bg-green-500 text-white rounded-full text-[10px] font-bold hover:bg-green-600 transition whitespace-nowrap">
                          Approve USDT
                        </button>
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100">
                        <button className="px-3 py-1.5 bg-blue-500 text-white rounded-full text-[10px] font-bold hover:bg-blue-600 transition">
                          Approve
                        </button>
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100">{item.userId}</td>
                      <td className="px-3 py-4 border-r border-gray-100 font-medium text-gray-800 whitespace-nowrap">{item.name}</td>
                      <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.date}</td>
                      <td className="px-3 py-4 border-r border-gray-100 font-medium">{item.request}</td>
                      <td className="px-3 py-4 border-r border-gray-100">{item.charges}</td>
                      <td className="px-3 py-4 border-r border-gray-100 font-medium text-green-700">{item.release}</td>
                      <td className="px-3 py-4 border-r border-gray-100">{item.email}</td>
                      <td className="px-3 py-4 border-r border-gray-100 text-gray-500">{item.walletAddress}</td>
                      <td className="px-3 py-4 border-r border-gray-100">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100 text-gray-600 whitespace-nowrap">{item.remark}</td>
                      <td className="px-3 py-4">
                        <button className="px-3 py-1.5 bg-red-500 text-white rounded-full text-[10px] font-bold hover:bg-red-600 transition">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer / Pagination */}
            <div className="bg-white border-t border-gray-100 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">

              {/* Rows per page */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                >
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={500}>500</option>
                </select>
              </div>

              {/* Showing text */}
              <div className="text-xs text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, allRequests.length)} of {allRequests.length} entries
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 text-xs font-bold">
                  {currentPage}
                </button>
                <button
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
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