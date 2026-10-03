"use client";

import React, { useState } from "react";
import {
  Network,
  Search,
  User,
  Users,
  RotateCcw,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface TreeNode {
  id: string;
  email: string;
  name: string;
  package: string;
  totalDirect: number;
  isActive: boolean;
  children?: TreeNode[];
}

// ============================================================
// STATIC TREE DATA
// ============================================================
const treeData: TreeNode = {
  id: "root",
  email: "test@gmail.com",
  name: "System Root",
  package: "$100",
  totalDirect: 3,
  isActive: true,
  children: [
    {
      id: "c1",
      email: "Roventarcloud@gmail.com",
      name: "Roventar System",
      package: "$100",
      totalDirect: 0,
      isActive: true,
    },
    {
      id: "c2",
      email: "faisal.pulsepromote93@gmail.com",
      name: "DjBravo",
      package: "$0",
      totalDirect: 0,
      isActive: false,
    },
    {
      id: "c3",
      email: "amaan.pulsepromote@gmail.com",
      name: "Amaan testtt",
      package: "$0",
      totalDirect: 0,
      isActive: false,
    },
    {
      id: "c4",
      email: "pulsepromote@gmail.com",
      name: "Testing Testing",
      package: "$0",
      totalDirect: 0,
      isActive: false,
    },
  ],
};

// ============================================================
// NODE CARD COMPONENT
// ============================================================
function NodeCard({ node }: { node: TreeNode }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-56 shrink-0">
      {/* Top Email Badge */}
      <div
        className={`${
          node.isActive ? "bg-[#D4AF37]" : "bg-red-500"
        } text-white text-[9px] font-bold px-2 py-1 text-center truncate`}
        title={node.email}
      >
        {node.email}
      </div>

      {/* Body */}
      <div className="p-3 text-center">
        <h4 className="text-xs font-bold text-gray-900">{node.name}</h4>
        <p className="text-[9px] text-gray-500 mt-1">
          Package: {node.package}
        </p>
        <p className="text-[9px] text-gray-400 italic">
          Total Direct: {node.totalDirect}
        </p>
      </div>

      {/* Bottom Button (only if node has children) */}
      {hasChildren && (
        <div className="pb-2.5 flex justify-center">
          <button className="text-[9px] bg-[#D4AF37] text-gray-900 px-4 py-0.5 rounded-full font-bold hover:bg-[#B89328] transition">
            Collapse
          </button>
        </div>
      )}

      {/* Expand button for active leaf nodes */}
      {!hasChildren && node.isActive && (
        <div className="pb-2.5 flex justify-center">
          <button className="text-[9px] bg-[#D4AF37] text-gray-900 px-4 py-0.5 rounded-full font-bold hover:bg-[#B89328] transition">
            Expand
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function IntelligentTreeView() {
  const [userId, setUserId] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [userError, setUserError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (userId.trim().toLowerCase() === "test@gmail.com") {
      setIsSearched(true);
      setUserError("");
    } else {
      setIsSearched(false);
      setUserError("User not found");
    }
  };

  const handleReset = () => {
    setUserId("");
    setIsSearched(false);
    setUserError("");
  };

  const children = treeData.children || [];

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start">
      <div className="w-full flex flex-col gap-4">

        {/* ============ 1. Page Header ============ */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Intelligent Tree View</h1>
            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Visualize your network hierarchy
            </p>
          </div>
        </div>

        {/* ============ 2. Search Card ============ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search User
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Enter user ID to view their network tree
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row gap-6 items-end">

                {/* User ID Input */}
                <div className="w-full md:w-1/3">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> User ID *
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      if (userError) setUserError("");
                    }}
                    placeholder="Enter user ID"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white ${
                      userError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {userError && (
                    <p className="text-red-500 text-xs mt-1.5">{userError}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="w-full md:flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                    Actions
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={!userId.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      <Search className="w-4 h-4" />
                      View Network Tree
                    </button>

                    {isSearched && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition whitespace-nowrap"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>

        {/* ============ 3. Network Visualization (Only after search) ============ */}
        {isSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full animate-in fade-in slide-in-from-top-3 duration-300">

            {/* Header Bar */}
            <div className="bg-[#FFF9E6] border-b border-[#D4AF37]/30 px-6 py-3 flex items-center gap-2">
              <Network className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-medium text-gray-800">
                Network Visualization - User:{" "}
                <span className="font-bold text-gray-900">{treeData.email}</span>
              </span>
            </div>

            {/* Tree Diagram */}
            <div className="bg-gray-50/50 p-6 overflow-x-auto">
              <div className="min-w-[900px] flex flex-col items-center py-6">

                {/* Root Node */}
                <NodeCard node={treeData} />

                {/* Vertical line from root */}
                <div className="w-px h-6 bg-gray-400"></div>

                {/* Children container with horizontal connector */}
                {children.length > 0 && (
                  <div className="relative w-full">
                    {/* Horizontal line connecting children */}
                    <div
                      className="absolute top-0 h-px bg-gray-400"
                      style={{
                        left: `${50 / children.length}%`,
                        right: `${50 / children.length}%`,
                      }}
                    ></div>

                    {/* Children row */}
                    <div className="flex justify-around">
                      {children.map((child) => (
                        <div
                          key={child.id}
                          className="flex flex-col items-center flex-1"
                        >
                          {/* Vertical line down to this child */}
                          <div className="w-px h-6 bg-gray-400"></div>
                          <NodeCard node={child} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}