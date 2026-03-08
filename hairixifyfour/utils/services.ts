// utils/services.ts

import axios, { AxiosError } from "axios";

interface GetProviderServicesResult {
  success: boolean;
  message: string;
  groups?: ServiceGroup[];
}

/**
 * Fetches service groups for the logged-in provider.
 * Uses the userId stored in localStorage under "user_id".
 * Calls Next.js route: GET /api/services/[id]
 */
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
