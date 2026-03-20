// ─────────────────────────────────────────────
// app/api/services/me/[serviceId]/route.ts
//
// PUT — proxies: PUT https://api5.project.hairxify.com/api/me/provider/service/{serviceId}
// Auth: Forwards Authorization: Bearer <token> from the client request.
// Usage: PUT /api/services/me/5
// Body: Partial<UpdateServicePayload> — only the changed fields
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api5.project.hairxify.com/api/me/provider/service";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

type RouteContext = { params: Promise<{ serviceId: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
  const authHeader = request.headers.get("authorization") ?? "";
  const { serviceId } = await context.params;

  try {
    const body = await request.json();

    const res = await fetch(`${API_BASE}/${serviceId}`, {
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
        {
          success: false,
          message: data?.message ?? "Failed to update service",
        },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("[services/me/:serviceId PUT]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { serviceId } = await context.params;

  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const res = await fetch(`${API_BASE}/${serviceId}`, {
      method: "DELETE",
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Authorization: authHeader,
        Accept: "application/json",
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data?.message ?? "Delete failed" },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`[me/provider/service/${serviceId}]`, err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
