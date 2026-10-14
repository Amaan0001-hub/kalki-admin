"use client";

import React, { useState } from "react";
import { incomeRequestService, type IncomeRequest } from "../services/incomeRequest.service";
import { WalletConnectionCard } from "@/features/wallet/components/WalletConnectionCard";
import { useBscUsdtWallet } from "@/features/wallet/hooks/useBscUsdtWallet";
import { toast } from "sonner";
import { isAxiosError } from "axios";
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
  X,
  Copy,
} from "lucide-react";

function getWithdrawalActionErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || error.message || fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

export default function WithdrawalRequests() {
  const { account, chainId, sendUsdt } = useBscUsdtWallet();
  // Search filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [requests, setRequests] = useState<IncomeRequest[]>([]);

  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<IncomeRequest | null>(null);
  const [activeStatusAction, setActiveStatusAction] = useState<"approve" | "reject" | null>(null);
  const [statusRemark, setStatusRemark] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [usdtProcessingId, setUsdtProcessingId] = useState("");
  const [unrecordedTransfers, setUnrecordedTransfers] = useState<Map<string, string>>(
    new Map(),
  );

  const getFilteredRequests = async () => {
    const report = await incomeRequestService.getReport();
    return report.unApWithIncome.filter((request) => {
      const requestDate = request.createdDate.slice(0, 10);
      return (
        (!fromDate || requestDate >= fromDate) &&
        (!toDate || requestDate <= toDate) &&
        (!userId.trim() ||
          request.userId.toLowerCase().includes(userId.trim().toLowerCase())) &&
        (!username.trim() ||
          request.fullName.toLowerCase().includes(username.trim().toLowerCase()))
      );
    });
  };

  const refreshRequests = async () => {
    const filteredRequests = await getFilteredRequests();
    setRequests(filteredRequests);
    setCurrentPage(1);
  };

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
      const filteredRequests = await getFilteredRequests();
      setRequests(filteredRequests);
      setIsSearched(true);
      if (filteredRequests.length === 0) toast.info("No withdrawal requests found.");
      else toast.success(`${filteredRequests.length} withdrawal request(s) found.`);
    } catch (fetchError) {
      console.error("Failed to fetch withdrawal requests:", fetchError);
      setError("Unable to load withdrawal requests. Please try again.");
      toast.error("Unable to load withdrawal requests. Please try again.");
      setRequests([]);
      setIsSearched(false);
    } finally {
      setIsLoading(false);
    }
    setCurrentPage(1);
  };

  const handleExport = async () => {
    if (fromDate && toDate && fromDate > toDate) {
      setError("From Date cannot be later than To Date.");
      toast.error("From Date cannot be later than To Date.");
      return;
    }

    let exportRequests = requests;

    if (exportRequests.length === 0 && !isSearched) {
      setIsLoading(true);
      setError("");
      try {
        const report = await incomeRequestService.getReport();
        exportRequests = report.unApWithIncome.filter((request) => {
          const requestDate = request.createdDate.slice(0, 10);
          return (
            (!fromDate || requestDate >= fromDate) &&
            (!toDate || requestDate <= toDate) &&
            (!userId.trim() ||
              request.userId.toLowerCase().includes(userId.trim().toLowerCase())) &&
            (!username.trim() ||
              request.fullName.toLowerCase().includes(username.trim().toLowerCase()))
          );
        });
        setRequests(exportRequests);
        setIsSearched(true);
        setCurrentPage(1);
      } catch (fetchError) {
        console.error("Failed to fetch withdrawal requests for export:", fetchError);
        setError("Unable to load withdrawal requests. Please try again.");
        toast.error("Unable to load withdrawal requests. Please try again.");
        return;
      } finally {
        setIsLoading(false);
      }
    }

    if (exportRequests.length === 0) {
      toast.info("There are no withdrawal requests to export.");
      return;
    }

    const columns = ["User ID", "Name", "Date", "Request", "Charges", "Release", "Email", "Wallet", "Status", "Remark"];
    const rows = exportRequests.map((request) => [
      request.userId,
      request.fullName,
      request.createdDate,
      request.totalWithdrawal,
      request.adminCharges,
      request.release,
      request.email,
      request.wallet,
      request.status,
      request.remark,
    ]);
    const csv = [columns, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "withdrawal-requests.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`${exportRequests.length} withdrawal request(s) exported successfully.`);
  };

  const handleRefresh = () => {
    setFromDate("");
    setToDate("");
    setUserId("");
    setUsername("");
    setRequests([]);
    setError("");
    setIsSearched(false);
    setCurrentPage(1);
    setSelectedRequest(null);
    setActiveStatusAction(null);
    setStatusRemark("");
  };

  const handleCopyWallet = async (wallet: string) => {
    try {
      await navigator.clipboard.writeText(wallet);
      toast.success("Copied to clipboard!");
    } catch (copyError) {
      console.error("Failed to copy wallet address:", copyError);
      toast.error("Unable to copy wallet address.");
    }
  };

  const openStatusConfirmation = (
    request: IncomeRequest,
    action: "approve" | "reject",
  ) => {
    if (!request.requestId) {
      toast.error("This request is missing the ID required to update its status.");
      return;
    }
    setSelectedRequest(request);
    setStatusRemark("");
    setActiveStatusAction(action);
  };

  const handleStatusUpdate = async () => {
    if (!selectedRequest || !activeStatusAction) return;
    if (!selectedRequest.requestId) {
      toast.error("This request is missing its request ID.");
      return;
    }
    if (!statusRemark.trim()) {
      toast.error(`Enter a ${activeStatusAction} remark to continue.`);
      return;
    }

    setIsUpdatingStatus(true);
    try {
      const actionName = activeStatusAction;
      const response = await incomeRequestService.approveOrReject({
        action: actionName,
        id: selectedRequest.requestId,
        authLoginId: selectedRequest.userId,
        rfstatus: actionName === "approve" ? 1 : 2,
        remark: statusRemark.trim(),
      });
      if (response.statusCode !== 1 && response.statusCode !== 200) {
        throw new Error(response.message || `${actionName} failed.`);
      }

      toast.success(
        response.message ||
          `Withdrawal request ${actionName === "approve" ? "approved" : "rejected"}.`,
      );
      setRequests((current) =>
        current.filter((request) => request.id !== selectedRequest.id),
      );
      setSelectedRequest(null);
      setActiveStatusAction(null);
      setStatusRemark("");
      try {
        await refreshRequests();
      } catch (refreshError) {
        console.error("Withdrawal status updated but request list refresh failed:", refreshError);
        toast.error("Action completed, but the request list could not be refreshed.");
      }
    } catch (actionError) {
      console.error(`Failed to ${activeStatusAction} withdrawal request:`, actionError);
      toast.error(
        getWithdrawalActionErrorMessage(
          actionError,
          `Unable to ${activeStatusAction} withdrawal request.`,
        ),
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleUsdtApprove = async (request: IncomeRequest) => {
    if (!request.userId || !request.wallet || request.release <= 0 || request.debit <= 0) {
      toast.error("Withdrawal details are incomplete or invalid.");
      return;
    }
    let txHash = unrecordedTransfers.get(request.id);
    if (!txHash && !account) {
      toast.error("Connect MetaMask before approving a USDT withdrawal.");
      return;
    }
    if (!txHash && chainId.toLowerCase() !== "0x38") {
      toast.error("Switch MetaMask to BNB Smart Chain before approving USDT.");
      return;
    }

    setUsdtProcessingId(request.id);
    try {
      if (!txHash) {
        toast.info("Confirm the USDT transfer in MetaMask.");
        const sentTransactionHash = await sendUsdt(request.wallet, request.release);
        txHash = sentTransactionHash;
        setUnrecordedTransfers((current) =>
          new Map(current).set(request.id, sentTransactionHash),
        );
      }
      if (!txHash) throw new Error("The USDT transaction hash is missing.");

      const response = await incomeRequestService.recordUsdtTransfer({
        AuthLoginId: request.userId,
        debit: request.release,
        Wallet: request.wallet,
        TransHash: txHash,
      });
      if (response.statusCode !== 1 && response.statusCode !== 200) {
        throw new Error(response.message || "USDT transfer was sent but could not be recorded.");
      }

      setUnrecordedTransfers((current) => {
        const next = new Map(current);
        next.delete(request.id);
        return next;
      });
      setRequests((current) => current.filter((row) => row.id !== request.id));
      toast.success(response.message || "USDT transfer approved successfully.");
      try {
        await refreshRequests();
      } catch (refreshError) {
        console.error("USDT approval succeeded but request list refresh failed:", refreshError);
        toast.error("USDT approval completed, but the request list could not be refreshed.");
      }
    } catch (actionError) {
      console.error("Failed to complete USDT withdrawal approval:", actionError);
      if (txHash) {
        const reason = getWithdrawalActionErrorMessage(
          actionError,
          "The backend did not confirm the approval.",
        );
        toast.error(
          `USDT was sent, but approval could not be recorded: ${reason} Use Retry Record for this request. Tx: ${txHash}`,
        );
      } else {
        const code =
          typeof actionError === "object" &&
          actionError !== null &&
          "code" in actionError
            ? actionError.code
            : undefined;
        toast.error(
          code === 4001
            ? "USDT transaction was rejected in MetaMask."
            : getWithdrawalActionErrorMessage(
                actionError,
                "Unable to approve USDT withdrawal.",
              ),
        );
      }
    } finally {
      setUsdtProcessingId("");
    }
  };

  const totalPages = Math.ceil(requests.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  const totalRequests = requests.length;
  const totalRelease = `$${requests.reduce((total, request) => total + request.release, 0).toFixed(2)}`;

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

        {/* ============ 2. Wallet Connection ============ */}
        <WalletConnectionCard />

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
                  disabled={isLoading}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" /> : <Search className="w-4 h-4 shrink-0" />}
                  <span>{isLoading ? "Loading..." : "Search"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExport}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Export</span>
                </button>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" />
                  <span>Refresh</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {error && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

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
                  {currentRequests.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="px-3 py-8 text-center text-gray-500">
                        No withdrawal requests found.
                      </td>
                    </tr>
                  ) : currentRequests.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                    >
                      <td className="px-3 py-4 border-r border-gray-100 font-medium">{startIndex + index + 1}</td>
                      <td className="px-3 py-4 border-r border-gray-100">
                        <button
                          type="button"
                          onClick={() => void handleUsdtApprove(item)}
                          disabled={
                            usdtProcessingId === item.id ||
                            (!unrecordedTransfers.has(item.id) &&
                              (!account || chainId.toLowerCase() !== "0x38"))
                          }
                          title={
                            unrecordedTransfers.has(item.id)
                              ? "Retry recording the existing USDT transfer"
                              : !account
                                ? "Connect MetaMask first"
                                : chainId.toLowerCase() !== "0x38"
                                  ? "Switch to BNB Smart Chain"
                                  : "Send the release amount to the user's wallet"
                          }
                          className="px-3 py-1.5 bg-green-600 text-white rounded-full text-[10px] font-bold hover:bg-green-700 transition whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {usdtProcessingId === item.id
                            ? "Processing..."
                            : unrecordedTransfers.has(item.id)
                              ? "Retry Record"
                              : "Approve USDT"}
                        </button>
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100">
                        <button
                          type="button"
                          onClick={() => openStatusConfirmation(item, "approve")}
                          disabled={!item.requestId || isUpdatingStatus}
                          className="px-3 py-1.5 bg-[#D4AF37] text-white rounded-full text-[10px] font-bold hover:bg-[#B89328] transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Approve
                        </button>
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100">{item.userId}</td>
                      <td className="px-3 py-4 border-r border-gray-100 font-medium text-gray-800 whitespace-nowrap">{item.fullName}</td>
                      <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.createdDate}</td>
                      <td className="px-3 py-4 border-r border-gray-100 font-medium">${item.totalWithdrawal.toFixed(2)}</td>
                      <td className="px-3 py-4 border-r border-gray-100">${item.adminCharges.toFixed(2)}</td>
                      <td className="px-3 py-4 border-r border-gray-100 font-medium text-green-700">${item.release.toFixed(2)}</td>
                      <td className="px-3 py-4 border-r border-gray-100">{item.email}</td>
                      <td className="px-3 py-4 border-r border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-500 whitespace-nowrap">{item.wallet || "-"}</span>
                          {item.wallet.trim() && item.wallet !== "-" && (
                            <button
                              type="button"
                              onClick={() => void handleCopyWallet(item.wallet)}
                              className="shrink-0 text-green-600 transition hover:text-green-700"
                              title="Copy wallet address"
                              aria-label="Copy wallet address"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100 text-gray-600 whitespace-nowrap">{item.remark}</td>
                      <td className="px-3 py-4">
                        <button
                          type="button"
                          onClick={() => openStatusConfirmation(item, "reject")}
                          disabled={!item.requestId || isUpdatingStatus}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-bold hover:bg-red-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
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
                Showing {requests.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, requests.length)} of {requests.length} entries
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

      {selectedRequest && activeStatusAction && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="withdrawal-action-title"
            className="w-full max-w-md rounded-xl border border-[#D4AF37]/40 bg-white p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id="withdrawal-action-title" className="text-lg font-bold text-gray-900">
                  {activeStatusAction === "approve"
                    ? "Approve withdrawal request"
                    : "Reject withdrawal request"}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {selectedRequest.userId} · ${selectedRequest.totalWithdrawal.toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close confirmation"
                disabled={isUpdatingStatus}
                onClick={() => {
                  setSelectedRequest(null);
                  setActiveStatusAction(null);
                }}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <label
              htmlFor="withdrawal-action-remark"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              {activeStatusAction === "approve" ? "Approval remark" : "Rejection reason"}
            </label>
            <textarea
              id="withdrawal-action-remark"
              value={statusRemark}
              onChange={(event) => setStatusRemark(event.target.value)}
              placeholder={
                activeStatusAction === "approve"
                  ? "Enter approval remark..."
                  : "Enter rejection reason..."
              }
              rows={3}
              maxLength={500}
              className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => {
                  setSelectedRequest(null);
                  setActiveStatusAction(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleStatusUpdate()}
                disabled={isUpdatingStatus || !statusRemark.trim()}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  activeStatusAction === "approve"
                    ? "bg-[#D4AF37] text-white hover:bg-[#B89328]"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isUpdatingStatus
                  ? "Saving..."
                  : activeStatusAction === "approve"
                    ? "Confirm Approve"
                    : "Confirm Reject"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}