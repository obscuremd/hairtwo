import axios from "axios";
import { NextResponse } from "next/server";

const BASE_URL = "https://api5.project.hairxify.com/api/cats";

export async function GET() {
  try {
    const res = await axios.get(`${BASE_URL}`, {
      headers: {
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
        Accept: "application/json",
      },
    });
    const data = res.data.cat;
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}
