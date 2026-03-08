interface Provider {
  id: number;
  first_name: string;
  last_name: string;
  business_name: string;
  phone_number: string;
  address: string;

  state: stateData;
  local: localData;
  area: areaData;
  category: Category;

  service_type: number;
  team_size: number;
  live_at: string;
  status: string;

  user: User;

  created_at: string;
  updated_at: string;

  business_hours: BusinessHour[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  full_name: string;
  email: string;
  email_verified_at: string | null;
  status: string;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
}
interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  phone_number: string | null;
  status: string;
  role: string; // "provider" | "client" | etc.
}

interface GetAuthProviderResponse {
  success: boolean;
  message: string;
  provider?: Provider;
  user?: AuthUser;
}
