// app/api/cats/route.ts
// Fetches categories and subcategories from hairxify
// Usage: GET /api/cats
// Returns the full cat array from the external API

import { NextResponse } from "next/server";

const EXTERNAL_URL = "https://api5.project.hairxify.com/api/cats";
const ACCESS_KEY = process.env.ACCESS_PASS_KEY ?? "";

export interface SubCat {
  id: number;
  name: string;
  slug: string;
  icon: string;
  status: string;
  cat: number;
}

export interface Cat {
  id: number;
  name: string;
  slug: string; // "provider" | "vendor" | "employer"
  subs: SubCat[];
}

export interface CatsResponse {
  success: string;
  cat: Cat[];
}

export async function GET() {
  try {
    const res = await fetch(EXTERNAL_URL, {
      headers: {
        "ACCESS-PASS-KEY": ACCESS_KEY,
        Accept: "application/json",
      },
      // Cache for 5 minutes — categories change rarely
      next: { revalidate: 300 },
    });

    const data: CatsResponse = await res.json();

    if (!res.ok || data.success !== "valid") {
      return NextResponse.json(
        { success: false, message: "Failed to fetch categories" },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, cat: data.cat });
  } catch (err) {
    console.error("[cats]", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
