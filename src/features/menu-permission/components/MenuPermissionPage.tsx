"use client";

import { useState } from "react";
import {
  Check,
  Circle,
  KeyRound,
  ListFilter,
  LockKeyhole,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useMenuPermissions } from "@/features/menu-permission/hooks/useMenuPermissions";
import { usePermissionNames } from "@/features/menu-permission/hooks/usePermissionNames";
import { Spinner } from "@/components/ui/Spinner";

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
      {message}
    </p>
  );
}

export function MenuPermissionPage() {
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const namesQuery = usePermissionNames();
  const menusQuery = useMenuPermissions(selectedUsername);
  const filteredNames = (namesQuery.data ?? []).filter((name) =>
    name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const permissionMenus = menusQuery.data ?? [];
  const subMenuCount = permissionMenus.reduce((total, menu) => total + menu.subMenus.length, 0);
  const accessCount = permissionMenus.reduce(
    (total, menu) =>
      total + menu.subMenus.filter((item) => item.permission?.toLowerCase() === "access").length,
    0,
  );
  const noAccessCount = permissionMenus.reduce(
    (total, menu) =>
      total +
      menu.subMenus.filter((item) => item.permission?.toLowerCase() === "not access").length,
    0,
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6">
      <header className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shadow-sm">
          <ShieldCheck className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Menu Permission</h1>
          <p className="text-sm text-slate-500">
            Review menu access assigned to each admin account.
          </p>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">UserNames</h2>
                <p className="mt-0.5 text-xs text-slate-500">Choose an account to inspect</p>
              </div>
              {!namesQuery.isLoading && !namesQuery.isError && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {namesQuery.data?.length ?? 0}
                </span>
              )}
            </div>
          </div>

          {!namesQuery.isLoading && !namesQuery.isError && (namesQuery.data?.length ?? 0) > 0 && (
            <div className="p-3">
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search Usernames"
                  aria-label="Search admin names"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
                />
              </label>
            </div>
          )}

          <div className="max-h-[calc(100dvh-23rem)] overflow-y-auto px-3 pb-3">
            {namesQuery.isLoading ? (
              <div
                className="flex items-center gap-2 px-2 py-3 text-sm text-slate-500"
                role="status"
              >
                <Spinner className="h-4 w-4" />
                Loading names...
              </div>
            ) : namesQuery.isError ? (
              <div className="p-2">
                <ErrorMessage
                  message={
                    namesQuery.error instanceof Error
                      ? namesQuery.error.message
                      : "Failed to load admin names."
                  }
                />
                <button
                  type="button"
                  onClick={() => void namesQuery.refetch()}
                  className="mt-3 text-sm font-medium text-amber-700 hover:text-amber-800"
                >
                  Try again
                </button>
              </div>
            ) : filteredNames.length ? (
              <ul className="flex flex-col gap-1">
                {filteredNames.map((name) => {
                  const isSelected = selectedUsername === name;
                  return (
                    <li key={name}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedUsername(name)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${isSelected
                          ? "bg-amber-50 font-semibold text-amber-900 ring-1 ring-inset ring-amber-200"
                          : "text-slate-700 hover:bg-slate-50"
                          }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${isSelected
                            ? "bg-amber-200 text-amber-900"
                            : "bg-slate-100 text-slate-500"
                            }`}
                        >
                          {name.slice(0, 1).toUpperCase()}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{name}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-2 py-4 text-center text-sm text-slate-500">
                {search ? "No admins match your search." : "No admin names found."}
              </p>
            )}
          </div>
        </section>

        <section className="flex max-h-[calc(100dvh-15rem)] min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Menu permissions</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                {selectedUsername
                  ? "Access assigned to this admin"
                  : "Select an admin to view their access"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {selectedUsername && (
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                  {selectedUsername}
                </span>
              )}
              {selectedUsername && (
                <button
                  type="button"
                  onClick={() => void menusQuery.refetch()}
                  disabled={menusQuery.isFetching}
                  aria-label="Refresh menu permissions"
                  title="Refresh permissions"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${menusQuery.isFetching ? "animate-spin" : ""}`}
                    aria-hidden
                  />
                </button>
              )}
            </div>
          </div>

          {!selectedUsername ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <ListFilter className="h-6 w-6" aria-hidden />
              </span>
              <p className="font-semibold text-slate-800">Choose an admin</p>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                Select a name from the list to see its menus and permission levels.
              </p>
            </div>
          ) : menusQuery.isLoading ? (
            <div
              className="flex flex-1 items-center justify-center gap-2 py-10 text-sm text-slate-500"
              role="status"
            >
              <Spinner className="h-4 w-4" /> Loading permissions...
            </div>
          ) : menusQuery.isError ? (
            <div className="p-5">
              <ErrorMessage
                message={
                  menusQuery.error instanceof Error
                    ? menusQuery.error.message
                    : "Failed to load menu permissions."
                }
              />
              <button
                type="button"
                onClick={() => void menusQuery.refetch()}
                className="mt-3 text-sm font-medium text-amber-700 hover:text-amber-800"
              >
                Try again
              </button>
            </div>
          ) : menusQuery.data?.length ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="grid shrink-0 grid-cols-3 gap-3 border-b border-slate-100 bg-slate-50/70 p-4 sm:p-5">
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ListFilter className="h-4 w-4" aria-hidden />
                    Menus
                  </div>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {permissionMenus.length}
                  </p>
                  <p className="text-[11px] text-slate-500">{subMenuCount} submenus</p>
                </div>
                <div className="rounded-lg border border-green-100 bg-white p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <KeyRound className="h-4 w-4 text-green-600" aria-hidden />
                    Access
                  </div>
                  <p className="mt-1 text-xl font-semibold text-green-700">{accessCount}</p>
                </div>
                <div className="rounded-lg border border-red-100 bg-white p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <LockKeyhole className="h-4 w-4 text-red-600" aria-hidden />
                    No access
                  </div>
                  <p className="mt-1 text-xl font-semibold text-red-700">{noAccessCount}</p>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-auto">
                <table className="w-full min-w-[600px] border-collapse text-left text-sm text-slate-700">
                  <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <tr>
                      <th className="border-b border-r border-slate-200 px-4 py-3">Menu name</th>
                      <th className="border-b border-r border-slate-200 px-4 py-3">Submenu name</th>
                      <th className="border-b border-slate-200 px-4 py-3">Permission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {permissionMenus.map((menu) =>
                      menu.subMenus.length ? (
                        menu.subMenus.map((subMenu, index) => (
                          <tr key={subMenu.id} className="transition-colors hover:bg-amber-50/40">
                            {index === 0 && (
                              <th
                                scope="rowgroup"
                                rowSpan={menu.subMenus.length}
                                className="border-r border-slate-100 px-4 py-3 align-top font-medium text-slate-900"
                              >
                                {menu.name}
                              </th>
                            )}
                            <td className="border-r border-slate-100 px-4 py-3">
                              <span className="flex items-start gap-2">
                                <Circle
                                  className="mt-1 h-3 w-3 shrink-0 text-amber-600"
                                  aria-hidden
                                />
                                {subMenu.name}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {subMenu.permission ? (
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${subMenu.permission.toLowerCase() === "not access"
                                    ? "bg-red-50 text-red-700"
                                    : "bg-green-50 text-green-700"
                                    }`}
                                >
                                  {subMenu.permission}
                                </span>
                              ) : (
                                <span className="text-slate-400">Not specified</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key={menu.id} className="transition-colors hover:bg-amber-50/40">
                          <th
                            scope="row"
                            className="border-r border-slate-100 px-4 py-3 font-medium text-slate-900"
                          >
                            {menu.name}
                          </th>
                          <td className="border-r border-slate-100 px-4 py-3 text-slate-400">—</td>
                          <td className="px-4 py-3 text-slate-400">—</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="px-5 py-10 text-center text-sm text-slate-500">
              No menu permissions found for this admin.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
