// app/api/gallery/route.ts
// Registers an already-uploaded image path into the provider gallery
// Usage: POST /api/gallery  (application/json)
//   body: { type: "provider", type_id: number, type_type: "gallery", image: string }
// Returns: { success: true } | { success: false, message: string }

import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_URL = "https://api5.project.hairxify.com/api/gallery";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization") ?? "";

    const res = await fetch(EXTERNAL_URL, {
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
    console.error("[gallery]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
