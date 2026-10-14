"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Scale, Wallet, User, Search, ArrowRight, CheckCircle2,
  DollarSign, CreditCard, Coins, Loader2, ShieldCheck, X,
} from "lucide-react";
import {
  getUserWalletDetails,
  submitCreditDebit,
  type WalletDetails,
  type FundType,
  type FundTypeWiseCrDr,
  type CreditDebitPayload,
} from "../service/creditDebit.service";

export default function CreditDebitFund() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const [wallet, setWallet] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // API data
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null);
  const [fundTypes, setFundTypes] = useState<FundType[]>([]);
  const [crDrList, setCrDrList] = useState<FundTypeWiseCrDr[]>([]);

  // 👇 OTP flow
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingPayload, setPendingPayload] = useState<CreditDebitPayload | null>(null);

  // ============================================
  // 🔍 Mutation — Fetch wallet details
  // ============================================
  const walletMutation = useMutation({
    mutationFn: (loginId: string) => getUserWalletDetails(loginId),
    onSuccess: (res) => {
      const data = res.data;
      if (res.statusCode === 200 && data?.WalletDetails) {
        setWalletDetails(data.WalletDetails);
        setFundTypes(data.FundTypes ?? []);
        setCrDrList(data.FundTypeWiseCrDrList ?? []);
        setUserName(data.WalletDetails.Name ?? "");
        setIsVerified(true);
        setError("");
        toast.success("User found successfully!");
      } else {
        resetVerification();
        setError("User not found");
      }
    },
    onError: (err: unknown) => {
      const e = err as {
        response?: { status?: number; data?: { message?: string } };
      };
      const status = e?.response?.status;
      const msg =
        e?.response?.data?.message ||
        (status === 401 ? "Unauthorized. Please login again." : "User not found");
      resetVerification();
      setError(msg);
      toast.error(msg);
    },
  });

  // ============================================
  // 💾 Mutation — Final submit with OTP
  // ============================================
  const submitMutation = useMutation({
    mutationFn: (payload: CreditDebitPayload) => submitCreditDebit(payload),
    onSuccess: (res) => {
      if (res.statusCode === 200) {
        toast.success(res.message || "Transaction completed successfully!");
        handleFullReset();
      } else {
        toast.error(res.message || "Transaction failed");
      }
    },
    onError: (err: unknown) => {
      const e = err as {
        response?: { status?: number; data?: { message?: string } };
      };
      const status = e?.response?.status;
      const msg =
        e?.response?.data?.message ||
        (status === 401
          ? "Unauthorized. Please login again."
          : "Failed to process transaction.");
      toast.error(msg);
    },
  });

  // ============================================
  // Helpers
  // ============================================
  const resetVerification = () => {
    setIsVerified(false);
    setUserName("");
    setWalletDetails(null);
    setFundTypes([]);
    setCrDrList([]);
  };

  const handleFullReset = () => {
    setUserId("");
    setUserName("");
    setIsVerified(false);
    setError("");
    setWallet("");
    setTransactionType("");
    setAmount("");
    setDescription("");
    setWalletDetails(null);
    setFundTypes([]);
    setCrDrList([]);
    setShowOtpForm(false);
    setOtp("");
    setPendingPayload(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = userId.trim();
    if (!trimmed) return;
    walletMutation.mutate(trimmed);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    if (isVerified) {
      resetVerification();
      setWallet("");
      setTransactionType("");
      setAmount("");
      setDescription("");
    }
    setError("");
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWallet(e.target.value);
    setTransactionType("");
  };

  // 👇 Step 1: Form submit → save data + open OTP form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified || !wallet || !transactionType || !amount || !description) {
      toast.error("Please fill all required fields!");
      return;
    }


    const payload: CreditDebitPayload = {
      Wallettype: wallet,
      CrDr: Number(transactionType),
      Authlogin: userId.trim(),
      Amt: Number(amount),
      Remark: description.trim(),
      CrdDbtOTP: "123456",
    };

    setPendingPayload(payload);
    setShowOtpForm(true);
    setOtp("");
  };

  // 👇 Step 2: OTP submit → call final API
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pendingPayload) return;
    if (!otp.trim() || otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    submitMutation.mutate({
      ...pendingPayload,
      CrdDbtOTP: otp.trim(),
    });
  };

  // 👇 OTP form cancel
  const handleOtpCancel = () => {
    setShowOtpForm(false);
    setOtp("");
    setPendingPayload(null);
  };

  const isFormValid =
    isVerified && wallet && transactionType && amount && description;

  const isLoading = walletMutation.isPending;
  const isSubmitting = submitMutation.isPending;

  return (
    <div className="w-full bg-[#FAF6EC] px-4 pt-1 pb-4 font-sans flex justify-center items-start relative">
      <div className="w-full flex flex-col gap-4">

        {/* 1. Page Header */}
        
        <div className="flex items-center gap-3">
          {/* Icon — left */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37] text-gray-900 shadow-sm shrink-0">
            <Scale className="w-6 h-6" />
          </div>

          {/* Text — right, title upar, subtitle neeche */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Credit / Debit Fund</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage user wallet transactions efficiently
            </p>
          </div>
        </div>
        {/* 2. Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">

          <div className="bg-[#D4AF37] px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Transaction Details
            </h2>
            <p className="text-gray-800 text-xs mt-1">
              Fill in the details to credit or debit funds
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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
                      className={`flex-1 px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white ${error ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={!userId.trim() || isLoading}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed whitespace-nowrap"
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
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1.5">{error}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" /> User Name
                  </label>
                  <input
                    type="text"
                    disabled
                    value={isLoading ? "Loading..." : userName}
                    placeholder="User name will appear here"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* After verification */}
              {isVerified && walletDetails && (
                <div className="animate-in fade-in slide-in-from-top-3 duration-300">

                  {/* Wallet Cards */}
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
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Working Wallet</p>
                          <p className="text-sm font-bold text-green-700">
                            ${Number(walletDetails.IncomeWallet ?? 0).toFixed(4)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                        <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Deposit Wallet</p>
                          <p className="text-sm font-bold text-blue-700">
                            ${Number(walletDetails.DepositWallet ?? 0).toFixed(4)}
                          </p>
                        </div>
                      </div>

                      {/* <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                        <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center shrink-0">
                          <Coins className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Rent Wallet</p>
                          <p className="text-sm font-bold text-purple-700">
                            ${Number(walletDetails.RentWallet ?? 0).toFixed(4)}
                          </p>
                        </div>
                      </div> */}

                      <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                        <div className="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center shrink-0">
                          <Coins className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">ROI Wallet</p>
                          <p className="text-sm font-bold text-orange-700">
                            ${Number(walletDetails.ROIWallet ?? 0).toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Select Wallet + Transaction Type */}
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

                          {fundTypes.length > 0 ? (
                            fundTypes.map((f, idx) => (
                              <option key={f.Id ?? idx} value={f.Ftype}>
                                {f.Type}
                              </option>
                            ))
                          ) : (
                            <>
                              <option value="pp@ww">Income Wallet</option>
                              <option value="dw@d">Deposit Wallet</option>
                              <option value="wY$ro">Trading Wallet</option>
                            </>
                          )}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
                          {crDrList.length > 0 ? (
                            crDrList.map((c) => (
                              <option key={c.Id} value={c.CrDr}>
                                {c.Type}
                              </option>
                            ))
                          ) : (
                            <>
                              <option value="1">Credit</option>
                              <option value="2">Debit</option>
                            </>
                          )}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" /> Enter Amount *
                    </label>
                    <input
                      type="number"
                      value={amount}
                      min="1" 
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={!transactionType}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Description */}
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

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full flex justify-center items-center gap-2 py-3 bg-[#D4AF37] text-gray-900 rounded-lg text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-4 h-4" />
                  Submit Transaction
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Important Info */}
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

      {/* ============================================
          🔐 OTP MODAL
          ============================================ */}
      {showOtpForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="bg-[#D4AF37] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg font-bold text-gray-900">OTP Verification</h2>
              </div>
              <button
                type="button"
                onClick={handleOtpCancel}
                disabled={isSubmitting}
                className="text-gray-900 hover:text-gray-700 transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleOtpSubmit}>
              <div className="p-6">

                <p className="text-sm text-gray-600 mb-4">
                  Enter the OTP sent to your registered email/mobile to confirm this transaction.
                </p>

                {/* Summary */}
                {pendingPayload && (
                  <div className="bg-[#FFF9E6] border border-[#D4AF37]/30 rounded-lg p-3 mb-4 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">User ID:</span>
                      <span className="font-bold text-gray-800">{pendingPayload.Authlogin}</span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-gray-500">Wallet:</span>
                      <span className="font-bold text-gray-800">{pendingPayload.Wallettype}</span>
                    </div> */}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-bold text-gray-800">
                        {crDrList.find((c) => c.CrDr === pendingPayload.CrDr)?.Type ?? "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-bold text-gray-800">${pendingPayload.Amt}</span>
                    </div>
                  </div>
                )}

                {/* OTP Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                    Enter OTP *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    placeholder="• • • • • •"
                    autoFocus
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white disabled:bg-gray-100"
                  />
                  <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                    OTP is valid for 5 minutes
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  type="button"
                  onClick={handleOtpCancel}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!otp.trim() || otp.length < 4 || isSubmitting}
                  className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg bg-[#D4AF37] text-gray-900 text-sm font-bold hover:bg-[#B89328] transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Verify & Submit
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}