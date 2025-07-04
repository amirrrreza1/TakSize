import { NextResponse } from "next/server";

export async function POST(request) {
  const { phoneNumber, activationCode } = await request.json();

  if (!activationCode || !phoneNumber)
    return NextResponse.json(
      { isSuccess: false, message: "اطلاعات ناقص است" },
      { status: 400 }
    );

  const res = await fetch(
    "https://api.taksize.com/api/v1/Common/Account/Login",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber,
        activationCode,
        deviceModel: "Samsung",
        imei: "123456789123456789",
        ip: "192.168.02.25",
        osName: "android",
      }),
    }
  );

  const result = await res.json();
  const accessToken = result?.data?.tokens?.access_token?.value;
  const refreshToken = result?.data?.tokens?.refresh_token;

  if (!accessToken)
    return NextResponse.json(
      {
        isSuccess: false,
        message: result?.data?.message || "ورود ناموفق بود",
      },
      { status: 400 }
    );

  return NextResponse.json({
    isSuccess: true,
    message: "ورود موفقیت‌آمیز بود",
    accessToken,
    refreshToken,
    expiresIn: result?.data?.tokens?.access_token?.expires_in,
  });
}
