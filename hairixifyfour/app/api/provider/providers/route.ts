import { NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";

const API_URL = "https://api5.project.hairxify.com/api/providersfe/";

export async function GET() {
  const result = await apiCall(API_URL);

  if (!result.ok) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch providers" },
      { status: result.status },
    );
  }

  return NextResponse.json(result.data, { status: 200 });
}
