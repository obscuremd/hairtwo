/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/onboardProvider.ts

import axios, { AxiosError } from "axios";
import { success } from "zod/v4";

export const onboardProvider = async (
  payload: RegistrationPayload,
): Promise<ApiResponse> => {
  try {
    const response = await axios.post("/api/onboarding", payload);

    return {
      success: true,
      message: response.data?.message || "Provider onboarded successfully!",
      data: response.data,
    };
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
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponse> => {
  try {
    const response = await axios.post("/api/onboarding/signIn", {
      email,
      password,
    });
    console.log("response", response);
    const data = response.data;
    if (data.success) {
      const token = data.token.token;
      const userId = data.token.user.id;
      const role = data.token.user.userrole?.[0]?.role?.name;

      // store values
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_id", String(userId));
      localStorage.setItem("role", role);

      return {
        success: true,
        message: "Sign in successful",
      };
    } else {
      return {
        success: false,
        message: response.data.error,
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
};

export const validateProvider = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<ApiResponse> => {
  try {
    const response = await axios.post("/api/onboarding/validation", {
      email,
      code,
    });
    console.log("response", response);
    if (response.data.success) {
      return {
        success: true,
        message: response.data?.message || "Provider Validation successfully!",
      };
    } else {
      return {
        success: false,
        message: response.data.error,
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
};

export async function getStates(): Promise<{
  success: boolean;
  message?: string;
  data?: stateData[];
}> {
  try {
    const response = await axios.get(`/api/locations/state`);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data.state,
      };
    } else {
      return {
        success: false,
        message: "failed to fetch data",
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;

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
export async function getLocal(): Promise<{
  success: boolean;
  message?: string;
  data?: localData[];
}> {
  try {
    const response = await axios.get(`/api/locations/local`);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.local,
      };
    } else {
      return {
        success: false,
        message: "failed to fetch data",
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;

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
export async function getArea(): Promise<{
  success: boolean;
  message?: string;
  data?: areaData[];
}> {
  try {
    const response = await axios.get(`/api/locations/area`);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.area,
      };
    } else {
      return {
        success: false,
        message: "failed to fetch data",
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;

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
export async function getCategory(): Promise<{
  success: boolean;
  message?: string;
  data?: Category[];
}> {
  try {
    const response = await axios.get(`/api/settings/category/sub`);
    console.log("categpry response", response);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "failed to fetch data",
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;

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
export async function getRecurrence(): Promise<{
  success: boolean;
  message?: string;
  data?: Recurrence[];
}> {
  try {
    const response = await axios.get(`/api/settings/setting/recurrence`);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data.recurrence,
      };
    } else {
      return {
        success: false,
        message: "failed to fetch data",
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;

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
export async function getService(): Promise<{
  success: boolean;
  message?: string;
  data?: ServiceType[];
}> {
  try {
    const response = await axios.get(`/api/settings/setting/types`);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data.type,
      };
    } else {
      return {
        success: false,
        message: "failed to fetch data",
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;

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
