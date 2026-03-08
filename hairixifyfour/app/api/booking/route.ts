// app/api/booking/route.ts

import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/booking";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post(API_URL, body, {
      headers: {
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to create booking" },
      { status: 500 },
    );
  }
}
