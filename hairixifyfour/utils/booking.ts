// utils/booked.ts  (or wherever you keep your utility functions)

import axios, { AxiosError } from "axios";
import { format } from "date-fns";

export async function GetBookedSlots(
  providerId: string,
  month: Date = new Date(),
): Promise<BookedSlotsApiResponse> {
  try {
    const dateParam = format(month, "yyyy-MM"); // "2026-03"

    const response = await axios.get<BookedSlotsResponse>(
      `/api/booked/${providerId}`,
      { params: { date: dateParam } },
    );

    const booked = response.data?.booked;

    if (!Array.isArray(booked)) {
      return { success: false, message: "Unexpected response format" };
    }

    // Normalise: "2026-03-10 06:00" → ISO strings
    const data: NormalisedBooking[] = booked.map((slot) => {
      const start = new Date(slot.datetime.replace(" ", "T")); // safe parse
      return {
        id: slot.id,
        startDate: start.toISOString(),
        endDate: start.toISOString(), // end = start; TimeScale only needs start to block the slot
      };
    });

    return { success: true, message: "Booked slots fetched", data };
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
    }>;
    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Something went wrong. Please try again.",
    };
  }
}

export async function CreateBooking(
  payload: CreateBookingPayload,
): Promise<CreateBookingResponse> {
  try {
    const response = await axios.post("/api/booking", payload);

    if (response.data) {
      return { success: true, message: "Booking created successfully" };
    }

    return { success: false, message: "Unexpected response from server" };
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
    }>;
    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Something went wrong. Please try again.",
    };
  }
}

// ─── Utility: split a full name into first/last ───────────────────────────────

export function splitName(fullName: string): {
  first_name: string;
  last_name: string;
} {
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts[0] ?? "";
  const last_name = parts.slice(1).join(" ") || first_name; // fallback to first if single word
  return { first_name, last_name };
}

// ─── Utility: build the booking date string ───────────────────────────────────

export function toBookingDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
