/* eslint-disable @typescript-eslint/no-explicit-any */
// types/provider.ts
interface Service {
  title: string;
  price: string;
  duration: string;
  description: string;
  recurrence: number;
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
