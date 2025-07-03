import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({
    message: "خروج از حساب کاربری با موفقیت انجام شد",
  });

  res.cookies.delete("access_token");
  res.cookies.delete("refresh_token");

  return res;
}

export const GET = POST;
