// ─────────────────────────────────────────────
// app/api/services/me/route.ts
//
// GET — proxies: GET https://api5.project.hairxify.com/api/me/provider/service/
// Auth: Forwards Authorization: Bearer <token> from the client request.
//       The token identifies the provider — no provider ID needed in the URL.
// Usage: GET /api/services/me
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/me/provider/service/";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const res = await fetch(API_URL, {
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Accept: "application/json",
        Authorization: authHeader,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message ?? "Failed to fetch services",
        },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[services/me GET]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// ─────────────────────────────────────────────
// POST — proxies: POST https://api5.project.hairxify.com/api/me/provider/service
// Creates a new service for the authenticated provider.
// Usage: POST /api/services/me
// Body: CreateServicePayload (see utils/services.ts)
// ─────────────────────────────────────────────

const POST_API_URL =
  "https://api5.project.hairxify.com/api/me/provider/service";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const body = await request.json();

    const res = await fetch(POST_API_URL, {
      method: "POST",
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message ?? "Failed to create service",
        },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[services/me POST]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
