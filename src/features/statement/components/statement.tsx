"use client";

import React, { useState } from "react";
import {
  Wallet,
  Search,
  Download,
  RotateCcw,
  Calendar,
  User,
  CreditCard,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function WalletStatement() {

  const [isSearched, setIsSearched] = useState(false);

  // Static transactions data
  const transactions = [
    {
      sr: 1,
      username: "roventardxb@gmail.com",
      name: "Roventar DXB",
      email: "roventardxb@gmail.com",
      credit: "$0.0384",
      debit: "$0",
      requestedDate: "2026-10-01",
      approvalDate: "2026-10-01",
      remark: "Payout Earnings credit on 01/10/2026",
    },
    {
      sr: 2,
      username: "stakefundex@gmail.com",
      name: "master account",
      email: "stakefundex@gmail.com",
      credit: "$0.0177",
      debit: "$0",
      requestedDate: "2026-10-01",
      approvalDate: "2026-10-01",
      remark: "Payout Earnings credit on 01/10/2026",
    },
    {
      sr: 3,
      username: "forexking897@gmail.com",
      name: "Manoj Kumar",
      email: "forexking897@gmail.com",
      credit: "$0.0437",
      debit: "$0",
      requestedDate: "2026-10-01",
      approvalDate: "2026-10-01",
      remark: "Payout Earnings credit on 01/10/2026",
    },
    {
      sr: 4,
      username: "nayandhibar110@gmail.com",
      name: "bbn ohk",
      email: "nayandhibar110@gmail.com",
      credit: "$0.4795",
      debit: "$0",
      requestedDate: "2026-10-01",
      approvalDate: "2026-10-01",
      remark: "Payout Earnings credit on 01/10/2026",
    },
    {
      sr: 5,
      username: "Roventarcloud@gmail.com",
      name: "Roventar System",
      email: "Roventarcloud@gmail.com",
      credit: "$1.5754",
      debit: "$0",
      requestedDate: "2026-10-01",
      approvalDate: "2026-10-01",
      remark: "Payout Earnings credit on 01/10/2026",
    },
    {
      sr: 6,
      username: "Test@gmail.com",
      name: "System Root",
      email: "amaan.pulsepromote@gmail.com",
      credit: "$1.0205",
      debit: "$0",
      requestedDate: "2026-10-01",
      approvalDate: "2026-10-01",
      remark: "Payout Earnings credit on 01/10/2026",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
  };

  const handleRefresh = () => {
    setIsSearched(false);
  };

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-4">

        {/* ============ 1. Page Header============ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Wallet Statement</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                View and manage all wallet transactions
              </p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>

        {/* ============ 2. Stat Cards ============ */}
        {isSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            {/* Total Credit */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Credit
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  $2576.85
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>

            {/* Total Debit */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Debit
                </p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  $343.00
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
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
              Filter wallet transactions by date, wallet type, or user
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSearch}>
              {/* Row 1: From Date, To Date, Select Wallet, Transaction Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">

                {/* From Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> From Date
                  </label>
                  <input
                    type="date"
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
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700"
                  />
                </div>

                {/* Select Wallet */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-[#D4AF37]" /> Select Wallet
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700">
                      <option>-- Select Wallet --</option>
                      <option>Income Wallet</option>
                      <option>Deposit Wallet</option>
                      <option>Trading Wallet</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Transaction Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" /> Transaction Type
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700">
                      <option>Select Transaction</option>
                      <option>Credit</option>
                      <option>Debit</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: User ID, Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> User ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter user ID"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Username
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="Username will appear here"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
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

        {/* ============ 4. Results Table============ */}
        {isSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">

            {/* Top Bar */}
            <div className="bg-[#FFF9E6] border-b border-[#D4AF37]/30 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-bold text-gray-800">
                  Found 146 transactions
                </span>
              </div>
              <span className="text-xs text-gray-600">
                Credit: <span className="font-bold text-green-700">$2576.85</span>
                {" | "}
                Debit: <span className="font-bold text-red-700">$343.00</span>
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1400px]">
                <thead>
                  <tr className="bg-[#FAF6EC] border-b border-gray-200 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                    <th className="px-3 py-3 border-r border-gray-200 text-center w-16">#</th>
                    <th className="px-3 py-3 border-r border-gray-200">Username</th>
                    <th className="px-3 py-3 border-r border-gray-200">Name</th>
                    <th className="px-3 py-3 border-r border-gray-200">Email</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">Credit</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">Debit</th>
                    <th className="px-3 py-3 border-r border-gray-200">Requested Date</th>
                    <th className="px-3 py-3 border-r border-gray-200">Approval Date</th>
                    <th className="px-3 py-3">Remark</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {transactions.map((item) => (
                    <tr
                      key={item.sr}
                      className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                    >
                      <td className="px-3 py-4 text-center font-medium border-r border-gray-100">{item.sr}</td>
                      <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.username}</td>
                      <td className="px-3 py-4 border-r border-gray-100 font-medium text-gray-800 whitespace-nowrap">{item.name}</td>
                      <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.email}</td>
                      <td className="px-3 py-4 border-r border-gray-100 text-center font-bold text-green-700">
                        {item.credit}
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100 text-center font-bold text-red-700">
                        {item.debit}
                      </td>
                      <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.requestedDate}</td>
                      <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.approvalDate}</td>
                      <td className="px-3 py-4 text-gray-600 whitespace-nowrap">{item.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Static Pagination Footer */}
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
                Showing 1 to 6 of 146 entries
              </div>

              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 text-xs font-bold">
                  1
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}