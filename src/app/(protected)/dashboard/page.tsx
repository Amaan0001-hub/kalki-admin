import { PageHeader } from "@/components/common/PageHeader";
import { SummaryCards } from "@/features/dashboard/components/SummaryCards";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="An overview of your workspace." />
      <SummaryCards />
    </>
  );
}
