import axios, { AxiosError } from "axios";
import { success } from "zod/v4";

export function getStoredCredentials(): {
  token: string | null;
} {
  if (typeof window === "undefined") {
    return { token: null };
  }
  return {
    token: localStorage.getItem("auth_token"),
  };
}

export function isLoggedIn(): boolean {
  const { token } = getStoredCredentials();
  return !!token;
}

export function clearCredentials() {
  localStorage.removeItem("auth_token");
}

export async function GetAuthUser(): Promise<GetAuthUserResponse> {
  const { token } = getStoredCredentials();

  if (!token) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const response = await axios.get(`/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.data;
    // console.log("api user", response.data);

    if (response.data.success) {
      return {
        success: true,
        message: "Provider fetched",
        user: {
          id: data.id,
          full_name: data.full_name,
          email: data.email,
          roles: data.roles,
          profile: data.profile,
        },
      };
    }

    return { success: false, message: "Provider not found" };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong",
    };
  }
}
export async function GetAuthProvider(): Promise<GetAuthProviderResponse> {
  const { token } = getStoredCredentials();

  if (!token) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const response = await axios.get(`/api/user/provider`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.data;

    if (response.data.success) {
      return {
        success: true,
        message: "Provider fetched",
        user: {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          business_name: data.business_name,
          phone_number: data.phone_number,
          address: data.address,

          state: data.state,
          local: data.local,
          area: data.area,

          category: data.category,

          service_type: data.service_type,
          team_size: data.team_size,

          live_at: data.live_at,
          status: data.status,

          user: data.user,

          business_hours: data.business_hours,

          created_at: data.created_at,
          updated_at: data.updated_at,
        },
      };
    }

    return { success: false, message: "Provider not found" };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong",
    };
  }
}
