"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/RoleBadge.tsx
// ─────────────────────────────────────────────

import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROLE_COLORS, ROLE_LABELS } from "./types";
import { UserRole } from "./types";

interface RoleBadgeProps {
  role: UserRole;
  blocked?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function RoleBadge({
  role,
  blocked = false,
  size = "sm",
  className,
}: RoleBadgeProps) {
  const colors = ROLE_COLORS[role];
  const label = ROLE_LABELS[role];

  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  if (blocked) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full font-medium border",
          "bg-gray-50 text-gray-400 border-gray-200 line-through",
          sizeClasses,
          className,
        )}
      >
        <Ban size={10} className="text-rose-400 shrink-0" />
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses,
        className,
      )}
    >
      {label}
    </span>
  );
}
