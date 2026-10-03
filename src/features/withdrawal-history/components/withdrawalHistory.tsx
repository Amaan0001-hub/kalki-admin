"use client";

import React, { useState, useEffect } from "react";
import {
  RotateCw,
  Search,
  Download,
  RotateCcw,
  Calendar,
  User,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  XCircle,
  Filter,
  Copy,
} from "lucide-react";

// ============================================================
// TYPES (Future API ready)
// ============================================================
interface WithdrawalHistoryItem {
  sr: number;
  userId: string;
  name: string;
  email: string;
  amount: string;
  charges: string;
  release: string;
  walletAddress: string;
  transactionHash: string;
  createdDate: string;
  approvalDate: string;
  remark: string;
  status: "Approved" | "Rejected" | "Pending";
}

interface WithdrawalStats {
  totalRequests: number;
  approved: number;
  rejected: number;
  totalAmount: string;
  totalRelease: string;
}

// ============================================================
// API FUNCTIONS (Abhi static, baad me sirf fetch() se replace karo)
// ============================================================

// Future me:
// const res = await fetch(`/api/withdrawal-history?from=${fromDate}&to=${toDate}&userId=${userId}&status=${status}`);
// return await res.json();
const fetchWithdrawalHistory = async (): Promise<{
  data: WithdrawalHistoryItem[];
  stats: WithdrawalStats;
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data: WithdrawalHistoryItem[] = [
    {
      sr: 1,
      userId: "umamansari789@gmail.com",
      name: "HARRY CARTER",
      email: "umamansari789@gmail.com",
      amount: "$100",
      charges: "$2",
      release: "$98",
      walletAddress: "Xjsjdhdhdbjej...",
      transactionHash: "-",
      createdDate: "2026-09-22",
      approvalDate: "2026-09-24",
      remark: "rejected by admin",
      status: "Rejected",
    },
    {
      sr: 2,
      userId: "umamansari789@gmail.com",
      name: "HARRY CARTER",
      email: "umamansari789@gmail.com",
      amount: "$100",
      charges: "$2",
      release: "$98",
      walletAddress: "Xjsjdhdhdbjej...",
      transactionHash: "-",
      createdDate: "2026-09-22",
      approvalDate: "2026-09-24",
      remark: "rejected",
      status: "Rejected",
    },
    {
      sr: 3,
      userId: "faisal.pulsepromote93@gmail.com",
      name: "Dj Bravo",
      email: "faisal.pulsepromote93@gmail.com",
      amount: "$10",
      charges: "$0.2",
      release: "$9.8",
      walletAddress: "XXXXXXXXXXXXXX...",
      transactionHash: "Approved by ...",
      createdDate: "2026-09-14",
      approvalDate: "2026-09-14",
      remark: "Withdrawal Request on $9.80",
      status: "Approved",
    },
    {
      sr: 4,
      userId: "Test@gmail.com",
      name: "System Root",
      email: "amaan.pulsepromote@gmail.com",
      amount: "$10",
      charges: "$0.2",
      release: "$9.8",
      walletAddress: "xgrgfrughrh...",
      transactionHash: "0x5ab94f5c4c...",
      createdDate: "2026-09-14",
      approvalDate: "-",
      remark: "Withdrawal Request on $9.80",
      status: "Approved",
    },
    {
      sr: 5,
      userId: "Roventarcloud@gmail.com",
      name: "Roventar System",
      email: "Roventarcloud@gmail.com",
      amount: "$10",
      charges: "$0.2",
      release: "$9.8",
      walletAddress: "0xeB5f1f91c67...",
      transactionHash: "0xe7351f639f9...",
      createdDate: "2026-09-13",
      approvalDate: "2026-09-14",
      remark: "Withdrawal Request on $9.80",
      status: "Approved",
    },
    {
      sr: 6,
      userId: "Roventarcloud@gmail.com",
      name: "Roventar System",
      email: "Roventarcloud@gmail.com",
      amount: "$10",
      charges: "$0.2",
      release: "$9.8",
      walletAddress: "0xeB5f1f91c67...",
      transactionHash: "-",
      createdDate: "2026-09-12",
      approvalDate: "2026-09-12",
      remark: "Withdrawal Request on $9.80",
      status: "Approved",
    },
    {
      sr: 7,
      userId: "Roventarcloud@gmail.com",
      name: "Roventar System",
      email: "Roventarcloud@gmail.com",
      amount: "$10",
      charges: "$0.2",
      release: "$9.8",
      walletAddress: "0xeB5f1f91c67...",
      transactionHash: "-",
      createdDate: "2026-09-10",
      approvalDate: "2026-09-12",
      remark: "Withdrawal Request on $9.80",
      status: "Approved",
    },
  ];

  const stats: WithdrawalStats = {
    totalRequests: data.length,
    approved: data.filter((d) => d.status === "Approved").length,
    rejected: data.filter((d) => d.status === "Rejected").length,
    totalAmount: "$250",
    totalRelease: "$245",
  };

  return { data, stats };
};

// Future me: API to verify user ID and get username
const verifyUserId = async (id: string): Promise<{ name: string } | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (id.trim().toLowerCase() === "test@gmail.com") {
    return { name: "System Root" };
  }
  return null;
};

// ============================================================
// COMPONENT
// ============================================================
export default function WithdrawalHistory() {
  // ---- Filters ----
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  // ---- Data ----
  const [history, setHistory] = useState<WithdrawalHistoryItem[]>([]);
  const [stats, setStats] = useState<WithdrawalStats>({
    totalRequests: 0,
    approved: 0,
    rejected: 0,
    totalAmount: "$0",
    totalRelease: "$0",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserVerifying, setIsUserVerifying] = useState(false);
  const [userError, setUserError] = useState("");

  // ---- Pagination ----
  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);

  // ============================================================
  // USER ID AUTO-FILL
  // ============================================================
  useEffect(() => {
    const verifyUser = async () => {
      if (!userId.trim()) {
        setUsername("");
        setUserError("");
        return;
      }

      setIsUserVerifying(true);
      setUserError("");

      const result = await verifyUserId(userId);

      if (result) {
        setUsername(result.name);
        setUserError("");
      } else {
        setUsername("");
        setUserError("User not found");
      }

      setIsUserVerifying(false);
    };

    const timeout = setTimeout(verifyUser, 500);
    return () => clearTimeout(timeout);
  }, [userId]);

  // ============================================================
  // SEARCH HANDLER
  // ============================================================
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId && userError) {
      alert("Please enter a valid User ID!");
      return;
    }

    setIsLoading(true);

    try {
      const { data, stats: fetchedStats } = await fetchWithdrawalHistory();
      setHistory(data);
      setStats(fetchedStats);
      setIsSearched(true);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to fetch withdrawal history:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    alert("Exporting withdrawal history to Excel...");
  };

  const handleRefresh = () => {
    setFromDate("");
    setToDate("");
    setUserId("");
    setUsername("");
    setStatus("");
    setUserError("");
    setHistory([]);
    setIsSearched(false);
    setCurrentPage(1);
  };

  const handleCopy = (text: string) => {
    if (text && text !== "-") {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  // ============================================================
  // PAGINATION
  // ============================================================
  const totalEntries = history.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentHistory = history.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-4">

        {/* ============ 1. Page Header ============ */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <RotateCw className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Withdrawal History</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              View and manage all withdrawal requests
            </p>
          </div>
        </div>

        {/* ============ 2. Stat Cards (Only after search) ============ */}
        {isSearched && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-in fade-in slide-in-from-top-3 duration-300">

            {/* Total Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalRequests}
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-teal-100 flex items-center justify-center">
                <RotateCw className="w-5 h-5 text-teal-600" />
              </div>
            </div>

            {/* Approved */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Approved
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {stats.approved}
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>

            {/* Rejected */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Rejected
                </p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {stats.rejected}
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-blue-700 mt-1">
                  {stats.totalAmount}
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-700" />
              </div>
            </div>

          </div>
        )}

        {/* ============ 3. Search Filters Card ============ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Filters
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Filter withdrawal history by date, user, or status
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSearch}>
              {/* Filter Grid - 5 columns on large */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">

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
                    {isUserVerifying && (
                      <Loader2 className="w-3 h-3 text-[#D4AF37] animate-spin" />
                    )}
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user ID"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white ${
                      userError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {userError && (
                    <p className="text-red-500 text-[10px] mt-1">{userError}</p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Username
                  </label>
                  <input
                    type="text"
                    disabled
                    value={username}
                    placeholder="Username will appear here"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#D4AF37]" /> Status
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700"
                    >
                      <option value="">All Status</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Search
                    </>
                  )}
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
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ============ 4. Results Table ============ */}
        {isSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full animate-in fade-in slide-in-from-top-3 duration-300">

            {/* Top Bar */}
            <div className="bg-[#FFF9E6] border-b border-[#D4AF37]/30 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-bold text-gray-800">
                  Found {totalEntries} transactions
                </span>
              </div>
              <span className="text-xs text-gray-600">
                Total Amount: <span className="font-bold text-blue-700">{stats.totalAmount}</span>
                {" | "}
                Total Release: <span className="font-bold text-green-700">{stats.totalRelease}</span>
              </span>
            </div>

            {/* Table with horizontal scroll */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1600px]">
                <thead>
                  <tr className="bg-[#FAF6EC] border-b border-gray-200 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                    <th className="px-3 py-3 border-r border-gray-200">#</th>
                    <th className="px-3 py-3 border-r border-gray-200">User ID</th>
                    <th className="px-3 py-3 border-r border-gray-200">Name</th>
                    <th className="px-3 py-3 border-r border-gray-200">Email</th>
                    <th className="px-3 py-3 border-r border-gray-200">Amount</th>
                    <th className="px-3 py-3 border-r border-gray-200">Charges</th>
                    <th className="px-3 py-3 border-r border-gray-200">Release</th>
                    <th className="px-3 py-3 border-r border-gray-200">Wallet Address</th>
                    <th className="px-3 py-3 border-r border-gray-200">Transaction Hash</th>
                    <th className="px-3 py-3 border-r border-gray-200">Created Date</th>
                    <th className="px-3 py-3 border-r border-gray-200">Approval Date</th>
                    <th className="px-3 py-3 border-r border-gray-200">Remark</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {currentHistory.length === 0 ? (
                    <tr>
                      <td colSpan={13} className="px-3 py-8 text-center text-gray-500">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    currentHistory.map((item) => (
                      <tr
                        key={item.sr}
                        className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                      >
                        <td className="px-3 py-4 border-r border-gray-100 font-medium">{item.sr}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.userId}</td>
                        <td className="px-3 py-4 border-r border-gray-100 font-medium text-gray-800 whitespace-nowrap">{item.name}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.email}</td>
                        <td className="px-3 py-4 border-r border-gray-100 font-medium">{item.amount}</td>
                        <td className="px-3 py-4 border-r border-gray-100">{item.charges}</td>
                        <td className="px-3 py-4 border-r border-gray-100 font-medium text-green-700">{item.release}</td>

                        {/* Wallet Address with copy icon */}
                        <td className="px-3 py-4 border-r border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-600 whitespace-nowrap">{item.walletAddress}</span>
                            <button
                              onClick={() => handleCopy(item.walletAddress)}
                              className="text-green-600 hover:text-green-700 transition shrink-0"
                              title="Copy"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Transaction Hash with copy icon */}
                        <td className="px-3 py-4 border-r border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-600 whitespace-nowrap">{item.transactionHash}</span>
                            {item.transactionHash && item.transactionHash !== "-" && (
                              <button
                                onClick={() => handleCopy(item.transactionHash)}
                                className="text-green-600 hover:text-green-700 transition shrink-0"
                                title="Copy"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.createdDate}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.approvalDate}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.remark}</td>
                        <td className="px-3 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              item.status === "Approved"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : item.status === "Rejected"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.status === "Approved"
                                  ? "bg-green-500"
                                  : item.status === "Rejected"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                              }`}
                            ></span>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="bg-white border-t border-gray-100 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
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

              <div className="text-xs text-gray-600">
                Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
              </div>

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
                  disabled={currentPage === totalPages || totalPages === 0}
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