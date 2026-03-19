import { NextRequest, NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";

const BASE_URL = "https://api5.project.hairxify.com/api/location";

const ALLOWED_LOCATIONS = ["state", "local", "area"];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ location: string }> },
) {
  const { location } = await context.params;

  // ✅ Prevent random endpoint abuse
  if (!ALLOWED_LOCATIONS.includes(location)) {
    return NextResponse.json(
      { success: false, message: "Invalid location type" },
      { status: 400 },
    );
  }

  const result = await apiCall(`${BASE_URL}/${location}`);

  if (!result.ok) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch locations" },
      { status: result.status },
    );
  }

  return NextResponse.json(result.data, { status: 200 });
}
