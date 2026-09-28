"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { formatCurrency } from "@/lib/utils";
import { Users, UserPlus, UserCheck } from "lucide-react";

export function SummaryCards() {
  const { data, isLoading, isError, refetch } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* Section Header: Users Overview */}
      <div className="flex items-center gap-2 mb-2">
        <Users className="h-5 w-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-800">Users Overview</h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        
        {/* Card 1: Total Users (Blue) */}
        <Card className="border-t-4 border-t-blue-500 p-5 transition-shadow hover:shadow-md">
          <CardHeader className="mb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Users
            </CardTitle>
            <div className="rounded-md bg-blue-50 p-1.5">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {data.TotalTeam || 0}
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Admin Placed (Purple) */}
        <Card className="border-t-4 border-t-purple-500 p-5 transition-shadow hover:shadow-md">
          <CardHeader className="mb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Admin Placed
            </CardTitle>
            <div className="rounded-md bg-purple-50 p-1.5">
              <UserPlus className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {data.ActiveTeam || 0}
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Self Placed (Green) */}
        <Card className="border-t-4 border-t-green-500 p-5 transition-shadow hover:shadow-md">
          <CardHeader className="mb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Self Placed
            </CardTitle>
            <div className="rounded-md bg-green-50 p-1.5">
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(data.TotalIncome || 0)}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}