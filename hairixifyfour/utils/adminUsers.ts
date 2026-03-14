// ─────────────────────────────────────────────
// utils/adminUsers.ts
//
// Admin user management utilities.
// Follows the exact same pattern as utils/booking.ts:
//   - axios for HTTP calls
//   - getStoredCredentials() for the auth token
//   - Always calls /api/admin/* Next.js proxy routes
//   - Returns { success, message, data? } result objects
// ─────────────────────────────────────────────

import axios, { AxiosError } from "axios";
import { getStoredCredentials } from "./user";
import {
  GetAdminUsersApiResponse,
  GetAdminUserByEmailApiResponse,
  UpdateAdminUserApiResponse,
  User,
  mapApiUserToUser,
  mapApiSingleUserToUser,
} from "@/components/screenComponents/Admin/user/types";

// ─── GetAdminUsers ────────────────────────────
// Fetches the full user list for the admin table.
// Calls: GET /api/admin/users
// Requires admin auth token.

export interface GetAdminUsersResult {
  success: boolean;
  message: string;
  users?: User[];
}

export async function GetAdminUsers(): Promise<GetAdminUsersResult> {
  try {
    const { token } = getStoredCredentials();

    const response = await axios.get<GetAdminUsersApiResponse>(
      "/api/admin/users",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const raw = response.data?.users;

    if (!Array.isArray(raw)) {
      return { success: false, message: "Unexpected response format" };
    }

    const users: User[] = raw.map(mapApiUserToUser);

    return { success: true, message: "Fetched", users };
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

// ─── GetAdminUserByEmail ──────────────────────
// Fetches full detail for a single user including provider profile.
// Calls: GET /api/admin/users/:email
// Requires admin auth token.

export interface GetAdminUserByEmailResult {
  success: boolean;
  message: string;
  user?: User;
}

export async function GetAdminUserByEmail(
  email: string,
): Promise<GetAdminUserByEmailResult> {
  try {
    const { token } = getStoredCredentials();

    const response = await axios.get<GetAdminUserByEmailApiResponse>(
      `/api/admin/users/${encodeURIComponent(email)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const raw = response.data?.users;

    if (!raw || typeof raw !== "object") {
      return { success: false, message: "Unexpected response format" };
    }

    const user = mapApiSingleUserToUser(raw);

    return { success: true, message: "Fetched", user };
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

// ─── UpdateAdminUserStatus ────────────────────
// Updates a user's status on the backend.
// The API currently only supports status updates via email.
// Calls: PUT /api/admin/users/:email  body: { status: "active" | "inactive" }
// Requires admin auth token.

export interface UpdateAdminUserStatusResult {
  success: boolean;
  message: string;
}

export async function UpdateAdminUserStatus(
  email: string,
  status: "active" | "inactive",
): Promise<UpdateAdminUserStatusResult> {
  try {
    const { token } = getStoredCredentials();

    await axios.put<UpdateAdminUserApiResponse>(
      `/api/admin/users/${encodeURIComponent(email)}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return { success: true, message: "User status updated" };
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
