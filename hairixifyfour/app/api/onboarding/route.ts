import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  "https://api5.project.hairxify.com/api/provider/providers/onboard";

export async function POST(request: NextRequest) {
  try {
    // ✅ Get body from frontend
    const body = await request.json();

    // ✅ Forward to external API
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Onboarding failed" },
      { status: 500 },
    );
  }
}
