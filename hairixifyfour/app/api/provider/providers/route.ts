import { NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";
import { API_ENDPOINTS } from "../../endpoints";



export async function GET() {
  const result = await apiCall(API_ENDPOINTS.GET_PROVIDERS);

  if (!result.ok) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch providers" },
      { status: result.status },
    );
  }

  return NextResponse.json(result.data, { status: 200 });
}
