// bookingComponets/booking.types.ts

import { isWithinInterval, parseISO } from "date-fns";

export type BookingStatus = "ongoing" | "success" | "failed" | "upcoming";

// Raw statuses that come from the backend — kept separate so TS doesn't
// complain about comparing BookingStatus against these strings
type RawBookingStatus = "pending" | "confirmed" | "cancelled";

export const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; dot: string; badge: string; border: string; text: string }
> = {
  ongoing: {
    label: "Ongoing",
    dot: "bg-amber-500",
    badge:
      "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    border: "border-l-amber-500",
    text: "text-amber-700 dark:text-amber-400",
  },
  success: {
    label: "Completed",
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
    border: "border-l-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  failed: {
    label: "Failed",
    dot: "bg-rose-500",
    badge:
      "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800",
    border: "border-l-rose-500",
    text: "text-rose-700 dark:text-rose-400",
  },
  upcoming: {
    label: "Upcoming",
    dot: "bg-sky-500",
    badge:
      "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-800",
    border: "border-l-sky-500",
    text: "text-sky-700 dark:text-sky-400",
  },
};

export function resolveStatus(booking: IBooking): BookingStatus {
  const now = new Date();
  const start = parseISO(booking.startDate);
  const end = parseISO(booking.endDate);

  // Live time window always wins
  if (isWithinInterval(now, { start, end })) return "ongoing";

  // Cast to the raw union so TS knows these comparisons are valid
  const raw = booking.status as BookingStatus | RawBookingStatus;

  if (raw === "cancelled") return "failed";
  if (raw === "confirmed" || raw === "pending") {
    return now > end ? "success" : "upcoming";
  }

  // Already a display status (optimistic local adds from AddBookingDialog)
  return booking.status as BookingStatus;
}

// Used only by AddBookingDialog for local/optimistic adds
export const SERVICES: IService[] = [
  { id: "svc-1", name: "Hair & Styling", href: "#services/hair-styling" },
  {
    id: "svc-2",
    name: "Skin Consultation",
    href: "#services/skin-consultation",
  },
  { id: "svc-3", name: "Massage Therapy", href: "#services/massage-therapy" },
  {
    id: "svc-4",
    name: "Personal Training",
    href: "#services/personal-training",
  },
  {
    id: "svc-5",
    name: "Nutrition Coaching",
    href: "#services/nutrition-coaching",
  },
  { id: "svc-6", name: "Dental Cleaning", href: "#services/dental-cleaning" },
];
