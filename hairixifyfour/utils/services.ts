// ─────────────────────────────────────────────
// utils/services.ts
// ─────────────────────────────────────────────

import axios, { AxiosError } from "axios";
import { getStoredCredentials } from "./user";

// ─── GetProviderServices (existing — by user ID) ──────────────────────────────
// Unchanged from the original. Fetches service groups by provider user ID.
// Calls: GET /api/services/[id]

interface GetProviderServicesResult {
  success: boolean;
  message: string;
  groups?: ServiceGroup[];
}

export async function GetProviderServices(): Promise<GetProviderServicesResult> {
  try {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      return { success: false, message: "Not authenticated" };
    }

    const response = await axios.get<{ groups: ServiceGroup[] }>(
      `/api/services/${userId}`,
    );

    const groups = response.data?.groups;
    console.log("provider service", response.data?.groups);

    if (!Array.isArray(groups)) {
      return { success: false, message: "Unexpected response format" };
    }

    return { success: true, message: "Services fetched", groups };
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

// ─── GetMyProviderServices ────────────────────────────────────────────────────
// Fetches the logged-in provider's own services using their auth token.
// Response shape: { success: "valid", data: Service[] }
// — images is already Array<Image> as per the updated interface, no normalisation needed.
//
// The flat array is wrapped into a single ServiceGroup so CheckoutPage's
// groups.flatMap(g => g.services) keeps working without any changes.
//
// Calls: GET /api/services/me

export interface GetMyServicesResult {
  success: boolean;
  message: string;
  groups?: ServiceGroup[];
}

export async function GetMyProviderServices(): Promise<GetMyServicesResult> {
  try {
    const { token } = getStoredCredentials();
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }

    const response = await axios.get<{ success: string; data: Service[] }>(
      "/api/services/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log("my services", response.data);

    const services = response.data?.data;

    if (!Array.isArray(services)) {
      return { success: false, message: "Unexpected response format" };
    }

    // Wrap in a single synthetic group — CheckoutPage needs no changes
    const groups: ServiceGroup[] = [
      {
        name: "My Services",
        user: services[0]?.provider ?? 0,
        provider: services[0]?.provider ?? 0,
        status: "active",
        services,
      },
    ];

    return { success: true, message: "Services fetched", groups };
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

// ─── CreateProviderService ────────────────────────────────────────────────────
// Creates a new service for the authenticated provider.
// images in the payload is string[] — the API accepts paths, not Image objects.
// Calls: POST /api/services/me

export interface CreateServiceResult {
  success: boolean;
  message: string;
}

export async function CreateProviderService(
  payload: Omit<Service, "id" | "created_at" | "updated_at" | "images"> & {
    images: string[];
  },
): Promise<CreateServiceResult> {
  try {
    const { token } = getStoredCredentials();
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }

    await axios.post("/api/services/me", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: "Service created successfully" };
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

// ─── UpdateProviderService ────────────────────────────────────────────────────
// Updates an existing service. Only sends fields that have changed.
// images in the payload is string[] — the API accepts paths, not Image objects.
// Calls: PUT /api/services/me/:serviceId

export interface UpdateServiceResult {
  success: boolean;
  message: string;
}

export async function UpdateProviderService(
  serviceId: number,
  payload: Partial<
    Omit<Service, "id" | "created_at" | "updated_at" | "images"> & {
      images: string[];
    }
  >,
): Promise<UpdateServiceResult> {
  try {
    const { token } = getStoredCredentials();
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }

    await axios.put(`/api/services/me/${serviceId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: "Service updated successfully" };
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
