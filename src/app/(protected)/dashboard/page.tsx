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
    <>
      <PageHeader title="Dashboard" description="An overview of your workspace." />
      <SummaryCards />
         <NormalInvestmentOverview />
          <PackageInvestmentOverview />
           <PackageBreakdownTable />
             <IncomeOverview />
              <BoosterOverview />
      <WithdrawalOverview />
        <RecentActivityTables />
      <BottomSummaryMetrics />
    </>
  );
}
