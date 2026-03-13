"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/UserRowMenu.tsx
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { Ban, CheckCircle, MoreHorizontal, ShieldOff } from "lucide-react";
import { ReactNode } from "react";
import { ROLE_LABELS, User, UserRole } from "./types";

interface UserRowMenuProps {
  user: User;
  onAction: (
    userId: string,
    action: "block_user" | "activate_user" | "block_role" | "unblock_role",
    payload?: UserRole,
  ) => void;
}

export function UserRowMenu({ user, onAction }: UserRowMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = user.status === "active";
  const close = () => setOpen(false);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
        aria-label="User actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-52 rounded-xl bg-white border border-gray-100 shadow-lg overflow-hidden py-1">
          {/* Account status */}
          <div className="py-1 border-b border-gray-100">
            {isActive ? (
              <MenuItem
                icon={<Ban size={13} className="text-rose-500" />}
                label="Suspend User"
                description="Block all platform access"
                danger
                onClick={() => {
                  onAction(user.id, "block_user");
                  close();
                }}
              />
            ) : (
              <MenuItem
                icon={<CheckCircle size={13} className="text-emerald-600" />}
                label="Activate User"
                description="Restore full access"
                onClick={() => {
                  onAction(user.id, "activate_user");
                  close();
                }}
              />
            )}
          </div>

          {/* Role access */}
          {user.roles.length > 0 && (
            <div className="py-1">
              <p className="px-3 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Role Access
              </p>
              {user.roles.map((role) => {
                const isBlocked = user.blockedRoles.includes(role);
                return (
                  <MenuItem
                    key={role}
                    icon={
                      <ShieldOff
                        size={13}
                        className={
                          isBlocked ? "text-emerald-600" : "text-amber-500"
                        }
                      />
                    }
                    label={`${isBlocked ? "Unblock" : "Block"} ${ROLE_LABELS[role]}`}
                    onClick={() => {
                      onAction(
                        user.id,
                        isBlocked ? "unblock_role" : "block_role",
                        role,
                      );
                      close();
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  description?: string;
  danger?: boolean;
  onClick: () => void;
}

function MenuItem({
  icon,
  label,
  description,
  danger = false,
  onClick,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-3 py-2 text-left transition-colors ${
        danger ? "hover:bg-rose-50" : "hover:bg-gray-50"
      }`}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className={`text-sm ${danger ? "text-rose-600" : "text-gray-700"}`}>
          {label}
        </p>
        {description && (
          <p className="text-[11px] text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
    </button>
  );
}
