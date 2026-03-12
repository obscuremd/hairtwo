import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/me";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Missing token" },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: token,
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch authenticated provider" },
      { status: 500 },
    );
  }
}
