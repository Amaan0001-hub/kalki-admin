import { PageHeader } from "@/components/common/PageHeader";
import { SummaryCards } from "@/features/dashboard/components/SummaryCards";
import { NormalInvestmentOverview } from "@/features/dashboard/components/NormalInvestmentOverview";
import { PackageInvestmentOverview } from "@/features/dashboard/components/PackageInvestmentOverview";
import { PackageBreakdownTable } from "@/features/dashboard/components/PackageBreakdownTable";
import { IncomeOverview } from "@/features/dashboard/components/IncomeOverview";
import { BoosterOverview } from "@/features/dashboard/components/BoosterOverview";
import { WithdrawalOverview } from "@/features/dashboard/components/WithdrawalOverview";
import { RecentActivityTables } from "@/features/dashboard/components/RecentActivityTables";
import { BottomSummaryMetrics } from "@/features/dashboard/components/BottomSummaryMetrics";

export default function DashboardPage() {
  return (
     <div className="flex w-full flex-col gap-6">
      {/* Page Header */}
      <PageHeader title="Dashboard Overview" description="Welcome back, Super Admin! Here's what's happening with your platform today." />

     
      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6">
        <SummaryCards />
        <NormalInvestmentOverview />
        <PackageInvestmentOverview />
        <PackageBreakdownTable />
        <IncomeOverview />
        <BoosterOverview />
        <WithdrawalOverview />
        <RecentActivityTables />
        <BottomSummaryMetrics />
      </div>
    </div>
  );
}