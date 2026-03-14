// ─────────────────────────────────────────────
// app/api/admin/users/[email]/route.ts
//
// GET  — proxies: GET  https://api5.project.hairxify.com/api/admin/user/{email}
//        Returns a single user with full provider/gallery data
//
// PUT  — proxies: PUT  https://api5.project.hairxify.com/api/admin/user/{email}
//        Updates user status (body: { status: "active" | "inactive" })
//
// Auth: Forwards Authorization: Bearer <token> from the client
// Usage:
//   GET /api/admin/users/someone%40email.com
//   PUT /api/admin/users/someone%40email.com   { status: "active" }
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api5.project.hairxify.com/api/admin/user";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

// ─── GET single user ──────────────────────────

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } },
) {
  const authHeader = request.headers.get("authorization") ?? "";
  const email = decodeURIComponent(params.email);

  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(email)}`, {
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
        { success: false, message: data?.message ?? "Failed to fetch user" },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[admin/users/:email GET]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// ─── PUT update user status ───────────────────

export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } },
) {
  const authHeader = request.headers.get("authorization") ?? "";
  const email = decodeURIComponent(params.email);

  try {
    const body = await request.json();

    const res = await fetch(`${API_BASE}/${encodeURIComponent(email)}`, {
      method: "PUT",
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
        { success: false, message: data?.message ?? "Failed to update user" },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[admin/users/:email PUT]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
