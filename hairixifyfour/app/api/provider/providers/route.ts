import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/providersfe/";

export async function GET() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch locations" },
      { status: 500 },
    );
  }
}
