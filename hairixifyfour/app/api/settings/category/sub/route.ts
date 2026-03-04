import axios from "axios";
import { NextResponse } from "next/server";

const BASE_URL = "https://api5.project.hairxify.com/api/cats/subs/";

export async function GET() {
  try {
    const res = await axios.get(`${BASE_URL}`, {
      headers: {
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
        Accept: "application/json",
      },
    });
    console.log("cat api res: ", res);
    const data = res.data.subcat;
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}
