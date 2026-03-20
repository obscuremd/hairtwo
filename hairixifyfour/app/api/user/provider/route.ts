// app/api/me/provider/route.ts

import { NextRequest, NextResponse } from "next/server";
import { apiCall } from "@/utils/apiCall";
import { API_ENDPOINTS } from "../../endpoints";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Missing token" },
      { status: 400 },
    );
  }

  const result = await apiCall(API_ENDPOINTS.GET_ME_PROVIDER, {
    headers: { Authorization: token },
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch authenticated provider" },
      { status: result.status },
    );
  }

  return NextResponse.json(result.data, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const token = request.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Missing token" },
      { status: 400 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 },
    );
  }

  const result = await apiCall(API_ENDPOINTS.GET_ME_PROVIDER, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        message: result.data?.message ?? "Failed to update provider",
      },
      { status: result.status },
    );
  }

  return NextResponse.json(
    { success: true, data: result.data },
    { status: 200 },
  );
}
