"use client";

import React, { useState, useMemo } from "react";
import { Wallet, ChevronLeft, ChevronRight } from "lucide-react";

const generateWallets = () => {
  const wallets = [];
  const prefixes = [
    "0x5bfAda310340C2063625b2fb4158AbeED13fC970",
    "0x13B5cab432b69c5Cb921e294c9a371396ef55B22",
    "0x53ec73e02B29fFC2ca8e5d458f66CbD228c5Ec3f",
    "0x1BBC7dFDCCa9438d63f85c182a8fb0ccE97f98ef",
    "0x33542dA3A9E1B7BC3381924077ae21Bfec36aDa5",
    "0x43Af52BE792DF3f01a4Ad76537956085893a407F",
    "0xd216CA2e6B885A4f6e0BF251925575A3D6c783",
    "0x7fd981e6E24321ee8BE428bE06AB52dE802f30d4",
    "0x234a10A0Ad624b343dAEC5ba75b54d6684F7A12d",
    "0xE9B58eF886432993Cd836f7bE4f8AfF937f3bF5d",
    "0xD71C5428e6C5025dcd3057fe0F14e39Qa2bbd43d",
    "0x2664DEaCD7D6b71A1304a3aC04a56638FD6a2E5",
    "0x9a29c71fC67a039E7B263fA15eFE0CaLab579a06",
    "0xE1BC3E5D764eEe6470D94e8970E9eFe3E7a45Db",
    "0x5448Df9fD0b1347b23c3E16f4143aD4a1A8AA47B",
    "0x9ec9e4aa28B4F0901A5990fbab5dbaf7683CC1f2",
    "0x0410ae1318e4a3fCA9D31b0B145a7eBCB267564c",
    "0xBc9d8bAF7318aC56d8b1C7d7518e21c88EE3A4",
    "0x60D0A6319C36D4a89CcA5Ca8b0Ccb82994314aBF",
    "0x60F1A5031AA23bC927EAf96b3c24149AB8B9aBf1",
    "0x6B5D020aD157C0A4ab23eaad727461598690Bc7D8",
    "0x4f4B132483C083894328fc249dE9O6a99dda1f2b",
    "0xAB3E32FD7476208FED59feA5A87Abd77ca407E6",
    "0x3A145AE5cE68cF13e9c783c5d7b8C0a2a01e0d4",
    "0x4c8999c01147874618bE8b658874d6365b0C565b9",
    "0x9C2f1B8A2D5F4E6A7C8B9D0E1F2A3B4C5D6E7F80",
    "0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F90A1",
    "0x2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F90A1B2",
    "0x3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F90A1B2C3",
    "0x4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F90A1B2C3D4",
    "0x5E6F7A8B9C0D1E2F3A4B5C6D7E8F90A1B2C3D4E5",
    "0x6F7A8B9C0D1E2F3A4B5C6D7E8F90A1B2C3D4E5F6",
    "0x7A8B9C0D1E2F3A4B5C6D7E8F90A1B2C3D4E5F6A7",
    "0x8B9C0D1E2F3A4B5C6D7E8F90A1B2C3D4E5F6A7B8",
    "0x9C0D1E2F3A4B5C6D7E8F90A1B2C3D4E5F6A7B8C9",
    "0xA1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0",
    "0xB2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1",
    "0xC3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2",
    "0xD4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3",
    "0xE5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4",
    "0xF6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5",
    "0xA7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6",
    "0xB8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7",
    "0xC9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8",
    "0xD0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9",
    "0xE1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0",
    "0xF2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1",
    "0xA3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2",
    "0xB4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3",
    "0xC5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4",
  ];

  for (let i = 0; i < 50; i++) {
    wallets.push({
      sr: i + 1,
      address: prefixes[i],
      status: "Active",
      usedByLoginId: "",
      usedByName: "",
    });
  }
  return wallets;
};

export default function ManageUserWalletAddress() {
  const [quantity, setQuantity] = useState("0");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 50 static wallets (generated once)
  const wallets = useMemo(() => generateWallets(), []);

  const totalPages = Math.ceil(wallets.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentWallets = wallets.slice(startIndex, endIndex);

  const handleGenerate = () => {
    alert(`Generating ${quantity} new wallet address(es)...`);
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

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">

          {/* Card Header - KALKII Gold */}
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Manage User Wallet Address
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Generate and manage wallet addresses for user allocation
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">

            {/* Top Section: Quantity + Generate */}
            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                placeholder="0"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white mb-4"
              />

              <button
                type="button"
                onClick={handleGenerate}
                className="w-full py-3 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition"
              >
                Generate Address
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF6EC] border-b border-gray-200 text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    <th className="px-4 py-3 w-20 text-center border-r border-gray-200">S. No.</th>
                    <th className="px-4 py-3 border-r border-gray-200">Wallet Address</th>
                    <th className="px-4 py-3 w-24 text-center border-r border-gray-200">Status</th>
                    <th className="px-4 py-3 w-40 text-center border-r border-gray-200">Usedby (LoginID)</th>
                    <th className="px-4 py-3 w-40 text-center">Usedby (Name)</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {currentWallets.map((item) => (
                    <tr
                      key={item.sr}
                      className="border-b border-gray-100 hover:bg-[#FFF9E6]/40 transition-colors"
                    >
                      <td className="px-4 py-3 text-center font-medium border-r border-gray-100">
                        {item.sr}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] border-r border-gray-100">
                        {item.address}
                      </td>
                      <td className="px-4 py-3 text-center border-r border-gray-100">
                        <span className="text-gray-800 font-medium">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-100">
                        {item.usedByLoginId}
                      </td>
                      <td className="px-4 py-3">
                        {item.usedByName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2 border-t border-gray-100">

              {/* Rows per page */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Showing text */}
              <div className="text-sm text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, wallets.length)} of {wallets.length}
              </div>

              {/* Pagination Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
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