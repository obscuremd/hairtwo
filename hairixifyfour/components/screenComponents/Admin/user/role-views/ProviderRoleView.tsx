"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/role-views/ProviderRoleView.tsx
// ─────────────────────────────────────────────

import {
  Briefcase,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  ShieldOff,
  Star,
  Users,
} from "lucide-react";
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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
      {/* ── Provider overview ─────────────────── */}
      <InfoCard
        title="Provider Profile"
        subtitle="From provider record"
        action={BlockBtn}
      >
        <div className="space-y-4">
          {/* Business name + status */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-semibold text-t-primary text-base">
                {p.businessName}
              </p>
              {p.bio && (
                <p className="text-sm text-t-secondary mt-1 leading-relaxed">
                  {p.bio}
                </p>
              )}
            </div>
            <Badge
              variant="outline"
              className={
                p.verified
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]"
                  : "bg-amber-50 text-amber-700 border-amber-200 text-[11px]"
              }
            >
              {p.verified ? "Provider Active" : "Provider Inactive"}
            </Badge>
          </div>

          {/* Provider detail grid — real API fields */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-gray-100">
            <MetaField
              icon={<Phone size={13} />}
              label="Business Phone"
              value={p.phone || "—"}
            />
            <MetaField
              icon={<MapPin size={13} />}
              label="Address"
              value={p.address || "—"}
            />
            <MetaField
              icon={<Users size={13} />}
              label="Team Size"
              value={String(p.teamSize)}
            />
            <MetaField
              icon={<Briefcase size={13} />}
              label="Service Type"
              value={String(p.serviceType)}
            />
            <MetaField
              icon={<Clock size={13} />}
              label="Live Since"
              value={formatDate(p.liveAt)}
            />
            <MetaField
              icon={<Star size={13} />}
              label="Category ID"
              value={p.category}
            />
          </div>
        </div>
      </InfoCard>

      {/* ── Services — not yet in API ─────────── */}
      <InfoCard
        title="Services"
        subtitle={
          p.services.length > 0
            ? `${p.services.length} listed`
            : "Not yet available from API"
        }
      >
        {p.services.length > 0 ? (
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
                    className={`text-[11px] capitalize ${
                      SERVICE_STATUS_STYLES[service.status]
                    }`}
                  >
                    {service.status.charAt(0).toUpperCase() +
                      service.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-6">
            Services data will appear here once the provider services endpoint
            is available.
          </p>
        )}
      </InfoCard>

      {/* ── Business Hours — not yet in API ──── */}
      <InfoCard
        title="Business Hours"
        subtitle={
          p.businessHours.length > 0 ? undefined : "Not yet available from API"
        }
      >
        {p.businessHours.length > 0 ? (
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
        ) : (
          <p className="text-sm text-gray-400 text-center py-6">
            Business hours data will appear here once the business hours
            endpoint is available.
          </p>
        )}
      </InfoCard>
    </div>
  );
}

// ─── Small meta field ─────────────────────────

function MetaField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] text-t-secondary mb-1">
        {icon}
        {label}
      </div>
      <p className="text-sm text-t-primary font-medium truncate">{value}</p>
    </div>
  );
}
