import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api5.project.hairxify.com/api/location";

const ALLOWED_LOCATIONS = ["state", "local", "area"];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ location: string }> },
) {
  const { location } = await context.params; // ✅ NEW (Next 15)

  // ✅ Prevent random endpoint abuse
  if (!ALLOWED_LOCATIONS.includes(location)) {
    return NextResponse.json(
      { success: false, message: "Invalid location type" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(`${BASE_URL}/${location}`, {
      headers: {
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
        Accept: "application/json",
      },
      cache: "no-store", // optional (avoids caching)
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch locations" },
      { status: 500 },
    );
  }
}
