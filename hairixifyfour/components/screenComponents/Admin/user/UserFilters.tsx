"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/UserFilters.tsx
// ─────────────────────────────────────────────

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ROLE_LABELS, UserFiltersState, UserRole, UserStatus } from "./types";

interface UserFiltersProps {
  filters: UserFiltersState;
  onChange: (filters: UserFiltersState) => void;
}

const ALL_ROLES = Object.keys(ROLE_LABELS) as UserRole[];
const ALL_STATUSES: UserStatus[] = ["active", "suspended", "pending"];

const selectClass =
  "h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 " +
  "focus:outline-none focus:ring-2 focus:ring-primary-c/20 focus:border-primary-c/40 " +
  "transition-all appearance-none cursor-pointer pr-8 " +
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")] " +
  "bg-no-repeat bg-[right_10px_center] bg-[length:14px]";

export function UserFilters({ filters, onChange }: UserFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-[220px]">
        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <Input
          type="text"
          placeholder="Search by name or email…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-9 h-10 border-gray-200 focus-visible:ring-primary-c/20 focus-visible:border-primary-c/40 placeholder:text-gray-400 text-sm"
        />
      </div>

      {/* Role filter */}
      <select
        value={filters.role}
        onChange={(e) =>
          onChange({ ...filters, role: e.target.value as UserRole | "all" })
        }
        className={selectClass}
      >
        <option value="all">All Roles</option>
        {ALL_ROLES.map((r) => (
          <option key={r} value={r}>
            {ROLE_LABELS[r]}
          </option>
        ))}
      </select>

      {/* Status filter */}
      <select
        value={filters.status}
        onChange={(e) =>
          onChange({
            ...filters,
            status: e.target.value as UserStatus | "all",
          })
        }
        className={selectClass}
      >
        <option value="all">All Statuses</option>
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
