"use client";

// ─────────────────────────────────────────────
// app/admin/users/page.tsx
// ─────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, SlidersHorizontal, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStatsBar } from "@/components/screenComponents/Admin/user/UserStatsBar";
import { UserFilters } from "@/components/screenComponents/Admin/user/UserFilters";
import { UsersTable } from "@/components/screenComponents/Admin/user/UsersTable";
import {
  User,
  UserFiltersState,
  UserRole,
} from "@/components/screenComponents/Admin/user/types";
import { GetAdminUsers, UpdateAdminUserStatus } from "@/utils/adminUsers";
import { toast } from "sonner";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<UserFiltersState>({
    search: "",
    role: "all",
    status: "all",
  });

  // ── Load all users ────────────────────────
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await GetAdminUsers();
    if (result.success && result.users) {
      setUsers(result.users);
    } else {
      setError(result.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, [loadUsers]);

  // ── Filtering ─────────────────────────────
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

  // ── Actions ───────────────────────────────
  // Optimistic update: apply the change locally immediately,
  // then call the API. Roll back + show error if it fails.
  async function handleAction(
    userId: string,
    action: "block_user" | "activate_user" | "block_role" | "unblock_role",
    payload?: UserRole,
  ) {
    const target = users.find((u) => u.id === userId);
    if (!target) return;

    // ── Local optimistic update ──
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        switch (action) {
          case "block_user":
            return { ...u, status: "inactive" };
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

    // ── API call for status changes ──
    // block_role / unblock_role are local-only until the API supports it
    if (action === "block_user" || action === "activate_user") {
      const newStatus = action === "block_user" ? "inactive" : "active";
      const result = await UpdateAdminUserStatus(target.email, newStatus);

      if (!result.success) {
        // Roll back
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, status: target.status } : u,
          ),
        );
        toast.error(result.message ?? "Failed to update user status");
      } else {
        toast.success(
          action === "block_user" ? "User suspended" : "User activated",
        );
      }
    }
  }

  // ── Render ────────────────────────────────
  return (
    <div className="w-full space-y-10 min-h-screen">
      {/* Page title */}
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

      {/* Stats */}
      {loading ? <UserStatsBarSkeleton /> : <UserStatsBar users={users} />}

      {/* Filters */}
      <div className="space-y-3">
        <UserFilters filters={filters} onChange={setFilters} />

        {filtersActive && !loading && (
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

      {/* Table / loading / error */}
      {loading ? (
        <UsersTableSkeleton />
      ) : error ? (
        <div className="rounded-xl border border-gray-100 shadow-sm px-6 py-16 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-gray-500">{error}</p>
          <Button variant="outline" size="sm" onClick={loadUsers}>
            <RefreshCw size={13} className="mr-1.5" />
            Retry
          </Button>
        </div>
      ) : (
        <UsersTable users={filteredUsers} onAction={handleAction} />
      )}
    </div>
  );
}

// ─── Loading skeletons ────────────────────────

function UserStatsBarSkeleton() {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-36 rounded-md" />
      ))}
    </div>
  );
}

function UsersTableSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gray-50/60 px-5 py-3 border-b border-gray-100">
        <Skeleton className="h-3.5 w-80 rounded" />
      </div>
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3.5 w-36 rounded" />
              <Skeleton className="h-3 w-48 rounded" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3.5 w-24 rounded hidden md:block" />
            <Skeleton className="h-8 w-8 rounded-lg ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
