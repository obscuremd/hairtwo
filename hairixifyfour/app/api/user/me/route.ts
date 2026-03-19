import { NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";
import { API_ENDPOINTS } from "../../endpoints";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Missing token" },
      { status: 400 },
    );
  }

  const result = await apiCall(API_ENDPOINTS.GET_ME, {
    headers: {
      Authorization: token,
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch authenticated provider" },
      { status: result.status },
    );
  }

  return NextResponse.json(result.data, { status: 200 });
}
