// utils/booking.ts

import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { getStoredCredentials } from "./user";

// ─── Types (local, matching the new API shapes) ───────────────────────────────

interface FeDashboardSlot {
  id: number;
  booking_date: string;
  booking_start: string;
  booking_end: string;
  datetime: string;
  service: {
    id: number;
    title: string;
    price: string;
    discount_price: string | null;
    duration: string;
    description: string;
    recurrence: number;
    provider: number;
    group: number;
    premium: number;
    status: string;
  };
  duration: string;
  recurrence: number;
  provider: number;
  client: {
    id: number;
    full_name: string;
    email: string;
    email_verified_at: string | null;
    status: string;
    phone_number: string | null;
    created_at: string;
    updated_at: string;
  };
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  updated_at: string;
}

interface FePublicSlot {
  datetime: string; // "2026-03-16 09:00"
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toISO(date: string, time: string): string {
  return new Date(`${date}T${time}`).toISOString();
}

function mapToDisplayStatus(
  raw: FeDashboardSlot["status"],
  startISO: string,
  endISO: string,
): IBooking["status"] {
  const now = new Date();
  const start = new Date(startISO);
  const end = new Date(endISO);
  if (now >= start && now <= end) return "ongoing";
  if (raw === "cancelled") return "failed";
  return now > end ? "success" : "upcoming";
}

// ─── Dashboard: GetBookedSlots ────────────────────────────────────────────────
// Used by BookingCalendar (dashboard). Requires auth token.
// Response shape: { succes: "valid", data: FeDashboardSlot[] }

interface GetBookedSlotsResult {
  success: boolean;
  message: string;
  bookings?: IBooking[];
  data?: NormalisedBooking[];
}

export async function GetBookedSlots(
  month: Date = new Date(),
): Promise<GetBookedSlotsResult> {
  try {
    const { token } = getStoredCredentials();

    const response = await axios.get<{
      succes: string;
      data: FeDashboardSlot[];
    }>("/api/booked", {
      params: { date: format(month, "yyyy-MM") },
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("appontment res", response);

    const raw = response.data?.data;
    if (!Array.isArray(raw)) {
      return { success: false, message: "Unexpected response format" };
    }

    const bookings: IBooking[] = raw.map((slot) => {
      const startDate = toISO(slot.booking_date, slot.booking_start);
      const endDate = toISO(slot.booking_date, slot.booking_end);
      return {
        id: slot.id,
        title: slot.service?.title ?? "Appointment",
        startDate,
        endDate,
        description: slot.service?.description ?? "",
        status: mapToDisplayStatus(slot.status, startDate, endDate),
        user: {
          id: String(slot.client?.id ?? ""),
          name: slot.client?.full_name ?? "Client",
          email: slot.client?.email ?? "",
          phone: slot.client?.phone_number ?? "",
        },
        service: {
          id: String(slot.service?.id ?? ""),
          name: slot.service?.title ?? "",
          href: `#services/${slot.service?.id ?? ""}`,
        },
      };
    });

    const data: NormalisedBooking[] = bookings.map((b) => ({
      id: b.id,
      startDate: b.startDate,
      endDate: b.endDate,
    }));

    return { success: true, message: "Fetched", bookings, data };
  } catch (error) {
    console.log("app error:", error);
    const e = error as AxiosError<{ message?: string; error?: string }>;
    return {
      success: false,
      message:
        e.response?.data?.message ||
        e.response?.data?.error ||
        e.message ||
        "Something went wrong.",
    };
  }
}

// ─── Client-facing: GetProviderBookedSlots ────────────────────────────────────
// Used by BookingModal / TimeScale to block out taken slots.
// No auth required — provider ID passed as query param.
// Returns NormalisedBooking[] built from the "datetime" field.

interface GetProviderBookedSlotsResult {
  success: boolean;
  message: string;
  data?: NormalisedBooking[];
}

export async function GetProviderBookedSlots(
  providerId: string,
): Promise<GetProviderBookedSlotsResult> {
  try {
    const response = await axios.get<{ succes: string; data: FePublicSlot[] }>(
      `/api/booked-fe`,
      { params: { provider: providerId } },
    );

    const raw = response.data?.data;
    if (!Array.isArray(raw)) {
      return { success: false, message: "Unexpected response format" };
    }

    // datetime is "2026-03-16 09:00" — we only have start, not end.
    // We mark a 30-min window as blocked (conservative); the TimeScale will
    // further filter by serviceDuration, so even a 1-min overlap disables the slot.
    const data: NormalisedBooking[] = raw.map((slot, i) => {
      const startISO = new Date(slot.datetime.replace(" ", "T")).toISOString();
      // Block 30 minutes from start as a safe default
      const endISO = new Date(
        new Date(startISO).getTime() + 30 * 60 * 1000,
      ).toISOString();
      return { id: i, startDate: startISO, endDate: endISO };
    });

    return { success: true, message: "Fetched", data };
  } catch (error) {
    const e = error as AxiosError<{ message?: string; error?: string }>;
    return {
      success: false,
      message:
        e.response?.data?.message ||
        e.response?.data?.error ||
        e.message ||
        "Something went wrong.",
    };
  }
}

// ─── CreateBooking ────────────────────────────────────────────────────────────
// If token exists → POST /api/booking (authenticated, slim body)
// If no token     → POST /api/booking2 (guest, full body)

interface AuthenticatedBookingPayload {
  service: number;
  booking_start: string;
  booking_date: string;
}

interface GuestBookingPayload extends AuthenticatedBookingPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

export type CreateBookingPayload =
  | AuthenticatedBookingPayload
  | GuestBookingPayload;

export async function CreateBooking(
  payload: CreateBookingPayload,
): Promise<{ success: boolean; message: string }> {
  const { token } = getStoredCredentials();
  const isAuthed = !!token;

  try {
    if (isAuthed) {
      // Send only the slim payload; ignore any guest fields if present
      const slim: AuthenticatedBookingPayload = {
        service: payload.service,
        booking_start: payload.booking_start,
        booking_date: payload.booking_date,
      };
      await axios.post("/api/booking", slim, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post("/api/booking2", payload);
    }
    return { success: true, message: "Booking created successfully" };
  } catch (error) {
    const e = error as AxiosError<{ message?: string; error?: string }>;
    return {
      success: false,
      message:
        e.response?.data?.message ||
        e.response?.data?.error ||
        e.message ||
        "Something went wrong.",
    };
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function splitName(fullName: string): {
  first_name: string;
  last_name: string;
} {
  const parts = fullName.trim().split(/\s+/);
  return {
    first_name: parts[0] ?? "",
    last_name: (parts.slice(1).join(" ") || parts[0]) ?? "",
  };
}

export function toBookingDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
