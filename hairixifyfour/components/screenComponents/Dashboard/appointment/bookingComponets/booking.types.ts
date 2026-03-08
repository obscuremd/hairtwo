export type BookingStatus = "ongoing" | "success" | "failed" | "upcoming";

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

import { isWithinInterval, parseISO } from "date-fns";

export function resolveStatus(booking: IBooking): BookingStatus {
  const now = new Date();
  const start = parseISO(booking.startDate);
  const end = parseISO(booking.endDate);
  if (isWithinInterval(now, { start, end })) return "ongoing";
  return booking.status;
}

const dateFrom = (dayOffset: number, hour: number, minute = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

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

export const BOOKING_MOCK: IBooking[] = [
  {
    id: 1,
    title: "Hair & Styling Session",
    startDate: new Date(Date.now() - 20 * 60000).toISOString(),
    endDate: new Date(Date.now() + 40 * 60000).toISOString(),
    description: "Full blowout and trim for an upcoming event.",
    status: "ongoing",
    service: SERVICES[0],
    user: {
      id: "u1",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 (555) 012-3456",
    },
  },
  {
    id: 2,
    title: "Skin Consultation",
    startDate: dateFrom(-5, 10),
    endDate: dateFrom(-5, 11),
    description: "Initial consultation for acne treatment plan.",
    status: "success",
    service: SERVICES[1],
    user: {
      id: "u2",
      name: "Michael Doe",
      email: "michael@example.com",
      phone: "+1 (555) 234-5678",
    },
  },
  {
    id: 2,
    title: "Skin Consultation",
    startDate: dateFrom(-5, 10),
    endDate: dateFrom(-5, 11),
    description: "Initial consultation for acne treatment plan.",
    status: "success",
    service: SERVICES[1],
    user: {
      id: "u2",
      name: "Michael Doe",
      email: "michael@example.com",
      phone: "+1 (555) 234-5678",
    },
  },
  {
    id: 2,
    title: "Skin Consultation",
    startDate: dateFrom(-5, 10),
    endDate: dateFrom(-5, 11),
    description: "Initial consultation for acne treatment plan.",
    status: "success",
    service: SERVICES[1],
    user: {
      id: "u2",
      name: "Michael Doe",
      email: "michael@example.com",
      phone: "+1 (555) 234-5678",
    },
  },

  {
    id: 3,
    title: "Deep Tissue Massage",
    startDate: dateFrom(-3, 14),
    endDate: dateFrom(-3, 15),
    description: "60-minute deep tissue session focusing on the back.",
    status: "failed",
    service: SERVICES[2],
    user: {
      id: "u3",
      name: "Robert Smith",
      email: "robert@example.com",
      phone: "+1 (555) 345-6789",
    },
  },
  {
    id: 4,
    title: "Personal Training",
    startDate: dateFrom(1, 8),
    endDate: dateFrom(1, 9),
    description: "Strength and conditioning — legs day.",
    status: "upcoming",
    service: SERVICES[3],
    user: {
      id: "u4",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 456-7890",
    },
  },
  {
    id: 5,
    title: "Nutrition Coaching",
    startDate: dateFrom(2, 11),
    endDate: dateFrom(2, 12),
    description: "Review of weekly food log and macro adjustments.",
    status: "upcoming",
    service: SERVICES[4],
    user: {
      id: "u1",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 (555) 012-3456",
    },
  },
  {
    id: 6,
    title: "Dental Cleaning",
    startDate: dateFrom(4, 9),
    endDate: dateFrom(4, 10),
    description: "Routine bi-annual cleaning and checkup.",
    status: "upcoming",
    service: SERVICES[5],
    user: {
      id: "u2",
      name: "Michael Doe",
      email: "michael@example.com",
      phone: "+1 (555) 234-5678",
    },
  },
  {
    id: 7,
    title: "Hair & Styling Session",
    startDate: dateFrom(-10, 13),
    endDate: dateFrom(-10, 14),
    description: "Color treatment and styling.",
    status: "success",
    service: SERVICES[0],
    user: {
      id: "u3",
      name: "Robert Smith",
      email: "robert@example.com",
      phone: "+1 (555) 345-6789",
    },
  },
  {
    id: 8,
    title: "Massage Therapy",
    startDate: dateFrom(7, 15),
    endDate: dateFrom(7, 16),
    description: "Relaxation massage — full body.",
    status: "upcoming",
    service: SERVICES[2],
    user: {
      id: "u4",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 456-7890",
    },
  },
  {
    id: 9,
    title: "Skin Consultation Follow-up",
    startDate: dateFrom(-1, 10),
    endDate: dateFrom(-1, 11),
    description: "Progress check after first treatment round.",
    status: "success",
    service: SERVICES[1],
    user: {
      id: "u1",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 (555) 012-3456",
    },
  },
  {
    id: 10,
    title: "Personal Training",
    startDate: dateFrom(-7, 8),
    endDate: dateFrom(-7, 9),
    description: "Client no-show — session marked as failed.",
    status: "failed",
    service: SERVICES[3],
    user: {
      id: "u2",
      name: "Michael Doe",
      email: "michael@example.com",
      phone: "+1 (555) 234-5678",
    },
  },
];

export const BUSINESS_HOURS_MOCK: IBusinessHours[] = [
  { day: "Mon", start: "09:00", end: "17:00" },
  { day: "Tue", start: "09:00", end: "17:00" },
  { day: "Wed", start: "09:00", end: "17:00" },
  { day: "Thu", start: "09:00", end: "17:00" },
  { day: "Fri", start: "09:00", end: "17:00" },
  { day: "Sat", start: "10:00", end: "16:00" },
  // Sunday intentionally omitted = closed
];
