// ─────────────────────────────────────────────
// types/user.ts
// Central type definitions for User Management
// ─────────────────────────────────────────────

export type UserRole =
  | "client"
  | "provider"
  | "vendor"
  | "employer"
  | "staff"
  | "admin"
  | "super_admin";

export type UserStatus = "active" | "suspended" | "pending";

export type ServiceStatus = "active" | "paused" | "inactive";
export type ProductStatus = "active" | "out_of_stock" | "paused";
export type JobStatus = "active" | "closed";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

// ─── Role-specific data ─────────────────────

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
  category: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
  bio: string;
  services: Service[];
  businessHours: BusinessHour[];
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

// ─── Core User ──────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  avatarUrl?: string;
  roles: UserRole[];
  status: UserStatus;
  blockedRoles: UserRole[];
  joinedAt: string; // ISO date string
  lastActive: string; // ISO date string
  location: string;
  // Role-specific profiles — only present if user has that role
  provider?: ProviderProfile;
  vendor?: VendorProfile;
  employer?: EmployerProfile;
}

// ─── Action types for state updates ─────────

export type UserAction =
  | { type: "block_user" }
  | { type: "activate_user" }
  | { type: "block_role"; role: UserRole }
  | { type: "unblock_role"; role: UserRole };

// ─── Filter state ────────────────────────────

export interface UserFiltersState {
  search: string;
  role: UserRole | "all";
  status: UserStatus | "all";
}

// ─── Constants ───────────────────────────────

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
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
  },
  provider: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
  },
  vendor: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
  },
  employer: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  staff: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/20",
  },
  admin: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/20",
  },
  super_admin: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/20",
  },
};

export const ROLES_WITH_DETAIL_VIEW: UserRole[] = [
  "provider",
  "vendor",
  "employer",
];
