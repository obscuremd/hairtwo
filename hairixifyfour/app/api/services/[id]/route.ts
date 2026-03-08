// api/services/[id]
import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/providersfe";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const response = await axios.get(`${API_URL}/${id}/services/`, {
      headers: {
        "ACCESS-PASS-KEY": process.env.ACCESS_PASS_KEY!,
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch providers service" },
      { status: 500 },
    );
  }
}
