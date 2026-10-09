"use client";

import React, { useState } from "react";
import { Ticket, Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";

export default function TicketLogs() {
  // ---- Pagination State ----
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Static tickets data (7 tickets)
  const tickets = [
    { sr: 1, userId: "Test@gmail.com", name: "System Root", subject: "tetsinggg", status: "Closed" },
    { sr: 2, userId: "Test@gmail.com", name: "System Root", subject: "add withdrawl to check", status: "Closed" },
    { sr: 3, userId: "Test@gmail.com", name: "System Root", subject: "check", status: "Closed" },
    { sr: 4, userId: "amaan.pulsepromote@gmail.com", name: "Amaan testtt", subject: "check withdrawl request", status: "Closed" },
    { sr: 5, userId: "faisal.pulsepromote93@gmail.com", name: "Dj Bravo", subject: "who is this", status: "Closed" },
    { sr: 6, userId: "Test@gmail.com", name: "System Root", subject: "Withdrawal issue", status: "Closed" },
    { sr: 7, userId: "Test@gmail.com", name: "System Root", subject: "Testing ticket", status: "Closed" },
  ];

  // ---- Pagination Calculations ----
  const totalEntries = tickets.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentTickets = tickets.slice(startIndex, endIndex);

  // ---- Handlers ----
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

        {/* ============ 1. Page Header ============ */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket Logs</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              View closed and completed support tickets
            </p>
          </div>
        </div>

        {/* ============ 2. Main Card ============ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">

          {/* Card Header */}
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Closed Tickets
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              View history of resolved and closed tickets
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">

            {/* Header + Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
              <h3 className="text-xl font-bold text-gray-900">Closed Tickets List</h3>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF6EC] border-b border-gray-200 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                    <th className="px-4 py-3 border-r border-gray-200 text-center w-20">S.NO</th>
                    <th className="px-4 py-3 border-r border-gray-200 text-center">USER ID</th>
                    <th className="px-4 py-3 border-r border-gray-200 text-center">NAME</th>
                    <th className="px-4 py-3 border-r border-gray-200 text-center">SUBJECT</th>
                    <th className="px-4 py-3 border-r border-gray-200 text-center w-32">STATUS</th>
                    <th className="px-4 py-3 text-center w-32">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {currentTickets.map((ticket) => (
                    <tr
                      key={ticket.sr}
                      className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                    >
                      <td className="px-4 py-4 text-center font-medium border-r border-gray-100">
                        {ticket.sr}
                      </td>
                      <td className="px-4 py-4 text-center border-r border-gray-100">
                        {ticket.userId}
                      </td>
                      <td className="px-4 py-4 text-center border-r border-gray-100">
                        {ticket.name}
                      </td>
                      <td className="px-4 py-4 text-center border-r border-gray-100">
                        {ticket.subject}
                      </td>
                      <td className="px-4 py-4 text-center border-r border-gray-100">
                        <span className="text-gray-800 font-medium">
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-teal-500 text-white rounded-full text-[11px] font-bold hover:bg-teal-600 transition">
                          <Eye className="w-3 h-3" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer  */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-5 text-sm text-gray-600">

              {/* Rows per page */}
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Showing text */}
              <div className="text-sm">
                {startIndex + 1} - {Math.min(endIndex, totalEntries)} of {totalEntries}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrev}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}