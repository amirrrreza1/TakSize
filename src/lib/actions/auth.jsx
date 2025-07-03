"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function register(state, formData) {
  const phoneNumber = formData.get("number");

  const cookieStore = await cookies();
  cookieStore.set({
    name: "phone_nummber",
    value: phoneNumber,
    httpOnly: true,
    maxAge: 180,
  });

  if (!phoneNumber || phoneNumber === "") {
    return {
      error: "phone number is required...!",
    };
  }

  const res = await fetch(
    "https://api.taksize.com/api/v1/Common/Account/SendActivationCode",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber,
        imei: "0000000000000000",
      }),
    }
  );

  const data = await res.json();

  if (data.token) {
    cookieStore.set({
      name: "auth_token",
      value: data.token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return { ...data, phoneNumber };
}

async function login(formData) {
  if (!formData) throw new Error("formData is undefined");

  const activationCode = formData.get("activationCode");
  const deviceModel = formData.get("deviceModel") || "Web";
  const imei = formData.get("imei") || "0000000000000000";
  const osName = formData.get("osName") || "Web";
  const ip = "192.168.02.25";

  const cookieStore = cookies();
  const phoneLocal = cookieStore.get("phone_nummber")?.value;

  if (!activationCode) {
    return { error: "کد تأیید وارد نشده است" };
  }

  if (!phoneLocal) {
    return { error: "شماره تلفن پیدا نشد" };
  }

  const response = await fetch(
    "https://api.taksize.com/api/v1/Common/Account/Login",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: phoneLocal,
        activationCode,
        deviceModel,
        imei,
        ip,
        osName,
      }),
    }
  );

  const result = await response.json();

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
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  if (refreshToken) {
    cookieStore.set({
      name: "refresh_token",
      value: refreshToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  // ✅ ریدایرکت بعد از لاگین موفق
  redirect("/profile");
}

export { register, login };
