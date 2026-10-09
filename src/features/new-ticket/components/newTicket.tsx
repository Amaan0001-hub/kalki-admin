"use client";

import React from "react";
import { Ticket, Search } from "lucide-react";

export default function TicketManagement() {
  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-4">

        {/* ============ 1. Page Header ============ */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage and respond to customer support tickets
            </p>
          </div>
        </div>

        {/* ============ 2. Main Card ============ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">

          {/* Card Header  */}
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Open Tickets
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              View and respond to customer support requests
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">

            {/* Tickets List Header + Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
              <h3 className="text-xl font-bold text-gray-900">Tickets List</h3>

              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                />
              </div>
            </div>

            {/* Empty State (Static - No Data) */}
            <div className="border border-gray-200 rounded-lg py-12 flex items-center justify-center">
              <p className="text-sm font-medium text-gray-700">No Data found!</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}