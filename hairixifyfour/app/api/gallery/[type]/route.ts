// app/api/gallery/[type]/route.ts
// Posts an image to the gallery for either "user" or "provider" (or any future type).
// Usage: POST /api/gallery/user   body: { type_type: "profile", image: "path..." }
//        POST /api/gallery/provider  body: { type_id: number, type_type: "gallery", image: "path..." }

import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api5.project.hairxify.com/api/gallery";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ type: string }> },
) {
  const { type } = await context.params; // "user" | "provider" | anything else
  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const body = await request.json();

    const res = await fetch(`${BASE_URL}/${type}`, {
      method: "POST",
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Authorization: authHeader,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message ?? data?.error ?? "Gallery save failed",
        },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(`[gallery/${type}]`, err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
