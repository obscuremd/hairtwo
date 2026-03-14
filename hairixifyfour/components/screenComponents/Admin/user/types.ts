// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/types.ts
// ─────────────────────────────────────────────

// ─── UI role + status types ──────────────────

export type UserRole =
  | "client"
  | "provider"
  | "vendor"
  | "employer"
  | "staff"
  | "admin"
  | "super_admin";

// "inactive" added — maps directly from the backend "inactive" status value
export type UserStatus = "active" | "suspended" | "inactive" | "pending";

export type ServiceStatus = "active" | "paused" | "inactive";
export type ProductStatus = "active" | "out_of_stock" | "paused";
export type JobStatus = "active" | "closed";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

// ─── Role-specific profiles ──────────────────
// Provider data comes from the single-user endpoint.
// Vendor / Employer remain mock until those endpoints exist.

export interface BusinessHour {
  day: string;
  open: string | null;
  close: string | null;
  available: boolean;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  status: ServiceStatus;
}

export interface ProviderProfile {
  businessName: string;
  category: string; // category id from API — resolved to name if available
  address: string;
  phone: string;
  teamSize: number;
  serviceType: number;
  liveAt: string;
  providerStatus: string; // provider-level status ("active" | "inactive")
  rating: number; // not yet in API — defaults to 0
  totalReviews: number; // not yet in API — defaults to 0
  verified: boolean; // derived: providerStatus === "active"
  bio: string; // not yet in API — defaults to ""
  services: Service[]; // not yet in API — defaults to []
  businessHours: BusinessHour[]; // not yet in API — defaults to []
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export interface VendorProfile {
  storeName: string;
  category: string;
  rating: number;
  totalSales: number;
  verified: boolean;
  products: Product[];
}

export interface JobOpening {
  id: string;
  title: string;
  type: JobType;
  location: string;
  status: JobStatus;
  applicants: number;
}

export interface EmployerProfile {
  companyName: string;
  industry: string;
  size: string;
  openings: JobOpening[];
}

// ─── Core UI User ────────────────────────────
// Shape used throughout all UI components.

export interface User {
  id: string; // stringified numeric id from API
  name: string;
  email: string;
  phone: string;
  initials: string;
  emailVerified: boolean;
  roles: UserRole[];
  status: UserStatus;
  blockedRoles: UserRole[]; // local-only until API supports it
  joinedAt: string; // created_at from API
  lastActive: string; // updated_at from API
  location: string; // not in list API — "—" placeholder
  // Role-specific detail — only populated on single-user load
  provider?: ProviderProfile;
  vendor?: VendorProfile;
  employer?: EmployerProfile;
}

// ─── Raw API shapes ───────────────────────────

export interface ApiUserRole {
  id: number;
  user: number;
  role: {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ApiGalleryItem {
  id: number;
  type: string;
  type_id: number;
  type_type: string;
  image: string;
  user: number;
  created_at: string;
  updated_at: string;
}

// Shape returned by the single-user GET endpoint
export interface ApiProviderDetail {
  id: number;
  first_name: string;
  last_name: string;
  business_name: string;
  phone_number: string;
  address: string;
  state: number;
  local: number;
  area: number;
  category: number;
  service_type: number;
  team_size: number;
  live_at: string;
  status: string;
  user: number;
  created_at: string;
  updated_at: string;
}

// GET /api/admin/users — list response
// The backend key is "success": "valid" (a string, not boolean)
export interface GetAdminUsersApiResponse {
  success: string;
  users: ApiUserListItem[];
}

// Single item in the list response
export interface ApiUserListItem {
  id: number;
  full_name: string;
  email: string;
  email_verified_at: string | null;
  status: string;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
  userrole: ApiUserRole[];
  gallery: ApiGalleryItem[];
}

// GET /api/admin/users/:email — single user response
// "users" is a singular object despite the key name
export interface GetAdminUserByEmailApiResponse {
  success: string;
  users: ApiUserListItem & {
    provider?: ApiProviderDetail;
  };
}

// PUT /api/admin/users/:email — update status response
export interface UpdateAdminUserApiResponse {
  success: string;
  message?: string;
  users?: ApiUserListItem;
}

// ─── Normalisers ──────────────────────────────

// Derives initials from a full_name string
function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return (parts[0]?.[0] ?? "?").toUpperCase();
}

// Maps backend "inactive" / "active" to the UserStatus union
function normaliseStatus(raw: string): UserStatus {
  if (raw === "active") return "active";
  if (raw === "inactive") return "inactive";
  return "pending";
}

// Maps a list-response ApiUserListItem → UI User
// Role-specific profiles are NOT included (use mapApiSingleUserToUser for that)
export function mapApiUserToUser(raw: ApiUserListItem): User {
  const roles = raw.userrole
    .map((ur) => ur.role.name as UserRole)
    .filter(Boolean);

  return {
    id: String(raw.id),
    name: raw.full_name,
    email: raw.email,
    phone: raw.phone_number ?? "—",
    initials: getInitials(raw.full_name),
    emailVerified: raw.email_verified_at !== null,
    roles: roles.length > 0 ? roles : [],
    status: normaliseStatus(raw.status),
    blockedRoles: [],
    joinedAt: raw.created_at,
    lastActive: raw.updated_at,
    location: "—", // not available in list endpoint
  };
}

// Maps a single-user response → UI User, including provider profile if present
export function mapApiSingleUserToUser(
  raw: ApiUserListItem & { provider?: ApiProviderDetail },
): User {
  const base = mapApiUserToUser(raw);

  let providerProfile: ProviderProfile | undefined;
  if (raw.provider) {
    const p = raw.provider;
    providerProfile = {
      businessName: p.business_name,
      category: String(p.category), // raw id — resolve to name when category endpoint available
      address: p.address,
      phone: p.phone_number,
      teamSize: p.team_size,
      serviceType: p.service_type,
      liveAt: p.live_at,
      providerStatus: p.status,
      verified: p.status === "active",
      // Fields not yet in API — safe defaults
      rating: 0,
      totalReviews: 0,
      bio: "",
      services: [],
      businessHours: [],
    };
  }

  return {
    ...base,
    provider: providerProfile,
  };
}

// ─── Filter state ────────────────────────────

export interface UserFiltersState {
  search: string;
  role: UserRole | "all";
  status: UserStatus | "all";
}

// ─── Action union ────────────────────────────

export type UserActionType =
  | "block_user"
  | "activate_user"
  | "block_role"
  | "unblock_role";

// ─── Display constants ───────────────────────

export const ROLE_LABELS: Record<UserRole, string> = {
  client: "Client",
  provider: "Provider",
  vendor: "Vendor",
  employer: "Employer",
  staff: "Staff",
  admin: "Admin",
  super_admin: "Super Admin",
};

export const ROLE_COLORS: Record<
  UserRole,
  { bg: string; text: string; border: string }
> = {
  client: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  provider: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },
  vendor: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  employer: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  staff: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  admin: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  super_admin: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
};

// Covers all possible status values including "inactive" from the real API
export const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-gray-100 text-gray-500 border-gray-200",
  suspended: "bg-rose-50 text-rose-700 border-rose-200",
  pending: "bg-sky-50 text-sky-700 border-sky-200",
};

export const STATUS_DOT: Record<string, string> = {
  active: "bg-emerald-500",
  inactive: "bg-gray-400",
  suspended: "bg-rose-500",
  pending: "bg-sky-400",
};

export const ROLES_WITH_DETAIL_VIEW: UserRole[] = [
  "provider",
  "vendor",
  "employer",
];
