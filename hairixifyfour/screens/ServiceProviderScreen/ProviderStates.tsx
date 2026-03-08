"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Loading Skeleton ──────────────────────────────────────────────────────────

export function ProviderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Left column — 4/6 */}
        <div className="md:w-4/6 space-y-6">
          {/* Hero */}
          <div className="space-y-4">
            {/* Cover image */}
            <Skeleton className="w-full h-56 rounded-xl" />
            {/* Avatar + name row */}
            <div className="flex items-end gap-4 -mt-10 px-4">
              <Skeleton className="size-20 rounded-full shrink-0 border-4 border-background" />
              <div className="space-y-2 pb-1 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3.5 w-32" />
              </div>
              <Skeleton className="h-9 w-24 rounded-md shrink-0" />
            </div>
            {/* Tag chips */}
            <div className="flex gap-2 px-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3 px-4">
            <Skeleton className="h-5 w-28" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-52" />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div className="space-y-3 px-4">
            <Skeleton className="h-5 w-24" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Right column — 2/6 */}
        <div className="md:w-2/6 space-y-4 px-4 md:px-0">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="pt-2 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-full shrink-0" />
                <Skeleton className="h-3.5 w-40" />
              </div>
            ))}
          </div>
          <Skeleton className="h-10 w-full rounded-md mt-2" />
        </div>
      </div>

      {/* Reviews row */}
      <div className="mt-8 space-y-3 px-4 md:px-0">
        <Skeleton className="h-5 w-20" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Not Found ─────────────────────────────────────────────────────────────────

export function ProviderNotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-6">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <AlertCircle className="size-7 text-muted-foreground" />
      </div>

      <div className="space-y-2 max-w-sm">
        <h2 className="text-lg font-semibold">Provider not found</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We couldn&apos;t find the stylist you&apos;re looking for. They may
          have moved or this link may be incorrect.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="size-4 mr-1.5" />
          Go back
        </Button>
        <Button onClick={() => router.refresh()}>
          <RefreshCw className="size-4 mr-1.5" />
          Try again
        </Button>
      </div>
    </div>
  );
}
