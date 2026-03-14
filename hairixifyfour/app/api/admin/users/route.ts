// ─────────────────────────────────────────────
// app/api/admin/users/route.ts
//
// Proxies: GET https://api5.project.hairxify.com/api/admin/users
// Auth:    Forwards Authorization: Bearer <token> from the client
// Usage:   GET /api/admin/users
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api5.project.hairxify.com/api/admin/users";
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
        { success: false, message: data?.message ?? "Failed to fetch users" },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[admin/users GET]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
