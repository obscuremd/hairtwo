/* eslint-disable @typescript-eslint/no-explicit-any */
// types/provider.ts
interface Service {
  id?: number;
  title: string;
  price: string;
  discount_price?: string;
  duration: string;
  description: string;
  recurrence: number;
  provider?: number;
  premium?: number;
  status?: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
  Images?: Array<string>;
}

interface BusinessHour {
  day: string;
  start: string;
  end: string;
}

interface RegistrationPayload {
  email: string;
  password: string;
  password_confirmation: string;
  business_name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  state: number | null;
  local: number | null;
  area: number | null;
  team_size: string;
  category: number | null;
  sub_category: number | null;
  service_type: number | null;
  live_at: string;
  services: Service[];
  business_hours: BusinessHour[];
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
