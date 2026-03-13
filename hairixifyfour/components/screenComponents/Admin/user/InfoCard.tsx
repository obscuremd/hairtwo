"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/InfoCard.tsx
// ─────────────────────────────────────────────

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InfoCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function InfoCard({
  title,
  subtitle,
  action,
  children,
  className,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-100 shadow-sm overflow-hidden",
        className,
      )}
    >
      {(title || action) && (
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-t-primary">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-t-secondary mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
