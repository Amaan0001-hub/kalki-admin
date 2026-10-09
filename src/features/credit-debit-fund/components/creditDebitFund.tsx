"use client";

import React, { useState } from "react";
import {
  Scale,
  Wallet,
  User,
  Search,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  CreditCard,
  Coins,
  X,
} from "lucide-react";

export default function CreditDebitFund() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [wallet, setWallet] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Static wallet balances
  const walletBalances = {
    income: "$57.6101",
    deposit: "$100",
    trading: "$84.669",
  };

  // Show toast helper
  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Search Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim().toLowerCase() === "test@gmail.com") {
      setIsVerified(true);
      setUserName("System Root");
      setError("");
      triggerToast();
    } else {
      setIsVerified(false);
      setUserName("");
      setError("User not found");
    }
  };

  // Reset state when user types something new
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    if (isVerified) {
      setIsVerified(false);
      setUserName("");
      setWallet("");
      setTransactionType("");
      setAmount("");
      setDescription("");
    }
    setError("");
  };

  // When wallet changes, reset transaction type
  const handleWalletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWallet(e.target.value);
    setTransactionType("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified || !wallet || !transactionType || !amount || !description) {
      alert("Please fill all required fields!");
      return;
    }
    alert(`Transaction Submitted!\nWallet: ${wallet}\nType: ${transactionType}\nAmount: $${amount}`);
  };

  const isFormValid =
    isVerified && wallet && transactionType && amount && description;

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start relative">
      
      {/* Toast Notification - Top Right */}
      {showToast && (
        <div className="fixed top-20 right-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-green-500 overflow-hidden min-w-[280px]">
            <div className="flex items-start gap-3 p-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-gray-800 flex-1">
                User found successfully!
              </p>
              <button
                onClick={() => setShowToast(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="h-1 w-full bg-gray-100">
              <div
                className="h-full bg-green-500"
                style={{
                  animation: "progressBar 3s linear forwards",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>

      <div className="w-full flex flex-col gap-4">

        {/* 1. Page Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 mb-2 shadow-sm">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Credit / Debit Fund</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage user wallet transactions efficiently
          </p>
        </div>

        {/* 2. Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">

          {/* Card Header */}
          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Transaction Details
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Fill in the details to credit or debit funds
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>

              {/* Row 1: User ID + Search + User Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                {/* User ID with Search Button */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> User ID *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userId}
                      onChange={handleUserIdChange}
                      placeholder="Enter user ID"
                      className={`flex-1 px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={!userId.trim()}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1.5">{error}</p>
                  )}
                </div>

                {/* User Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> User Name
                  </label>
                  <input
                    type="text"
                    disabled
                    value={userName}
                    placeholder="User name will appear here"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Section 2: After verification */}
              {isVerified && (
                <div className="animate-in fade-in slide-in-from-top-3 duration-300">

                  {/* Wallet Balances */}
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1.5">
                      <Wallet className="w-3.5 h-3.5 text-[#D4AF37]" /> Current Wallet Balances
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-[#FFF9E6] border border-[#D4AF37]/30 rounded-lg">
                      <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                        <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center shrink-0">
                          <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Income Wallet</p>
                          <p className="text-sm font-bold text-green-700">{walletBalances.income}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                        <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Deposit Wallet</p>
                          <p className="text-sm font-bold text-blue-700">{walletBalances.deposit}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                        <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center shrink-0">
                          <Coins className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Trading Wallet</p>
                          <p className="text-sm font-bold text-purple-700">{walletBalances.trading}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Select Wallet + Transaction Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-[#D4AF37]" /> Select Wallet *
                      </label>
                      <div className="relative">
                        <select
                          value={wallet}
                          onChange={handleWalletChange}
                          className="w-full appearance-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700"
                        >
                          <option value="" disabled>-- Select Wallet --</option>
                          <option value="Income Wallet">Income Wallet</option>
                          <option value="Deposit Wallet">Deposit Wallet</option>
                          <option value="Trading Wallet">Trading Wallet</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-[#D4AF37]" /> Transaction Type *
                      </label>
                      <div className="relative">
                        <select
                          value={transactionType}
                          onChange={(e) => setTransactionType(e.target.value)}
                          disabled={!wallet}
                          className="w-full appearance-none px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                          <option value="" disabled>-- Select Type --</option>
                          <option value="Credit">Credit</option>
                          <option value="Debit">Debit</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Enter Amount */}
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" /> Enter Amount *
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={!transactionType}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Row 4: Description */}
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                      <Wallet className="w-3.5 h-3.5 text-[#D4AF37]" /> Description *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={!transactionType}
                      placeholder="Enter transaction description"
                      rows={4}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white resize-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>

                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full flex justify-center items-center gap-2 py-3 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-4 h-4" />
                  Submit Transaction
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* 3. Important Information Box */}
        <div className="bg-[#FFF9E6] border border-[#D4AF37]/30 rounded-xl p-5 flex gap-4 w-full">
          <div className="shrink-0 rounded-full bg-[#D4AF37]/20 p-1.5 mt-0.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">Important Information</h4>
            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
              <li>Please ensure the user ID is valid before proceeding</li>
              <li>Debit transactions cannot exceed the current wallet balance</li>
              <li>All transactions are recorded for audit purposes</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}