"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/UserRoleTabs.tsx
// ─────────────────────────────────────────────

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROLE_LABELS, ROLES_WITH_DETAIL_VIEW, User, UserRole } from "./types";
import { ComponentType } from "react";
import { ProviderRoleView } from "./role-views/ProviderRoleView";
import { VendorRoleView } from "./role-views/VendorRoleView";
import { EmployerRoleView } from "./role-views/EmployerRoleView";

interface UserRoleTabsProps {
  user: User;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onAction: (
    userId: string,
    action: "block_role" | "unblock_role",
    role: UserRole,
  ) => void;
}

const ROLE_VIEW_MAP: Partial<
  Record<
    UserRole,
    ComponentType<{ user: User; onAction: UserRoleTabsProps["onAction"] }>
  >
> = {
  provider: ProviderRoleView,
  vendor: VendorRoleView,
  employer: EmployerRoleView,
};

export function UserRoleTabs({
  user,
  activeRole,
  onRoleChange,
  onAction,
}: UserRoleTabsProps) {
  const detailRoles = user.roles.filter((r): r is UserRole =>
    ROLES_WITH_DETAIL_VIEW.includes(r),
  );

  if (detailRoles.length === 0) return null;

  // Single role — no tab strip needed
  if (detailRoles.length === 1) {
    const View = ROLE_VIEW_MAP[detailRoles[0]];
    return View ? <View user={user} onAction={onAction} /> : null;
  }

  // Multiple roles — use shadcn Tabs matching the checkout page pattern
  return (
    <Tabs
      value={activeRole}
      onValueChange={(v) => onRoleChange(v as UserRole)}
      className="w-full"
    >
      <TabsList className="inline-flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm mb-4">
        {detailRoles.map((role) => (
          <TabsTrigger
            key={role}
            value={role}
            className="px-5 py-2 text-sm font-medium rounded-lg text-gray-600 data-[state=active]:bg-primary-c data-[state=active]:text-white transition-all"
          >
            {ROLE_LABELS[role]}
          </TabsTrigger>
        ))}
      </TabsList>

      {detailRoles.map((role) => {
        const View = ROLE_VIEW_MAP[role];
        if (!View) return null;
        return (
          <TabsContent key={role} value={role}>
            <View user={user} onAction={onAction} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
