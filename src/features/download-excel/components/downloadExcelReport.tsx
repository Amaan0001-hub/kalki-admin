"use client";

import React, { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  ChevronDown,
  ArrowRight,
  RotateCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ---------- Types ---------- */
interface ReportRow {
  sr: number;
  authLogin: string;
  name: string;
  mobile: string;
  payoutUsdt: string;
  date: string;
  remark: string;
  widStatus: string;
}

/* ---------- Static data--------- */
const reportTypes = [
  "All Member",
  "Active IDs",
  "Wallet Report",
  "Income Wallet",
  "Deposit Wallet",
  "Withdrawal",
  "Deposit",
];

const reportData: Record<string, ReportRow[]> = {
  Withdrawal: [
    { sr: 1, authLogin: "faisal.pulsepromote93@gmail.com", name: "DjBravo", mobile: "00000000000", payoutUsdt: "9.8", date: "09/14/2026", remark: "Withdrawal Request on $9.80", widStatus: "Approved" },
    { sr: 2, authLogin: "Test@gmail.com", name: "SystemRoot", mobile: "04556233840", payoutUsdt: "9.8", date: "09/14/2026", remark: "Withdrawal Request on $9.80", widStatus: "Approved" },
    { sr: 3, authLogin: "Roventarcloud@gmail.com", name: "RoventarSystem", mobile: "045562338401", payoutUsdt: "9.8", date: "09/13/2026", remark: "Withdrawal Request on $9.80", widStatus: "Approved" },
    { sr: 4, authLogin: "Roventarcloud@gmail.com", name: "RoventarSystem", mobile: "045562338401", payoutUsdt: "9.8", date: "09/12/2026", remark: "Withdrawal Request on $9.80", widStatus: "Approved" },
    { sr: 5, authLogin: "Roventarcloud@gmail.com", name: "RoventarSystem", mobile: "045562338401", payoutUsdt: "9.8", date: "09/10/2026", remark: "Withdrawal Request on $9.80", widStatus: "Approved" },
  ],
  "All Member": [
    { sr: 1, authLogin: "test@gmail.com", name: "System Root", mobile: "7800361082", payoutUsdt: "-", date: "09/15/2026", remark: "New Registration", widStatus: "Active" },
    { sr: 2, authLogin: "user1@gmail.com", name: "User One", mobile: "9876543210", payoutUsdt: "-", date: "09/14/2026", remark: "New Registration", widStatus: "Active" },
    { sr: 3, authLogin: "user2@gmail.com", name: "User Two", mobile: "9876543211", payoutUsdt: "-", date: "09/13/2026", remark: "New Registration", widStatus: "Inactive" },
  ],
  "Active IDs": [
    { sr: 1, authLogin: "test@gmail.com", name: "System Root", mobile: "7800361082", payoutUsdt: "-", date: "09/15/2026", remark: "Active user", widStatus: "Active" },
    { sr: 2, authLogin: "user1@gmail.com", name: "User One", mobile: "9876543210", payoutUsdt: "-", date: "09/14/2026", remark: "Active user", widStatus: "Active" },
  ],
  "Income Wallet": [
    { sr: 1, authLogin: "test@gmail.com", name: "System Root", mobile: "7800361082", payoutUsdt: "100", date: "09/15/2026", remark: "Income credited", widStatus: "Completed" },
  ],
  "Deposit Wallet": [
    { sr: 1, authLogin: "test@gmail.com", name: "System Root", mobile: "7800361082", payoutUsdt: "500", date: "09/15/2026", remark: "Deposit successful", widStatus: "Completed" },
  ],
  Deposit: [
    { sr: 1, authLogin: "test@gmail.com", name: "System Root", mobile: "7800361082", payoutUsdt: "500", date: "09/15/2026", remark: "Deposit successful", widStatus: "Completed" },
  ],
  "Wallet Report": [
    { sr: 1, authLogin: "test@gmail.com", name: "System Root", mobile: "7800361082", payoutUsdt: "100", date: "09/15/2026", remark: "Wallet transaction", widStatus: "Completed" },
  ],
};

/* ---------- Component ---------- */
export default function DownloadExcelReports() {
  const [selectedReport, setSelectedReport] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);

  // Get data for current selection
  const currentData: ReportRow[] = reportData[selectedReport] ?? [];

  // Pagination calculations
  const totalEntries = currentData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = currentData.slice(startIndex, endIndex);

  // Handlers
  const handleDownload = () => {
    if (!selectedReport) return;
    setIsGenerated(true);
    setCurrentPage(1);
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReport(e.target.value);
    setIsGenerated(false);
    setCurrentPage(1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-4">

        {/* ============ 1. Page Header ============ */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Download Excel Reports</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Generate and download various system reports
            </p>
          </div>
        </div>

        {/* ============ 2. Report Generator Card ============ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Report Generator
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Select a report type to download data
            </p>
          </div>

          <div className="p-6">

            {/* Select Report Type */}
            <div className="mb-5 max-w-md">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4AF37]" /> Select Report Type *
              </label>
              <div className="relative">
                <select
                  value={selectedReport}
                  onChange={handleReportChange}
                  className="w-full appearance-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700"
                >
                  <option value="">Select a Report Type</option>
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="max-w-md">
              <button
                onClick={handleDownload}
                disabled={!selectedReport}
                className="w-full flex justify-center items-center gap-2 py-3 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Download Report
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* ============ 3. Report Table  ============ */}
        {isGenerated && selectedReport && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full animate-in fade-in slide-in-from-top-3 duration-300">

            {/* Table Header */}
            <div className="bg-[#D4AF37] px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <RotateCw className="w-5 h-5" />
                {selectedReport} Report
              </h2>
              <span className="text-xs font-bold text-gray-800">
                Total Records: {totalEntries}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-[#FAF6EC] border-b border-gray-200 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                    <th className="px-3 py-3 border-r border-gray-200 text-center w-16">#</th>
                    <th className="px-3 py-3 border-r border-gray-200">AUTHLOGIN</th>
                    <th className="px-3 py-3 border-r border-gray-200">NAME</th>
                    <th className="px-3 py-3 border-r border-gray-200">MOBILE</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">PAYOUT_USDT</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">DATE</th>
                    <th className="px-3 py-3 border-r border-gray-200">REMARK</th>
                    <th className="px-3 py-3 text-center">WIDSTATUS</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {currentRows.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                        No data available for this report.
                      </td>
                    </tr>
                  ) : (
                    currentRows.map((row) => (
                      <tr
                        key={row.sr}
                        className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                      >
                        <td className="px-3 py-4 text-center font-medium border-r border-gray-100">{row.sr}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{row.authLogin}</td>
                        <td className="px-3 py-4 border-r border-gray-100 font-medium text-gray-800 whitespace-nowrap">{row.name}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{row.mobile}</td>
                        <td className="px-3 py-4 border-r border-gray-100 text-center font-bold text-green-700">{row.payoutUsdt}</td>
                        <td className="px-3 py-4 border-r border-gray-100 text-center whitespace-nowrap">{row.date}</td>
                        <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{row.remark}</td>
                        <td className="px-3 py-4 text-center">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              row.widStatus === "Approved"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : row.widStatus === "Inactive"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}
                          >
                            {row.widStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
                  onClick={goToPrev}
                  disabled={currentPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 text-xs font-bold">
                  {currentPage}
                </button>
                <button
                  onClick={goToNext}
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