"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { useDashboardSummary } from "@/features/dashboard/hooks/useDashboardSummary";
import { formatCurrency } from "@/lib/utils";
import {
  Activity,
  Banknote,
  BriefcaseBusiness,
  CalendarDays,
  Coins,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

type SummaryMetricKey =
  | "TodayBusiness"
  | "TodayDeposit"
  | "TotalActivated"
  | "TotalBusiness"
  | "TotalDepositWallet"
  | "TotalIncomeWallet"
  | "TotalIncomeWithdrawal"
  | "TotalJoining"
  | "TotalROI"
  | "TotalROIWithdrawal"
  | "TotalROIwallet"
  | "TotalToadyJoining"
  | "NotActivated"
  | "WorkingIncomeToday"
  | "WorkingIncomeTotal";

const metricGroups: {
  title: string;
  icon: typeof Users;
  metrics: { key: SummaryMetricKey; label: string; type: "count" | "currency" }[];
}[] = [
    {
      title: "Joining Overview",
      icon: Users,
      metrics: [
        { key: "TotalJoining", label: "Total Joining", type: "count" },
        { key: "TotalToadyJoining", label: "Today's Joining", type: "count" },
        { key: "TotalActivated", label: "Total Activated", type: "count" },
        { key: "NotActivated", label: "Not Activated", type: "count" },
      ],
    },
    {
      title: "Business & Deposits",
      icon: BriefcaseBusiness,
      metrics: [
        { key: "TodayBusiness", label: "Today's Business", type: "currency" },
        { key: "TotalBusiness", label: "Total Business", type: "currency" },
        { key: "TodayDeposit", label: "Today's Deposit", type: "currency" },
        { key: "TotalDepositWallet", label: "Total Deposit Wallet", type: "currency" },
      ],
    },
    {
      title: "Income Wallet",
      icon: Wallet,
      metrics: [
        { key: "TotalIncomeWallet", label: "Total Income Wallet", type: "currency" },
        { key: "TotalIncomeWithdrawal", label: "Income Withdrawals", type: "currency" },
        { key: "WorkingIncomeToday", label: "Today's Working Income", type: "currency" },
        { key: "WorkingIncomeTotal", label: "Total Working Income", type: "currency" },
      ],
    },
    {
      title: "ROI Overview",
      icon: TrendingUp,
      metrics: [
        { key: "TotalROI", label: "Total ROI", type: "currency" },
        { key: "TotalROIWithdrawal", label: "ROI Withdrawals", type: "currency" },
        { key: "TotalROIwallet", label: "ROI Wallet", type: "currency" },
      ],
    },
  ];

export function SummaryCards() {
  const { data, isLoading, isError, refetch } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="mb-2 flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 15 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => refetch()} />;
  }
  return (
    <div className="flex w-full flex-col gap-6">
      {metricGroups.map((group) => {
        const GroupIcon = group.icon;
        return (
          <section key={group.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <GroupIcon className="h-5 w-5 text-gray-600" aria-hidden />
              <h2 className="text-lg font-semibold text-gray-800">{group.title}</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {group.metrics.map((metric) => {
                const MetricIcon =
                  metric.type === "count"
                    ? Users
                    : metric.key.includes("ROI")
                      ? Activity
                      : metric.key.includes("Deposit")
                        ? Banknote
                        : metric.key.includes("Today")
                          ? CalendarDays
                          : Coins;
                const value =
                  metric.key === "NotActivated"
                    ? Math.max(0, data.TotalJoining - data.TotalActivated)
                    : (data[metric.key] ?? 0);
                return (
                  <Card
                    key={metric.key}
                    className="border-t-4 border-t-blue-500 p-4 transition-shadow hover:shadow-md"
                  >
                    <CardHeader className="mb-2">
                      <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {metric.label}
                      </CardTitle>
                      <div className="rounded-md bg-blue-50 p-1.5">
                        <MetricIcon className="h-4 w-4 text-blue-600" aria-hidden />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        {metric.type === "currency"
                          ? formatCurrency(value)
                          : value.toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
