import { NextResponse } from "next/server";

export async function POST(request) {
  const { phoneNumber } = await request.json();

  if (!phoneNumber)
    return NextResponse.json(
      { error: "phone number is required...!" },
      { status: 400 }
    );

  const res = await fetch(
    "https://api.taksize.com/api/v1/Common/Account/SendActivationCode",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber,
        imei: "1234567891223456789",
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json({ ...data, isSuccess: true, phoneNumber });
}
