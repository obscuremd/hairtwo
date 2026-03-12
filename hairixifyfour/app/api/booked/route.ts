// app/api/booked/route.ts
// Dashboard: fetch this provider's bookings for a given month.
// Requires Authorization: Bearer <token> — the backend identifies the provider from it.
// Usage: GET /api/booked?date=2026-03

import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/booking/booked";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date"); // "yyyy-MM"
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const params = new URLSearchParams();
    if (date) params.set("date", date);

    const res = await fetch(`${API_URL}?${params}`, {
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Accept: "application/json",
        Authorization: authHeader,
      },
      // Don't cache — bookings are live data
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message ?? "Failed to fetch booked slots",
        },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[booked]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
