"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/role-views/EmployerRoleView.tsx
// ─────────────────────────────────────────────

import { Briefcase, CheckCircle, ShieldOff, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfoCard } from "../InfoCard";
import { JobStatus, JobType, User, UserRole } from "../types";

interface EmployerRoleViewProps {
  user: User;
  onAction: (
    userId: string,
    action: "block_role" | "unblock_role",
    role: UserRole,
  ) => void;
}

const JOB_STATUS_CONFIG: Record<JobStatus, { style: string; label: string }> = {
  active: {
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "Active",
  },
  closed: {
    style: "bg-gray-100 text-gray-500 border-gray-200",
    label: "Closed",
  },
};

const JOB_TYPE_COLORS: Record<JobType, string> = {
  "Full-time": "bg-violet-50 text-violet-700 border-violet-200",
  "Part-time": "bg-sky-50 text-sky-700 border-sky-200",
  Contract: "bg-amber-50 text-amber-700 border-amber-200",
  Internship: "bg-pink-50 text-pink-700 border-pink-200",
};

export function EmployerRoleView({ user, onAction }: EmployerRoleViewProps) {
  const e = user.employer;
  if (!e) return null;

  const isBlocked = user.blockedRoles.includes("employer");
  const activeCount = e.openings.filter((j) => j.status === "active").length;
  const closedCount = e.openings.filter((j) => j.status === "closed").length;

  const BlockBtn = (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        onAction(user.id, isBlocked ? "unblock_role" : "block_role", "employer")
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

  const overviewStats = [
    { label: "Company", value: e.companyName },
    { label: "Industry", value: e.industry },
    { label: "Size", value: `${e.size} employees` },
  ];

  return (
    <div className="space-y-4">
      {/* Overview */}
      <InfoCard
        title="Employer Profile"
        subtitle={e.industry}
        action={BlockBtn}
      >
        <div className="grid grid-cols-3 gap-4">
          {overviewStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[11px] text-t-secondary mb-1">{stat.label}</p>
              <p className="text-sm font-medium text-t-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Job Openings */}
      <InfoCard
        title="Job Openings"
        subtitle={`${activeCount} active · ${closedCount} closed`}
      >
        <div className="space-y-2">
          {e.openings.map((job) => {
            const statusConfig = JOB_STATUS_CONFIG[job.status];
            const typeColor =
              JOB_TYPE_COLORS[job.type] ??
              "bg-gray-100 text-gray-600 border-gray-200";

            return (
              <div
                key={job.id}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Briefcase size={13} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-t-primary font-medium">
                      {job.title}
                    </p>
                    <p className="text-xs text-t-secondary mt-0.5">
                      {job.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <Badge
                    variant="outline"
                    className={`text-[11px] ${typeColor}`}
                  >
                    {job.type}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-t-secondary">
                    <Users size={11} />
                    {job.applicants}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[11px] ${statusConfig.style}`}
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </InfoCard>
    </div>
  );
}
