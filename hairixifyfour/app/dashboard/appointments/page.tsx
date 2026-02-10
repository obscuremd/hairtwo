import { ArrowUpRight, CalendarIcon, GithubIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Calendar } from "@/features/calendar/calendar";
import { CalendarSkeleton } from "@/features/calendar/skeletons/calendar-skeleton";

export default function Page() {
  return (
    <main className="flex max-h-screen  flex-col">
      <div className="container p-4 md:mx-auto space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <CalendarIcon className="size-6 text-t-secondary" />
          </div>
          <p className="text-lg font-medium leading-6">Appointments</p>
        </div>
        <Suspense fallback={<CalendarSkeleton />}>
          <Calendar />
        </Suspense>
      </div>
    </main>
  );
}
