"use client";

import React, { useState } from "react";
import {
  roiWithdrawalService,
  type ROIWithdrawalRecord,
} from "../services/roiWithdrawal.service";
import { WalletConnectionCard } from "@/features/wallet/components/WalletConnectionCard";
import { toast } from "sonner";
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
  Copy,
} from "lucide-react";

// ============================================================
// TYPES (Future API ready)
// ============================================================
interface ROIWithdrawalRequest {
  id: string;
  sr: number;
  userId: string;
  name: string;
  date: string;
  request: string;
  charges: string;
  release: string;
  email: string;
  walletAddress: string;
  status: "Pending" | "Approved" | "Rejected";
  remark: string;
}

interface ROIStats {
  totalRequests: number;
  totalRelease: string;
}

function formatBackendDate(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}

function mapRequest(record: ROIWithdrawalRecord, index: number): ROIWithdrawalRequest {
  return {
    id: record.id,
    sr: index + 1,
    userId: record.userId,
    name: record.fullName,
    date: record.createdDate ? record.createdDate.split("T")[0] ?? "-" : "-",
    request: `$${record.amount.toFixed(2)}`,
    charges: `$${record.charges.toFixed(2)}`,
    release: `$${record.release.toFixed(2)}`,
    email: record.email,
    walletAddress: record.wallet || "-",
    status:
      record.status === "Approved" || record.status === "Rejected"
        ? record.status
        : "Pending",
    remark: record.remark || "-",
  };
}

// ============================================================
// COMPONENT
// ============================================================
export default function ROIWithdrawalRequests() {
  // ---- Filters ----
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  // ---- Data ----
  const [requests, setRequests] = useState<ROIWithdrawalRequest[]>([]);
  const [stats, setStats] = useState<ROIStats>({
    totalRequests: 0,
    totalRelease: "$0",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ---- Pagination ----
  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);

  const getFilteredRequests = async (): Promise<ROIWithdrawalRequest[]> => {
    const report = await roiWithdrawalService.getReport({
      authLogin: userId.trim(),
      fromDate: formatBackendDate(fromDate),
      toDate: formatBackendDate(toDate),
    });
    const normalizedUsername = username.trim().toLowerCase();

    return report.unApWithROI
      .filter(
        (record) =>
          !normalizedUsername ||
          record.fullName.toLowerCase().includes(normalizedUsername),
      )
      .map(mapRequest);
  };

  // ============================================================
  // SEARCH HANDLER
  // ============================================================
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fromDate && toDate && fromDate > toDate) {
      setError("From Date cannot be later than To Date.");
      toast.error("From Date cannot be later than To Date.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await getFilteredRequests();
      const fetchedStats: ROIStats = {
        totalRequests: data.length,
        totalRelease: `$${data
          .reduce(
            (total, request) => total + Number(request.release.replace("$", "")),
            0,
          )
          .toFixed(2)}`,
      };
      setRequests(data);
      setStats(fetchedStats);
      setIsSearched(true);
      setCurrentPage(1);
      if (data.length === 0) toast.info("No ROI withdrawal requests found.");
      else toast.success(`${data.length} ROI withdrawal request(s) found.`);
    } catch (fetchError) {
      console.error("Failed to fetch ROI withdrawal requests:", fetchError);
      setError("Unable to load ROI withdrawal requests. Please try again.");
      toast.error("Unable to load ROI withdrawal requests. Please try again.");
      setRequests([]);
      setIsSearched(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    if (fromDate && toDate && fromDate > toDate) {
      setError("From Date cannot be later than To Date.");
      toast.error("From Date cannot be later than To Date.");
      return;
    }

    let exportRows = requests;
    if (!isSearched) {
      setIsLoading(true);
      setError("");
      try {
        exportRows = await getFilteredRequests();
        setRequests(exportRows);
        setStats({
          totalRequests: exportRows.length,
          totalRelease: `$${exportRows
            .reduce(
              (total, request) => total + Number(request.release.replace("$", "")),
              0,
            )
            .toFixed(2)}`,
        });
        setIsSearched(true);
        setCurrentPage(1);
      } catch (fetchError) {
        console.error("Failed to fetch ROI requests for export:", fetchError);
        setError("Unable to load ROI withdrawal requests. Please try again.");
        toast.error("Unable to load ROI withdrawal requests. Please try again.");
        return;
      } finally {
        setIsLoading(false);
      }
    }

    if (exportRows.length === 0) {
      toast.info("There are no ROI requests to export.");
      return;
    }

    const columns: (keyof ROIWithdrawalRequest)[] = [
      "sr",
      "userId",
      "name",
      "date",
      "request",
      "charges",
      "release",
      "email",
      "walletAddress",
      "status",
      "remark",
    ];
    const csv = [
      columns.join(","),
      ...exportRows.map((request) =>
        columns
          .map((column) => `"${String(request[column]).replaceAll('"', '""')}"`)
          .join(","),
      ),
    ].join("\n");
    const downloadUrl = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "roi-withdrawal-requests.csv";
    link.click();
    URL.revokeObjectURL(downloadUrl);
    toast.success(`${exportRows.length} ROI request(s) exported successfully.`);
  };

  const handleRefresh = () => {
    setFromDate("");
    setToDate("");
    setUserId("");
    setUsername("");
    setRequests([]);
    setError("");
    setStats({ totalRequests: 0, totalRelease: "$0" });
    setIsSearched(false);
    setCurrentPage(1);
  };

  const handleCopy = (text: string) => {
    if (text && text !== "-") {
      void navigator.clipboard
        .writeText(text)
        .then(() => alert("Copied to clipboard!"))
        .catch((error: unknown) => {
          console.error("Failed to copy wallet address:", error);
          alert("Unable to copy wallet address.");
        });
    }
  };

  // ============================================================
  // PAGINATION
  // ============================================================
  const totalEntries = requests.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-4">

        {/* ============ 1. Page Header ============ */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <RotateCw className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ROI Withdrawal Requests</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage and process ROI withdrawal requests
            </p>
          </div>
        </div>

        {/* ============ 2. Wallet Connection ============ */}
        <WalletConnectionCard />

        {/* ============ 3. Stat Cards (Only after search) ============ */}
        {isSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full animate-in fade-in slide-in-from-top-3 duration-300">

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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Release Amount
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {stats.totalRelease}
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
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Filters
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Filter ROI withdrawal requests by date or user
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSearch}>
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
                    placeholder="Enter username"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                  />
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
                  disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:cursor-not-allowed disabled:opacity-60"
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

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* ============ 5. Results Table ============ */}
        {isSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full animate-in fade-in slide-in-from-top-3 duration-300">

            <div className="bg-[#FFF9E6] border-b border-[#D4AF37]/30 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-bold text-gray-800">
                  Found {totalEntries} pending ROI requests
                </span>
              </div>
              <span className="text-xs text-gray-600">
                Total Pending Release: <span className="font-bold text-green-700">{stats.totalRelease}</span>
              </span>
            </div>

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
                  {currentRequests.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="px-3 py-8 text-center text-gray-500">
                        No ROI withdrawal requests found.
                      </td>
                    </tr>
                  ) : (
                    currentRequests.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                      >
                        <td className="px-3 py-4 border-r border-gray-100 font-medium">{item.sr}</td>

                        {/* USDT Action */}
                        <td className="px-3 py-4 border-r border-gray-100">
                          <button className="px-3 py-1.5 bg-green-500 text-white rounded-full text-[10px] font-bold hover:bg-green-600 transition whitespace-nowrap">
                            Approve USDT
                          </button>
                        </td>

                        {/* Action (Manual) */}
                        <td className="px-3 py-4 border-r border-gray-100">
                          <button className="px-3 py-1.5 bg-blue-500 text-white rounded-full text-[10px] font-bold hover:bg-blue-600 transition">
                            Manual
                          </button>
                        </td>

                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.userId}</td>
                        <td className="px-3 py-4 border-r border-gray-100 font-medium text-gray-800 whitespace-nowrap">{item.name}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.date}</td>
                        <td className="px-3 py-4 border-r border-gray-100 font-medium">{item.request}</td>
                        <td className="px-3 py-4 border-r border-gray-100">{item.charges}</td>
                        <td className="px-3 py-4 border-r border-gray-100 font-medium text-green-700">{item.release}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.email}</td>

                        {/* Wallet Address with copy */}
                        <td className="px-3 py-4 border-r border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-600 whitespace-nowrap">{item.walletAddress}</span>
                            {item.walletAddress.trim() && item.walletAddress !== "-" && (
                              <button
                                onClick={() => handleCopy(item.walletAddress)}
                                className="text-green-600 hover:text-green-700 transition shrink-0"
                                title="Copy"
                                aria-label="Copy wallet address"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-3 py-4 border-r border-gray-100">
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

                        <td className="px-3 py-4 border-r border-gray-100 text-gray-600 whitespace-nowrap">{item.remark}</td>

                        {/* Reject Action */}
                        <td className="px-3 py-4">
                          <button className="px-3 py-1.5 bg-red-500 text-white rounded-full text-[10px] font-bold hover:bg-red-600 transition">
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

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