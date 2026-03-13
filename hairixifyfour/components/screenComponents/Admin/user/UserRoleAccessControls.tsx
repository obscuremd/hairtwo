"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/UserRoleAccessControls.tsx
// Block / unblock for roles without a detail view
// ─────────────────────────────────────────────

import { CheckCircle, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoCard } from "./InfoCard";
import { RoleBadge } from "./RoleBadge";
import { ROLES_WITH_DETAIL_VIEW, User, UserRole } from "./types";

interface UserRoleAccessControlsProps {
  user: User;
  onAction: (
    userId: string,
    action: "block_role" | "unblock_role",
    role: UserRole,
  ) => void;
}

export function UserRoleAccessControls({
  user,
  onAction,
}: UserRoleAccessControlsProps) {
  const simpleRoles = user.roles.filter(
    (r) => !ROLES_WITH_DETAIL_VIEW.includes(r),
  );

  if (simpleRoles.length === 0) return null;

  return (
    <InfoCard title="Role Access Controls">
      <div className="space-y-2">
        {simpleRoles.map((role) => {
          const isBlocked = user.blockedRoles.includes(role);
          return (
            <div
              key={role}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <RoleBadge role={role} blocked={isBlocked} size="md" />
                {isBlocked && (
                  <span className="text-xs text-rose-500">Access blocked</span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onAction(
                    user.id,
                    isBlocked ? "unblock_role" : "block_role",
                    role,
                  )
                }
                className={
                  isBlocked
                    ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    : "border-rose-200 text-rose-600 hover:bg-rose-50"
                }
              >
                {isBlocked ? (
                  <CheckCircle size={13} className="mr-1.5" />
                ) : (
                  <ShieldOff size={13} className="mr-1.5" />
                )}
                {isBlocked ? "Restore Access" : "Block Role"}
              </Button>
            </div>
          );
        })}
      </div>
    </InfoCard>
  );
}
