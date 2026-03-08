// app/api/booked/[providerId]/route.ts

import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/booked/provider";

export async function GET(
  request: Request,
  context: { params: Promise<{ providerId: string }> },
) {
  const { providerId } = await context.params;
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date"); // e.g. "2026-03"

  try {
    const response = await axios.get(`${API_URL}/${providerId}`, {
      params: date ? { date } : undefined,
      headers: {
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch booked slots" },
      { status: 500 },
    );
  }
}
