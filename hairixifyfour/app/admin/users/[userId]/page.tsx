"use client";

// ─────────────────────────────────────────────
// app/admin/users/[userId]/page.tsx
//
// userId param = the numeric user ID (from the table row).
// We use the single-user endpoint (GET /api/admin/users/:email)
// which requires the email — so we first resolve the email from
// the list endpoint, then fetch full detail.
//
// Strategy:
//   1. Load all users to find email by id (reuses GetAdminUsers)
//   2. Load single user by email for full detail (provider, etc.)
//   3. Merge: single-user data takes precedence, list data fills gaps
//   4. Status updates call UpdateAdminUserStatus (PUT by email)
// ─────────────────────────────────────────────

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { UserHeader } from "@/components/screenComponents/Admin/user/UserHeader";
import { UserRoleTabs } from "@/components/screenComponents/Admin/user/UserRoleTabs";
import { UserRoleAccessControls } from "@/components/screenComponents/Admin/user/UserRoleAccessControls";
import {
  ROLES_WITH_DETAIL_VIEW,
  User,
  UserRole,
} from "@/components/screenComponents/Admin/user/types";
import {
  GetAdminUsers,
  GetAdminUserByEmail,
  UpdateAdminUserStatus,
} from "@/utils/adminUsers";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active role tab for the role detail section
  const detailRoles =
    user?.roles.filter((r) => ROLES_WITH_DETAIL_VIEW.includes(r)) ?? [];
  const [activeRole, setActiveRole] = useState<UserRole | undefined>(undefined);

  // ── Load user ─────────────────────────────
  // Step 1: find email from the user list using the numeric id
  // Step 2: fetch single-user detail by email
  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Step 1 — resolve email from full list
    const listResult = await GetAdminUsers();
    if (!listResult.success || !listResult.users) {
      setError(listResult.message);
      setLoading(false);
      return;
    }

    const listUser = listResult.users.find((u) => u.id === params.userId);
    if (!listUser) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    // Step 2 — fetch full detail by email
    const detailResult = await GetAdminUserByEmail(listUser.email);
    if (detailResult.success && detailResult.user) {
      // Merge: detail response takes precedence, but keep location from list
      // (neither endpoint provides it yet — both default to "—")
      const merged: User = {
        ...listUser,
        ...detailResult.user,
        // Keep blockedRoles from local state (not persisted by API yet)
        blockedRoles: listUser.blockedRoles,
      };
      setUser(merged);
      // Set the first detail role as active tab
      const firstDetailRole = merged.roles.find((r) =>
        ROLES_WITH_DETAIL_VIEW.includes(r),
      );
      setActiveRole(firstDetailRole);
    } else {
      // Fall back to list data if single-user fetch fails
      setUser(listUser);
      const firstDetailRole = listUser.roles.find((r) =>
        ROLES_WITH_DETAIL_VIEW.includes(r),
      );
      setActiveRole(firstDetailRole);
    }

    setLoading(false);
  }, [params.userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUser();
  }, [loadUser]);

  // ── Actions ───────────────────────────────
  async function handleAction(
    userId: string,
    action: "block_user" | "activate_user" | "block_role" | "unblock_role",
    payload?: UserRole,
  ) {
    if (!user) return;
    const prevUser = user;

    // Optimistic local update
    setUser((prev) => {
      if (!prev || prev.id !== userId) return prev;
      switch (action) {
        case "block_user":
          return { ...prev, status: "inactive" };
        case "activate_user":
          return { ...prev, status: "active" };
        case "block_role":
          if (!payload || prev.blockedRoles.includes(payload)) return prev;
          return { ...prev, blockedRoles: [...prev.blockedRoles, payload] };
        case "unblock_role":
          return {
            ...prev,
            blockedRoles: prev.blockedRoles.filter((r) => r !== payload),
          };
        default:
          return prev;
      }
    });

    // API call for status changes
    if (action === "block_user" || action === "activate_user") {
      const newStatus = action === "block_user" ? "inactive" : "active";
      const result = await UpdateAdminUserStatus(user.email, newStatus);

      if (!result.success) {
        // Roll back
        setUser(prevUser);
        toast.error(result.message ?? "Failed to update user status");
      } else {
        toast.success(
          action === "block_user" ? "User suspended" : "User activated",
        );
      }
    }
  }

  // ── Loading state ─────────────────────────
  if (loading) {
    return (
      <div className="w-full space-y-8 min-h-screen">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28 rounded" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-48 rounded" />
              <Skeleton className="h-3.5 w-32 rounded" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-3.5 w-24 rounded" />
              <div className="flex gap-1.5 pt-1">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-gray-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error / not found state ───────────────
  if (error || !user) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
        <UserCircle2 size={40} className="text-gray-300" />
        <p className="text-gray-500 text-sm">{error ?? "User not found."}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadUser}>
            <RefreshCw size={13} className="mr-1.5" />
            Retry
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/users")}
          >
            <ArrowLeft size={14} className="mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  // ── Detail page ───────────────────────────
  return (
    <div className="w-full space-y-8 min-h-screen">
      {/* Page title */}
      <div className="space-y-3">
        <button
          onClick={() => router.push("/admin/users")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-t-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Users
        </button>

        <div className="flex items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <UserCircle2 className="size-6 text-t-secondary" />
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight">{user.name}</p>
            <p className="text-sm text-gray-500 font-mono mt-0.5">
              ID: {user.id}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 max-w-2xl">
          View detailed information about this user, manage their account
          status, and review role-specific data.
        </p>
      </div>

      {/* User identity card */}
      <UserHeader user={user} onAction={handleAction} />

      {/* Role-specific detail views (provider / vendor / employer) */}
      {detailRoles.length > 0 && activeRole && (
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-primary-c">Role Details</h2>
          <p className="text-sm text-gray-500">
            Role-specific data for this user. Switch tabs to view data from each
            of their active roles.
          </p>
          <div className="pt-4">
            <UserRoleTabs
              user={user}
              activeRole={activeRole}
              onRoleChange={setActiveRole}
              onAction={handleAction}
            />
          </div>
        </div>
      )}

      {/* Simple role access controls (client, staff, admin, super_admin) */}
      <UserRoleAccessControls user={user} onAction={handleAction} />
    </div>
  );
}
