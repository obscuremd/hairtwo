// app/api/booking2/route.ts
// Guest booking — full client details required in the body.
// Body: { service, booking_start, booking_date, first_name, last_name,
//         email, phone_number, password, password_confirmation }

import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/booking2";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message ?? data?.error ?? "Booking failed",
        },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("[booking2]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
