import { NextRequest, NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";
import { API_ENDPOINTS } from "@/app/api/endpoints";


export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const body = await request.json();

    const result = await apiCall(`${API_ENDPOINTS.GET_BUSINESS_HOUR}/${id}`, {
      method: "PUT",
      body,
      headers: {
        Authorization: authHeader,
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            result.data?.message ?? result.error ?? "Update failed",
        },
        { status: result.status },
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    console.error(`[me/provider/business_hour/${id}]`, err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
