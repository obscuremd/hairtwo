import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api5.project.hairxify.com/api/providersfe/settings";

const ALLOWED_SETTINGS = ["category", "recurrence", "types"];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ setting: string }> },
) {
  const { setting } = await context.params; // ✅ NEW (Next 15)

  // ✅ Prevent random endpoint abuse
  if (!ALLOWED_SETTINGS.includes(setting)) {
    return NextResponse.json(
      { success: false, message: "Invalid setting type" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(`${BASE_URL}/${setting}`, {
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
      { success: false, message: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}
