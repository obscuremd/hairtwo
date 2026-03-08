// components/skeletons/HomeSkeletons.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

// ─── Recommended / provider cards row ────────────────────────────────────────

export function RecommendedSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="w-full aspect-square rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Hero skeleton ────────────────────────────────────────────────────────────

export function HeroSkeleton() {
  return (
    <div className="w-full px-5 md:px-[68px] py-16 md:py-24 space-y-6">
      <Skeleton className="h-10 w-3/4 md:w-1/2 mx-auto" />
      <Skeleton className="h-6 w-1/2 md:w-1/3 mx-auto" />
      <div className="flex gap-3 justify-center">
        <Skeleton className="h-11 w-32 rounded-lg" />
        <Skeleton className="h-11 w-32 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Home cards skeleton (HomeCard1 / HomeCard2 style) ───────────────────────

export function HomeCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <Skeleton className="flex-1 h-56 rounded-2xl" />
      <div className="flex-1 space-y-4 py-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-10 w-32 rounded-lg mt-2" />
      </div>
    </div>
  );
}

// ─── Full homepage skeleton ───────────────────────────────────────────────────

export function HomeSkeleton() {
  return (
    <div className="min-h-screen max-w-full">
      {/* Hero */}
      <HeroSkeleton />

      {/* Recommended */}
      <div className="w-full px-5 py-10 md:p-[68px]">
        <RecommendedSkeleton />
      </div>

      {/* Cards section */}
      <div className="relative">
        <div className="absolute inset-x-0 h-[70%] bottom-0 bg-[#F3FAF4] -z-10" />
        <div className="w-full p-5 md:p-[42px] md:space-y-[30px] space-y-8">
          <HomeCardSkeleton />
          <HomeCardSkeleton />
        </div>
      </div>

      {/* Lower cards */}
      <div className="w-full px-5 md:px-[68px] space-y-12 py-8">
        <HomeCardSkeleton />
        <HomeCardSkeleton />
        {/* Search section placeholder */}
        <Skeleton className="h-40 w-full rounded-2xl" />
        {/* Articles */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-28" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full h-44 rounded-xl" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
