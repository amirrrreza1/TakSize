import { NextResponse } from "next/server";

export async function POST(request) {
  const { phoneNumber } = await request.json();
  if (!phoneNumber)
    return NextResponse.json(
      { error: "phone number is required" },
      { status: 400 }
    );

  const taksizeRes = await fetch(
    "https://api.taksize.com/api/v1/Common/Account/SendActivationCode",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, imei: "1234567891223456789" }),
    }
  );

  const data = await taksizeRes.json();
  return NextResponse.json(data, { status: taksizeRes.status });
}
