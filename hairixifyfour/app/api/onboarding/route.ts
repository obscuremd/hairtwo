import { NextRequest, NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";
import { API_ENDPOINTS } from "../endpoints";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await apiCall(API_ENDPOINTS.POST_ONBOARDING, {
      method: "POST",
      body,
    });

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Onboarding failed" },
      { status: 500 },
    );
  }
}
