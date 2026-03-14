"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/UserHeader.tsx
// ─────────────────────────────────────────────

import {
  Ban,
  Calendar,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "./RoleBadge";
import { STATUS_STYLES, STATUS_DOT, User, UserRole } from "./types";
import { ReactNode } from "react";

interface UserHeaderProps {
  user: User;
  onAction: (
    userId: string,
    action: "block_user" | "activate_user" | "block_role" | "unblock_role",
    payload?: UserRole,
  ) => void;
}

interface MetaItem {
  icon: ReactNode;
  label: string;
  value: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function UserHeader({ user, onAction }: UserHeaderProps) {
  const isActive = user.status === "active";

  const metaItems: MetaItem[] = [
    { icon: <Mail size={13} />, label: "Email", value: user.email },
    { icon: <Phone size={13} />, label: "Phone", value: user.phone },
    { icon: <MapPin size={13} />, label: "Location", value: user.location },
    {
      icon: <Calendar size={13} />,
      label: "Joined",
      value: formatDate(user.joinedAt),
    },
  ];

  const statusStyle = STATUS_STYLES[user.status] ?? STATUS_STYLES.inactive;
  const dotStyle = STATUS_DOT[user.status] ?? STATUS_DOT.inactive;

  const statusLabel =
    user.status === "active"
      ? "Active"
      : user.status === "inactive"
        ? "Inactive"
        : user.status === "suspended"
          ? "Suspended"
          : "Pending";

  return (
    <div className="rounded-xl border border-gray-100 shadow-sm p-5 sm:p-6">
      {/* Top row */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-c/10 border border-primary-c/20 flex items-center justify-center text-base sm:text-lg font-bold text-primary-c shrink-0">
            {user.initials}
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-t-primary tracking-tight">
              {user.name}
            </h2>
            <p className="text-xs text-t-secondary mt-0.5 font-mono">
              ID: {user.id}
            </p>

            {/* Roles */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {user.roles.map((role) => (
                <RoleBadge
                  key={role}
                  role={role}
                  blocked={user.blockedRoles.includes(role)}
                  size="md"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Suspend / Activate */}
        {isActive ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction(user.id, "block_user")}
            className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 shrink-0"
          >
            <Ban size={14} className="mr-2" />
            Suspend Account
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction(user.id, "activate_user")}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 shrink-0"
          >
            <CheckCircle size={14} className="mr-2" />
            Activate Account
          </Button>
        )}
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100">
        {metaItems.map((item) => (
          <div key={item.label}>
            <div className="flex items-center gap-1.5 text-[11px] text-t-secondary mb-1">
              {item.icon}
              {item.label}
            </div>
            <p className="text-sm text-t-primary truncate">
              {item.value || "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Status row */}
      <div className="mt-4 flex items-center gap-3 flex-wrap">
        {/* Account status */}
        <Badge
          variant="outline"
          className={`text-xs font-medium ${statusStyle}`}
        >
          <span
            className={`mr-1.5 inline-block w-1.5 h-1.5 rounded-full ${dotStyle}`}
          />
          {statusLabel}
        </Badge>

        {/* Email verification */}
        {user.emailVerified ? (
          <Badge
            variant="outline"
            className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            <ShieldCheck size={11} className="mr-1.5" />
            Email Verified
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-xs bg-amber-50 text-amber-700 border-amber-200"
          >
            <ShieldOff size={11} className="mr-1.5" />
            Email Unverified
          </Badge>
        )}

        <span className="text-xs text-t-secondary">
          Last updated {formatDate(user.lastActive)}
        </span>
      </div>
    </div>
  );
}
