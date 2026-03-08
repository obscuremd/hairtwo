// utils/booking.ts

import axios, { AxiosError } from "axios";
import { format } from "date-fns";

// ─── Get booked slots ─────────────────────────────────────────────────────────

interface GetBookedSlotsResult {
  success: boolean;
  message: string;
  // Full IBooking[] → booking calendar
  bookings?: IBooking[];
  // Lightweight NormalisedBooking[] → TimeScale slot blocking
  data?: NormalisedBooking[];
}

function toISO(date: string, time: string): string {
  return new Date(`${date}T${time}`).toISOString();
}

function mapToDisplayStatus(
  raw: BookedSlot["status"],
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

export async function GetBookedSlots(
  providerId: string,
  month: Date = new Date(),
): Promise<GetBookedSlotsResult> {
  try {
    const response = await axios.get<BookedSlotsResponse>(
      `/api/booked/${providerId}`,
      { params: { date: format(month, "yyyy-MM") } },
    );

    const booked = response.data?.booked;
    if (!Array.isArray(booked)) {
      return { success: false, message: "Unexpected response format" };
    }

    const bookings: IBooking[] = booked.map((slot) => {
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

    return { success: true, message: "Booked slots fetched", bookings, data };
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

// ─── Create booking ───────────────────────────────────────────────────────────

export async function CreateBooking(
  payload: CreateBookingPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    await axios.post("/api/booking", payload);
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
