import React from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Shield,
  UserCheck,
  DollarSign,
  Wallet,
  Download,
  UserPlus,
  Search,
  Filter,
  RotateCcw,
  Save,
  User
} from "lucide-react";

export default function UserManagement() {
  // Stats Data 
  const statsData = [
    { title: "TOTAL USERS", value: "11,079", icon: Users, borderColor: "border-l-blue-500", iconColor: "text-blue-500", bgColor: "bg-blue-50" },
    { title: "ACTIVE USERS", value: "7,653", icon: CheckCircle, borderColor: "border-l-green-500", iconColor: "text-green-500", bgColor: "bg-green-50" },
    { title: "INACTIVE USERS", value: "3,426", icon: XCircle, borderColor: "border-l-red-500", iconColor: "text-red-500", bgColor: "bg-red-50" },
    { title: "ADMIN PLACED", value: "371", icon: Shield, borderColor: "border-l-teal-500", iconColor: "text-teal-500", bgColor: "bg-teal-50" },
    { title: "SELF PLACED", value: "10,708", icon: UserCheck, borderColor: "border-l-purple-500", iconColor: "text-purple-500", bgColor: "bg-purple-50" },
    { title: "TOTAL INVESTMENT", value: "$17,914,226.78", icon: DollarSign, borderColor: "border-l-indigo-500", iconColor: "text-indigo-500", bgColor: "bg-indigo-50" },
    { title: "TOTAL WITHDRAWN", value: "$3,125,772.28", icon: Wallet, borderColor: "border-l-orange-500", iconColor: "text-orange-500", bgColor: "bg-orange-50" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-2 min-h-screen font-sans">
      
     {/* 1. Page Header  */}
<div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
  <div>
    <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
    <p className="text-sm text-gray-500 mt-1">Full user details with limited edit access</p>
  </div>
  <div className="flex items-center gap-3">
    <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition">
      <Download className="w-4 h-4" />
      Export CSV
    </button>
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">
      <UserPlus className="w-4 h-4" />
      Add User
    </button>
  </div>
</div>
    
      {/* 2. Stats Cards */}
<div className="flex w-full gap-2 md:gap-3 pb-4 mb-4">
  {statsData.map((stat, index) => {
    const Icon = stat.icon;
    return (
      <div
        key={index}
        className={`flex-1 min-w-0 bg-white rounded-lg border border-gray-100 shadow-sm border-l-4 ${stat.borderColor} p-2.5 md:p-3 flex items-center gap-2 relative overflow-hidden`}
      >
        {/* Icon Left Side */}
        <div className={`p-1.5 md:p-2 rounded-md ${stat.bgColor} shrink-0`}>
          <Icon className={`w-4 h-4 ${stat.iconColor}`} />
        </div>
        
        {/* Text Right Side */}
        <div className="flex flex-col min-w-0">
          <p className="text-sm md:text-base font-bold text-gray-800 leading-tight truncate">
            {stat.value}
          </p>
          <p className="text-[9px] md:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5 truncate">
            {stat.title}
          </p>
        </div>
      </div>
    );
  })}
</div>

      {/* 3. Main Content Area  */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        
        {/* Header & Filters */}
      <div className="p-5 border-b border-gray-200 bg-white rounded-t-lg">
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
    <div className="flex items-center gap-2">
      <Users className="w-5 h-5 text-gray-700" />
      <h2 className="text-lg font-semibold text-gray-800">All Users</h2>
    </div>
    <p className="text-xs text-gray-500">Showing 1-100 of 11079 users</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
    <div className="lg:col-span-1">
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Search</label>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Name, email or referral code..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
    
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Status</label>
      <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
        <option>All Status</option>
      </select>
    </div>

    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Placed By</label>
      <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
        <option>All</option>
      </select>
    </div>

    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Registered From</label>
      <input
        type="date"
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500"
      />
    </div>

    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Registered To</label>
      <input
        type="date"
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500"
      />
    </div>

    <div className="flex gap-2">
      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition w-full">
        <Filter className="w-4 h-4" /> Filter
      </button>
      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition w-full">
        <RotateCcw className="w-4 h-4" /> Reset
      </button>
    </div>
  </div>
</div>

        {/* 4. Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1400px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">User Info</th>
                <th className="px-4 py-3">Referral</th>
                <th className="px-4 py-3">Investment</th>
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3">Income</th>
                <th className="px-4 py-3">Extra</th>
                <th className="px-4 py-3">Placed By</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                {/* 1. # */}
                <td className="px-4 py-4 align-top font-medium">1</td>
                
                {/* 2. User Info */}
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium w-fit">NR 13</span>
                    <span className="font-semibold text-gray-800">nazrurana5</span>
                    <span className="text-[10px] text-gray-400">Joined: 17 Sep 2026</span>
                    <span className="text-[10px] text-gray-400">First Invest: No Investment</span>
                  </div>
                </td>

                {/* 3. Referral */}
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-12">My Code</span>
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium">KAL259900</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-12">Ref By</span>
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium">KAL726980</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-12">Directs</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-12">Position</span>
                      <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px] font-medium">Right</span>
                    </div>
                  </div>
                </td>

                {/* 4. Investment */}
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Total</span>
                      <span className="font-medium text-green-600">$0.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Subscription</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Working Cap.</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                  </div>
                </td>

                {/* 5. Business */}
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Left</span>
                      <span className="font-medium text-green-600">$0.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Right</span>
                      <span className="font-medium text-green-600">$0.00</span>
                    </div>
                  </div>
                </td>

                {/* 6. Income */}
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1">
                    {[
                      "Direct", "ROI", "Binary", "Level", "Rank", 
                      "Roi bonus income", "Direct bonus income", 
                      "T.Working", "T.ROI", "P Balance", "Special Income"
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between gap-4">
                        <span className="text-[10px] text-gray-500 whitespace-nowrap">{item}</span>
                        <span className="font-medium text-green-600">$0.00</span>
                      </div>
                    ))}
                  </div>
                </td>

                {/* 7. Extra */}
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Withdraw</span>
                      <span className="font-medium text-green-600">$0.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Rank</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Booster</span>
                      <span className="font-medium text-green-600">$0.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Boost W</span>
                      <span className="font-medium text-green-600">$0.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Amplifier w</span>
                      <span className="font-medium text-green-600">$5,250.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-500">Fund W</span>
                      <span className="font-medium text-green-600">$6.00</span>
                    </div>
                  </div>
                </td>

                {/* 8. Placed By */}
                <td className="px-4 py-4 align-top">
                  <span className="px-2 py-1 bg-cyan-50 text-cyan-600 rounded-full text-[10px] font-semibold">Self</span>
                </td>

                {/* 9. Status */}
                <td className="px-4 py-4 align-top">
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-semibold">Inactive</span>
                </td>

                {/* 10. Action */}
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-2 w-28">
                    <button className="flex items-center justify-center gap-1 w-full px-2 py-1.5 bg-green-500 text-white rounded text-[10px] font-medium hover:bg-green-600 transition">
                      <Save className="w-3 h-3" /> Save
                    </button>
                    <button className="w-full px-2 py-1.5 bg-blue-500 text-white rounded text-[10px] font-medium hover:bg-blue-600 transition">
                      Activate
                    </button>
                    <button className="flex items-center justify-center gap-1 w-full px-2 py-1.5 bg-orange-400 text-white rounded text-[10px] font-medium hover:bg-orange-500 transition">
                      <User className="w-3 h-3" /> Login As
                    </button>
                    <button className="w-full px-2 py-1.5 bg-blue-500 text-white rounded text-[10px] font-medium hover:bg-blue-600 transition">
                      Enable Bypass
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}