"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Download,
  RotateCcw,
  Calendar,
  User,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function OrderHistory() {

  const [isSearched, setIsSearched] = useState(false);

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Static orders data 
  const orders = [
    { sr: 1, username: "Test@gmail.com", name: "System Root", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$1.82", orderDate: "2026-09-24" },
    { sr: 2, username: "umamansari789@gmail.com", name: "HARRY CARTER", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$2.34", orderDate: "2026-09-22" },
    { sr: 3, username: "umamansari789@gmail.com", name: "HARRY CARTER", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$2.34", orderDate: "2026-09-22" },
    { sr: 4, username: "umamansari789@gmail.com", name: "HARRY CARTER", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$2.34", orderDate: "2026-09-22" },
    { sr: 5, username: "svmdigitalzone@gmail.com", name: "Jayansh Yadav", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$2.6", orderDate: "2026-09-21" },
    { sr: 6, username: "sharadkumar3148@gmail.com", name: "Sharad Kumar", price: "$111", duration: "27.75", weeklyApr: "$0.26", totalReturn: "$222", credit: "$4.0404", orderDate: "2026-09-17" },
    { sr: 7, username: "forexking897@gmail.com", name: "Manoj Kumar", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$3.9", orderDate: "2026-09-16" },
    { sr: 8, username: "soubhagyaray@gmail.com", name: "SOUBHAGYA RAY", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$4.16", orderDate: "2026-09-15" },
    { sr: 9, username: "john.doe@gmail.com", name: "John Doe", price: "$150", duration: "30", weeklyApr: "$0.30", totalReturn: "$300", credit: "$5.20", orderDate: "2026-09-14" },
    { sr: 10, username: "jane.smith@gmail.com", name: "Jane Smith", price: "$200", duration: "35", weeklyApr: "$0.35", totalReturn: "$400", credit: "$6.50", orderDate: "2026-09-13" },
    { sr: 11, username: "mike.wilson@gmail.com", name: "Mike Wilson", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$2.80", orderDate: "2026-09-12" },
    { sr: 12, username: "sarah.jones@gmail.com", name: "Sarah Jones", price: "$120", duration: "28", weeklyApr: "$0.28", totalReturn: "$240", credit: "$3.40", orderDate: "2026-09-11" },
    { sr: 13, username: "robert.brown@gmail.com", name: "Robert Brown", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$2.90", orderDate: "2026-09-10" },
    { sr: 14, username: "emily.davis@gmail.com", name: "Emily Davis", price: "$180", duration: "32", weeklyApr: "$0.32", totalReturn: "$360", credit: "$5.80", orderDate: "2026-09-09" },
    { sr: 15, username: "david.miller@gmail.com", name: "David Miller", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$3.10", orderDate: "2026-09-08" },
    { sr: 16, username: "lisa.garcia@gmail.com", name: "Lisa Garcia", price: "$150", duration: "30", weeklyApr: "$0.30", totalReturn: "$300", credit: "$4.70", orderDate: "2026-09-07" },
    { sr: 17, username: "james.rodriguez@gmail.com", name: "James Rodriguez", price: "$100", duration: "25", weeklyApr: "$0.26", totalReturn: "$200", credit: "$3.60", orderDate: "2026-09-06" },
  ];

  // ============================================================
  // PAGINATION CALCULATIONS
  // ============================================================
  const totalEntries = orders.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsSearched(false);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
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

        {/* ============ 1. Page Header with Export Button ============ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                View and manage all customer orders
              </p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>

        {/* ============ 2. Stat Cards  ============ */}
        {isSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {totalEntries}
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-teal-100 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-teal-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  $6112.00
                </p>
              </div>
              <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
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
              Filter orders by date, product, or user
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> From Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> To Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700"
                  />
                </div>

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

              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition"
                >
                  <Search className="w-4 h-4" />
                  Search Orders
                </button>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Refresh Data
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ============ 4. Results Table ============ */}
        {isSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">

            {/* Top Bar */}
            <div className="bg-[#FFF9E6] border-b border-[#D4AF37]/30 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-bold text-gray-800">
                  Found {totalEntries} orders
                </span>
              </div>
              <span className="text-xs text-gray-600">
                Total Amount: <span className="font-bold text-green-700">$6112.00</span>
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1300px]">
                <thead>
                  <tr className="bg-[#FAF6EC] border-b border-gray-200 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                    <th className="px-3 py-3 border-r border-gray-200 text-center w-16">#</th>
                    <th className="px-3 py-3 border-r border-gray-200">Username</th>
                    <th className="px-3 py-3 border-r border-gray-200">Name</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">Price ($)</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">Duration (Months)</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">Weekly APR ($)</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">Total Return</th>
                    <th className="px-3 py-3 border-r border-gray-200 text-center">Credit ($)</th>
                    <th className="px-3 py-3">Order Date</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {currentOrders.map((item) => (
                    <tr
                      key={item.sr}
                      className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                    >
                      <td className="px-3 py-4 text-center font-medium border-r border-gray-100">{item.sr}</td>
                      <td className="px-3 py-4 border-r border-gray-100 whitespace-nowrap">{item.username}</td>
                      <td className="px-3 py-4 border-r border-gray-100 font-medium text-gray-800 whitespace-nowrap">{item.name}</td>
                      <td className="px-3 py-4 border-r border-gray-100 text-center font-bold text-gray-800">{item.price}</td>
                      <td className="px-3 py-4 border-r border-gray-100 text-center">{item.duration}</td>
                      <td className="px-3 py-4 border-r border-gray-100 text-center">{item.weeklyApr}</td>
                      <td className="px-3 py-4 border-r border-gray-100 text-center font-medium text-blue-700">{item.totalReturn}</td>
                      <td className="px-3 py-4 border-r border-gray-100 text-center font-bold text-green-700">{item.credit}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{item.orderDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="bg-white border-t border-gray-100 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">

              {/* Rows per page */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="text-xs text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPrev}
                  disabled={currentPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 text-xs font-bold">
                  {currentPage}
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#D4AF37] text-gray-900 hover:bg-[#B89328] transition disabled:opacity-40 disabled:cursor-not-allowed"
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