"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { formatCurrency } from "@/lib/utils";

export function SummaryCards() {
  const { data, isLoading, isError, refetch } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total users</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{data.TotalTeam || 0}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total transactions</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{data.ActiveTeam || 0}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Revenue this month</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {formatCurrency(data.TotalIncome || 0)}
        </CardContent>
      </Card>
    </div>
  );
}