/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextResponse } from "next/server";

const BASE_URL =
  "https://api5.project.hairxify.com/api/uploadassets?size=6&path=Test/Firstt&type[0]=image/jpeg&type[1]=image/jpg";

export async function POST() {
  try {
    const res = await axios.post(BASE_URL);

    return NextResponse.json({
      data: res.data,
      status: res.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response?.data || "Something went wrong",
      },
      { status: 500 },
    );
  }
}
