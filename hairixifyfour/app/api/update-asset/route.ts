// app/api/upload-asset/route.ts
// Proxies a multipart image upload to https://api5.project.hairxify.com/api/uploadassets
// Usage: POST /api/upload-asset  (multipart/form-data)
//   fields:  file (File), path (string)   e.g. "services/3"
// Returns: { success: true, imagePath: "images1/services/3/..." }

import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_URL = "https://api5.project.hairxify.com/api/updateassets";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.formData();

    const file = body.get("file") as File | null;
    const path = (body.get("path") as string | null) ?? "uploads";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 },
      );
    }

    const authHeader = req.headers.get("authorization") ?? "";

    // Build the form data the external API expects
    const outgoing = new FormData();
    outgoing.append("images[1]", file);
    outgoing.append("size", "1");
    outgoing.append("path", path);
    outgoing.append("type[0]", file.type);

    const res = await fetch(EXTERNAL_URL, {
      method: "PUT",
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Authorization: authHeader,
        Accept: "application/json",
        // Do NOT set Content-Type — fetch sets the correct multipart boundary
      },
      body: outgoing,
    });

    const data = await res.json();

console.log("UPDATE ASSET RESPONSE:", data); // 👈 ADD THIS

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message ?? data?.error ?? "image update failed",
        },
        { status: res.status },
      );
    }

    // External response: { images: { "1": "images1/services/..." } }
    const imagePath = data?.images?.["1"] as string | undefined;
    if (!imagePath) {
      return NextResponse.json(
        { success: false, message: "No image path in response" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, imagePath });
  } catch (err) {
    console.error("[update-asset]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
