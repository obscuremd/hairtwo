"use client";

// ─────────────────────────────────────────────
// app/admin/users/[userId]/page.tsx
// ─────────────────────────────────────────────

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserHeader } from "@/components/screenComponents/Admin/user/UserHeader";
import { UserRoleTabs } from "@/components/screenComponents/Admin/user/UserRoleTabs";
import { UserRoleAccessControls } from "@/components/screenComponents/Admin/user/UserRoleAccessControls";
import {
  ROLES_WITH_DETAIL_VIEW,
  User,
  UserRole,
} from "@/components/screenComponents/Admin/user/types";
import { MOCK_USERS } from "@/components/screenComponents/Admin/user/mockUser";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const [user, setUser] = useState<User | undefined>(() =>
    MOCK_USERS.find((u) => u.id === params.userId),
  );

  const detailRoles =
    user?.roles.filter((r) => ROLES_WITH_DETAIL_VIEW.includes(r)) ?? [];

  const [activeRole, setActiveRole] = useState<UserRole | undefined>(
    detailRoles[0],
  );

  function handleAction(
    userId: string,
    action: "block_user" | "activate_user" | "block_role" | "unblock_role",
    payload?: UserRole,
  ) {
    setUser((prev) => {
      if (!prev || prev.id !== userId) return prev;
      switch (action) {
        case "block_user":
          return { ...prev, status: "suspended" };
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
  }

  // ── 404 ───────────────────────────────────
  if (!user) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
        <UserCircle2 size={40} className="text-gray-300" />
        <p className="text-gray-500 text-sm">User not found.</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/users")}
        >
          <ArrowLeft size={14} className="mr-2" />
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 min-h-screen">
      {/* ── Page title ───────────────────────── */}
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
            <p className="text-sm text-gray-500 font-mono mt-0.5">{user.id}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 max-w-2xl">
          View detailed information about this user, manage their role access,
          and review role-specific data.
        </p>
      </div>

      {/* ── User identity card ───────────────── */}
      <UserHeader user={user} onAction={handleAction} />

      {/* ── Role-specific detail views ───────── */}
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

      {/* ── Simple role access controls ──────── */}
      <UserRoleAccessControls user={user} onAction={handleAction} />
    </div>
  );
}
