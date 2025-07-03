"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function register(state, formData) {
  let phoneNumber = formData.get("number");
  cookies().set({
    name: "phone_nummber",
    value: phoneNumber,
    httpOnly: true,
    maxAge: 180,
  });

  if (phoneNumber === "") {
    return {
      error: "phone number is required...!",
    };
  }
  let res = await fetch(
    "https://api.taksize.com/api/v1/Common/Account/SendActivationCode",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        imei: "1234567891223456789",
      }),
    }
  );
  let data = await res.json();
  return { ...data, phoneNumber };
}

async function login(state, formData) {
  let activationCode = formData.get("activationCode");
  let phoneLocal = cookies().get("phone_nummber")?.value;
  const cookieStore = await cookies();

  let res = await fetch("https://api.taksize.com/api/v1/Common/Account/Login", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneLocal,
      activationCode: activationCode,
      deviceModel: "Samsung",
      imei: "123456789123456789",
      ip: "192.168.02.25",
      osName: "android",
    }),
  });

  const result = await res.json();

  const accessToken = result?.data?.tokens?.access_token?.value;
  const refreshToken = result?.data?.tokens?.refresh_token;

  if (!accessToken) {
    return {
      isSuccess: false,
      message: result?.data?.message || "ورود ناموفق بود",
      ...result,
    };
  }

  cookieStore.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    maxAge: result?.data?.tokens?.access_token?.expires_in || 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
  });

  if (refreshToken) {
    cookieStore.set({
      name: "refresh_token",
      value: refreshToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
  }

  redirect("/profile");
}

export { register, login };
