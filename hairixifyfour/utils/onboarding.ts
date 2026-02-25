/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/onboardProvider.ts

import axios, { AxiosError } from "axios";

const API_URL = "https://api5.project.hairxify.com/api";

export const onboardProvider = async (
  payload: RegistrationPayload,
): Promise<ApiResponse> => {
  try {
    console.log("payload:", payload);
    const response = await axios.post("/api/onboarding", payload);
    console.log("response", response);

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
    const response = await axios.get(`/api/settings/category`);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.category,
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
    const response = await axios.get(`/api/settings/recurrence`);

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
    const response = await axios.get(`/api/settings/types`);
    // console.log("types response: ", response.data.type);

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
