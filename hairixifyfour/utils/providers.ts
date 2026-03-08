/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

export async function GetProviders(): Promise<ApiResponse> {
  try {
    const response = await axios.get("/api/provider/providers");
    // console.log("provider res ", response);
    if (response.data.success) {
      return {
        message: "providers successfuly gotten",
        success: true,
        data: response.data.providers,
      };
    } else {
      return {
        message: "failed to get providers",
        success: false,
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    console.log("error: ", error);

    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Something went wrong. Please try again.",
    };
  }
}
export async function GetSingleProvider(id: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(`/api/provider/${id}`);

    if (response.data.provider) {
      return {
        message: "service provider gotten",
        success: true,
        data: response.data.provider,
      };
    } else {
      return {
        message: "failed to get provider",
        success: false,
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    console.log("error: ", error);

    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Something went wrong. Please try again.",
    };
  }
}
export async function GetProviderServices(id: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(`/api/services/${id}`);

    if (response.data.groups) {
      return {
        message: "service provider gotten",
        success: true,
        data: response.data.groups,
      };
    } else {
      return {
        message: "failed to get provider services",
        success: false,
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    console.log("error: ", error);

    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Something went wrong. Please try again.",
    };
  }
}

export function getStoredCredentials(): {
  token: string | null;
  userId: string | null;
  role: string | null;
} {
  if (typeof window === "undefined") {
    return { token: null, userId: null, role: null };
  }
  return {
    token: localStorage.getItem("auth_token"),
    userId: localStorage.getItem("user_id"),
    role: localStorage.getItem("role"),
  };
}

export function isLoggedIn(): boolean {
  const { token, userId } = getStoredCredentials();
  return !!token && !!userId;
}

export function clearCredentials() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("role");
}

// ─── Fetch authenticated provider (only if role === "provider") ───────────────

export async function GetAuthProvider(): Promise<GetAuthProviderResponse> {
  const { token, userId, role } = getStoredCredentials();

  if (!token || !userId) {
    return { success: false, message: "Not authenticated" };
  }

  // If the user is a client, just return their basic info without hitting
  // the providers endpoint (clients have no provider record)
  if (role !== "provider") {
    return {
      success: true,
      message: "Client user",
      user: {
        id: parseInt(userId),
        full_name: "", // enriched below if needed
        email: "",
        phone_number: null,
        status: "active",
        role: role ?? "client",
      },
    };
  }

  try {
    const response = await axios.get(`/api/provider/me`, {
      params: { userId },
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data;
    console.log("auth user response", data);

    if (data.provider) {
      return {
        success: true,
        message: "Provider fetched",
        provider: data.provider,
        user: {
          id: data.provider.user.id,
          full_name: data.provider.user.full_name,
          email: data.provider.user.email,
          phone_number: data.provider.user.phone_number,
          status: data.provider.user.status,
          role: "provider",
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
