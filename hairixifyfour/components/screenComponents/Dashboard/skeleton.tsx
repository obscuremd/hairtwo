"use client";

import { Skeleton } from "@/components/ui/skeleton";

/* ─────────────────────────────────────────
   Sidebar Skeleton
───────────────────────────────────────── */

export function SidebarSkeleton() {
  return (
    <div className="bg-black border-r border-neutral-800 w-64 md:w-16 h-screen flex flex-col items-center py-6 gap-6">
      {/* Avatar */}
      <Skeleton className="h-8 w-8 rounded-full bg-neutral-700" />

      <div className="w-[70%] h-[1px] bg-neutral-800" />

      {/* Nav icons */}
      <div className="flex flex-col gap-4 mt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-lg bg-neutral-800" />
        ))}
      </div>

      <div className="flex-1" />

      <div className="w-[70%] h-[1px] bg-neutral-800" />

      {/* Footer icons */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-10 rounded-lg bg-neutral-800" />
        <Skeleton className="h-10 w-10 rounded-lg bg-neutral-800" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Header Skeleton
───────────────────────────────────────── */

export function DashboardHeaderSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
  );
}

/* ─────────────────────────────────────────
   Stats Skeleton
───────────────────────────────────────── */

export function StatsSkeleton() {
  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="shadow-sm py-2 px-4 rounded-md flex gap-4">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Tabs Skeleton
───────────────────────────────────────── */

export function TabsSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-9 w-24 rounded-lg" />
      <Skeleton className="h-9 w-28 rounded-lg" />
    </div>
  );
}

/* ─────────────────────────────────────────
   Services List Skeleton
───────────────────────────────────────── */

export function ServicesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-4 border-b last:border-0"
        >
          <div className="space-y-2 w-2/3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-full" />
          </div>

          <div className="space-y-2 flex flex-col items-end">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Transactions Skeleton
───────────────────────────────────────── */

export function TransactionsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border px-4 py-3 gap-4"
        >
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
            <Skeleton className="h-3 w-32" />
          </div>

          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Full Dashboard Skeleton
───────────────────────────────────────── */

export function DashboardSkeleton() {
  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar */}
      <SidebarSkeleton />

      {/* Content */}
      <div className="flex-1 p-5 md:py-10 md:px-5 space-y-10">
        <DashboardHeaderSkeleton />

        <StatsSkeleton />

        <TabsSkeleton />

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <ServicesSkeleton />
        </div>
      </div>
    </div>
  );
}
