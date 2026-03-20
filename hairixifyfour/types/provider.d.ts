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

interface Gallery {
  id: number;
  type: string;
  type_id: string;
  image: string;
  user: number;
  created_at: string;
  updated_at: string;
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
  // email_verified_at: string | null;
  // status: string;
  // phone_number: string | null;
  gallery: Gallery[];

  created_at: string;
  updated_at: string;
}
interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  roles: Array<string>; // "provider" | "client" | etc.
  profile: Gallery[];
}

interface AuthProvider {
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

  business_hours: BusinessHour[];

  created_at: string;
  updated_at: string;
}

interface GetAuthUserResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
}
interface GetAuthProviderResponse {
  success: boolean;
  message: string;
  user?: AuthProvider;
}
