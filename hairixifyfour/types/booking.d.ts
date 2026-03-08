// types/booking.d.ts
// Single source of truth for all booking-related types

type BookingStatus = "ongoing" | "success" | "failed" | "upcoming";

interface IBookingUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface IService {
  id: string;
  name: string;
  href: string;
}

// Used throughout the calendar and detail dialog
interface IBooking {
  id: number;
  title: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  description: string;
  status: BookingStatus;
  user: IBookingUser;
  service: IService;
}

interface IBusinessHours {
  day: string; // "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

// Lightweight — only used by TimeScale for slot blocking
interface NormalisedBooking {
  id: number;
  startDate: string; // ISO string
  endDate: string; // ISO string
}

// Raw shape from GET /api/booked/provider/:id
interface Client {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  status: string;
}

interface BookedSlot {
  id: number;
  booking_date: string; // "2026-03-10"
  booking_start: string; // "06:00"
  booking_end: string; // "06:30"
  date_time: string; // "2026-03-10 06:00"
  service: Service; // your existing Service type
  duration: string; // minutes as string
  recurrence: number;
  provider: number;
  status: "pending" | "confirmed" | "cancelled";
  client: Client;
  created_at: string;
  updated_at: string;
}

interface BookedSlotsResponse {
  booked: BookedSlot[];
}

// POST /api/booking body
interface CreateBookingPayload {
  service: number;
  booking_start: string; // "HH:mm"
  booking_date: string; // "YYYY-MM-DD"
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
}
