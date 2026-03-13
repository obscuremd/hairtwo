"use client";

// ─────────────────────────────────────────────
// app/admin/users/page.tsx
// ─────────────────────────────────────────────

import { useMemo, useState } from "react";
import { SlidersHorizontal, Users, X } from "lucide-react";
import { MOCK_USERS } from "@/components/screenComponents/Admin/user/mockUser";
import { UserStatsBar } from "@/components/screenComponents/Admin/user/UserStatsBar";
import { UserFilters } from "@/components/screenComponents/Admin/user/UserFilters";
import { UsersTable } from "@/components/screenComponents/Admin/user/UsersTable";
import {
  User,
  UserFiltersState,
  UserRole,
} from "@/components/screenComponents/Admin/user/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [filters, setFilters] = useState<UserFiltersState>({
    search: "",
    role: "all",
    status: "all",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q);
      const matchesRole =
        filters.role === "all" || user.roles.includes(filters.role as UserRole);
      const matchesStatus =
        filters.status === "all" || user.status === filters.status;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, filters]);

  const filtersActive =
    filters.search !== "" || filters.role !== "all" || filters.status !== "all";

  function handleAction(
    userId: string,
    action: "block_user" | "activate_user" | "block_role" | "unblock_role",
    payload?: UserRole,
  ) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        switch (action) {
          case "block_user":
            return { ...u, status: "suspended" };
          case "activate_user":
            return { ...u, status: "active" };
          case "block_role":
            if (!payload || u.blockedRoles.includes(payload)) return u;
            return { ...u, blockedRoles: [...u.blockedRoles, payload] };
          case "unblock_role":
            return {
              ...u,
              blockedRoles: u.blockedRoles.filter((r) => r !== payload),
            };
          default:
            return u;
        }
      }),
    );
  }

  return (
    <div className="w-full space-y-10 min-h-screen">
      {/* ── Page title ───────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <Users className="size-6 text-t-secondary" />
          </div>
          <p className="text-3xl font-semibold tracking-tight">
            User Management
          </p>
        </div>
        <p className="text-sm text-gray-500 max-w-2xl">
          View and manage all platform users. Search by name or email, filter by
          role and status, and take action directly from the table.
        </p>
      </div>

      {/* ── Stats ────────────────────────────── */}
      <UserStatsBar users={users} />

      {/* ── Filters ──────────────────────────── */}
      <div className="space-y-3">
        <UserFilters filters={filters} onChange={setFilters} />

        {filtersActive && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <SlidersHorizontal size={13} />
            <span>
              {filteredUsers.length} result
              {filteredUsers.length !== 1 ? "s" : ""} matching filters
            </span>
            <button
              onClick={() =>
                setFilters({ search: "", role: "all", status: "all" })
              }
              className="ml-1 flex items-center gap-1 text-primary-c hover:text-primary-c/80 transition-colors text-sm"
            >
              <X size={12} />
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ── Table ────────────────────────────── */}
      <UsersTable users={filteredUsers} onAction={handleAction} />
    </div>
  );
}
