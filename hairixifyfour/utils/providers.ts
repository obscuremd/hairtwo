/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

export async function GetProviders(): Promise<ApiResponse> {
  try {
    const response = await axios.get("/api/provider/providers");
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
