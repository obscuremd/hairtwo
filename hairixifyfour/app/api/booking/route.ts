import { NextRequest, NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";
import { API_ENDPOINTS } from "../endpoints";


export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const body = await request.json();

    const result = await apiCall(API_ENDPOINTS.POST_BOOKING, {
      method: "POST",
      body,
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
            result.data?.error ??
            result.error ??
            "Booking failed",
        },
        { status: result.status },
      );
    }

    return NextResponse.json({ success: true, data: result.data }, { status: 200 });
  } catch (err) {
    console.error("[booking]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
