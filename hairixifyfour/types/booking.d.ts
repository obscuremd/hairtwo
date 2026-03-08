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

interface IBooking {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  user: IBookingUser;
  service: IService;
  status: BookingStatus;
}

interface IBusinessHours {
  day: string; // "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

interface BookedSlot {
  id: number;
  datetime: string; // "2026-03-10 06:00"
  status: "pending" | "confirmed" | "cancelled";
  provider: number;
}

interface BookedSlotsResponse {
  booked: BookedSlot[];
}

interface NormalisedBooking {
  id: number;
  startDate: string; // ISO string
  endDate: string; // ISO string — we set it = startDate since we only need start for blocking
}

interface CreateBookingPayload {
  service: number; // service id
  booking_start: string; // "HH:mm"
  booking_date: string; // "YYYY-MM-DD"
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface CreateBookingResponse {
  success: boolean;
  message: string;
}

interface BookedSlotsApiResponse {
  success: boolean;
  message: string;
  data?: NormalisedBooking[];
}
