import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/providers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const token = request.headers.get("Authorization");

  if (!userId || !token) {
    return NextResponse.json(
      { success: false, message: "Missing userId or token" },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: token, // "Bearer <token>"
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
