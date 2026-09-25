import { PageHeader } from "@/components/common/PageHeader";
import { UsersTable } from "@/features/users/components/UsersTable";

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Admin Users" description="Manage admin users for this workspace." />
      <UsersTable />
    </>
  );
}
