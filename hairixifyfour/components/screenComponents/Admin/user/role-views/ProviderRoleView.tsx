"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/role-views/ProviderRoleView.tsx
// ─────────────────────────────────────────────

import { CheckCircle, ShieldOff, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfoCard } from "../InfoCard";
import { ServiceStatus, User, UserRole } from "../types";

interface ProviderRoleViewProps {
  user: User;
  onAction: (
    userId: string,
    action: "block_role" | "unblock_role",
    role: UserRole,
  ) => void;
}

const SERVICE_STATUS_STYLES: Record<ServiceStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
  inactive: "bg-gray-100 text-gray-500 border-gray-200",
};

export function ProviderRoleView({ user, onAction }: ProviderRoleViewProps) {
  const p = user.provider;
  if (!p) return null;

  const isBlocked = user.blockedRoles.includes("provider");

  const BlockBtn = (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        onAction(user.id, isBlocked ? "unblock_role" : "block_role", "provider")
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
      {isBlocked ? "Restore Role" : "Block Role"}
    </Button>
  );

  return (
    <div className="space-y-4">
      {/* Overview */}
      <InfoCard
        title="Provider Profile"
        subtitle={p.category}
        action={BlockBtn}
      >
        <div className="flex items-start gap-5">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-t-primary">{p.businessName}</p>
            <p className="text-sm text-t-secondary mt-1.5 leading-relaxed">
              {p.bio}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-amber-500">
              <Star size={14} className="fill-amber-400" />
              <span className="font-semibold text-sm text-t-primary">
                {p.rating}
              </span>
            </div>
            <p className="text-[11px] text-t-secondary">
              {p.totalReviews} reviews
            </p>
            <Badge
              variant="outline"
              className={
                p.verified
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]"
                  : "bg-amber-50 text-amber-700 border-amber-200 text-[11px]"
              }
            >
              {p.verified ? "Verified" : "Unverified"}
            </Badge>
          </div>
        </div>
      </InfoCard>

      {/* Services */}
      <InfoCard title="Services" subtitle={`${p.services.length} listed`}>
        <div className="space-y-2">
          {p.services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div>
                <p className="text-sm text-t-primary font-medium">
                  {service.name}
                </p>
                <p className="text-xs text-t-secondary mt-0.5">
                  {service.duration}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-t-primary">
                  ${service.price}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[11px] capitalize ${SERVICE_STATUS_STYLES[service.status]}`}
                >
                  {service.status.charAt(0).toUpperCase() +
                    service.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Business Hours */}
      <InfoCard title="Business Hours">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {p.businessHours.map((bh) => (
            <div
              key={bh.day}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <span className="text-sm text-t-secondary w-24 shrink-0">
                {bh.day}
              </span>
              {bh.available ? (
                <span className="text-sm text-t-primary font-medium">
                  {bh.open} – {bh.close}
                </span>
              ) : (
                <span className="text-sm text-gray-400 italic">Closed</span>
              )}
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}
