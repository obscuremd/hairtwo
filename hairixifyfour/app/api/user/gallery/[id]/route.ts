// app/api/user/gallery/[id]/route.ts
// Deletes a provider gallery image by its gallery entry id.
// Usage: DELETE /api/user/gallery/2

import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api5.project.hairxify.com/api/me/gallery/provider";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const authHeader = request.headers.get("authorization") ?? "";

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
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
    console.error(`[me/gallery/provider/${id}]`, err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
