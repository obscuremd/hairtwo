// app/api/user/business_hour/[id]/route.ts
// Updates the start/end times of a single business hour entry.
// Usage: PUT /api/me/provider/business_hour/4
// Body: { start: "09:00", end: "17:00" }

import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  "https://api5.project.hairxify.com/api/me/provider/business_hour";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const body = await request.json();

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Authorization: authHeader,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data?.message ?? "Update failed" },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(`[me/provider/business_hour/${id}]`, err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
