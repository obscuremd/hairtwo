"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/UserStatsBar.tsx
// ─────────────────────────────────────────────

import { User } from "./types";

interface StatItem {
  label: string;
  value: number;
}

interface UserStatsBarProps {
  users: User[];
}

export function UserStatsBar({ users }: UserStatsBarProps) {
  const stats: StatItem[] = [
    { label: "Total Users", value: users.length },
    {
      label: "Active",
      value: users.filter((u) => u.status === "active").length,
    },
    {
      label: "Suspended",
      value: users.filter((u) => u.status === "suspended").length,
    },
    {
      label: "Providers",
      value: users.filter((u) => u.roles.includes("provider")).length,
    },
    {
      label: "Vendors",
      value: users.filter((u) => u.roles.includes("vendor")).length,
    },
    {
      label: "Employers",
      value: users.filter((u) => u.roles.includes("employer")).length,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="shadow-sm py-2 px-4 rounded-md flex items-center gap-4 border border-gray-100"
        >
          <div className="h-9 w-9 rounded-md bg-primary-c/10 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary-c" />
          </div>
          <div>
            <p className="text-sm font-semibold text-t-primary tabular-nums">
              {stat.value}
            </p>
            <p className="text-xs text-t-secondary">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
