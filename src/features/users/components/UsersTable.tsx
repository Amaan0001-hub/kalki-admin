"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/common/DataTable";
import { useUsers } from "@/features/users/hooks/useUsers";
import { formatDate } from "@/lib/utils";
import type { User } from "@/features/users/types";
import type { TableColumn } from "@/components/ui/Table";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

const columns: TableColumn<User>[] = [
  { key: "name", header: "Name", render: (user) => user.name },
  { key: "email", header: "Email", render: (user) => user.email },
  {
    key: "status",
    header: "Status",
    render: (user) => (
      <Badge variant={user.isActive ? "success" : "default"}>
        {user.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  { key: "createdAt", header: "Joined", render: (user) => formatDate(user.createdAt) },
];

export function UsersTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useUsers({ page, pageSize: DEFAULT_PAGE_SIZE });

  return (
    <DataTable<User>
      columns={columns}
      data={data?.items ?? []}
      getRowId={(user) => user.id}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      page={data?.page ?? page}
      totalPages={data?.totalPages ?? 1}
      onPageChange={setPage}
      emptyTitle="No users yet"
    />
  );
}
