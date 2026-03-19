
import { NextRequest, NextResponse } from "next/server";
import {API_ENDPOINTS} from "../endpoints"
import { apiCall } from "@/utils/apiCall";


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date"); // "yyyy-MM"
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const params = new URLSearchParams();
    if (date) params.set("date", date);

    const result = await apiCall(`${API_ENDPOINTS.GET_BOOKED}?${params}`, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            result.data?.message ??
            result.error ??
            "Failed to fetch booked slots",
        },
        { status: result.status },
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (err) {
    console.error("[booked]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
