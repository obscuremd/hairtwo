"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/UsersTable.tsx
// ─────────────────────────────────────────────

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoleBadge } from "./RoleBadge";
import { UserRowMenu } from "./UserRowMenu";
import { User, UserRole } from "./types";

interface UsersTableProps {
  users: User[];
  onAction: (
    userId: string,
    action: "block_user" | "activate_user" | "block_role" | "unblock_role",
    payload?: UserRole,
  ) => void;
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  suspended: "bg-rose-50 text-rose-700 border-rose-200",
  pending: "bg-sky-50 text-sky-700 border-sky-200",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function UsersTable({ users, onAction }: UsersTableProps) {
  const router = useRouter();

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 shadow-sm px-5 py-16 text-center text-sm text-gray-400">
        No users match the current filters.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <ScrollArea className="w-full">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {["User", "Roles", "Status", "Location", "Last Active", ""].map(
                (col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                className={`hover:bg-gray-50/60 transition-colors ${
                  i < users.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* User */}
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => router.push(`/admin/users/${user.id}`)}
                    className="flex items-center gap-3 text-left group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-c/10 border border-primary-c/20 flex items-center justify-center text-[11px] font-semibold text-primary-c shrink-0">
                      {user.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-t-primary group-hover:text-primary-c transition-colors">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-t-secondary mt-0.5">
                        {user.email}
                      </p>
                    </div>
                  </button>
                </td>

                {/* Roles */}
                <td className="px-5 py-3.5">
                  <div className="flex flex-wrap gap-1.5">
                    {user.roles.map((role) => (
                      <RoleBadge
                        key={role}
                        role={role}
                        blocked={user.blockedRoles.includes(role)}
                      />
                    ))}
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  <Badge
                    variant="outline"
                    className={`text-[11px] capitalize font-medium ${STATUS_STYLES[user.status] ?? ""}`}
                  >
                    <span
                      className={`mr-1.5 inline-block w-1.5 h-1.5 rounded-full ${
                        user.status === "active"
                          ? "bg-emerald-500"
                          : user.status === "suspended"
                            ? "bg-rose-500"
                            : "bg-sky-500"
                      }`}
                    />
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </td>

                {/* Location */}
                <td className="px-5 py-3.5 text-sm text-t-secondary whitespace-nowrap">
                  {user.location}
                </td>

                {/* Last active */}
                <td className="px-5 py-3.5 text-sm text-t-secondary whitespace-nowrap">
                  {formatDate(user.lastActive)}
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <UserRowMenu user={user} onAction={onAction} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
