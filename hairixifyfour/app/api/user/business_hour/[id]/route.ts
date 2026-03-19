// app/api/user/business_hour/[id]/route.ts
// Updates the start/end times of a single business hour entry.
// Usage: PUT /api/me/provider/business_hour/4
// Body: { start: "09:00", end: "17:00" }

import { NextRequest, NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";

const BASE_URL =
  "https://api5.project.hairxify.com/api/me/provider/business_hour";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const body = await request.json();

    const result = await apiCall(`${BASE_URL}/${id}`, {
      method: "PUT",
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
            result.data?.message ?? result.error ?? "Update failed",
        },
        { status: result.status },
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    console.error(`[me/provider/business_hour/${id}]`, err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
