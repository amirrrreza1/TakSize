"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";

export default function VerificationCodeForm({ phoneNumber, onBack }) {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (code.every((d) => d !== "")) formRef.current?.requestSubmit();
  }, [code]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newCode = [...code];
      newCode[idx] = val;
      setCode(newCode);
      if (val && idx < 3) inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0)
      inputRefs.current[idx - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const activationCode = code.join("");
    if (activationCode.length !== 4) {
      toast.error("کد تایید کامل نیست");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, activationCode }),
      });

      const data = await res.json();
      if (!res.ok || !data.isSuccess) {
        toast.error(data.message || "ورود ناموفق بود");
      } else {
        Cookies.set("access_token", data.accessToken, {
          expires: (data.expiresIn ?? 604800) / 86400,
          path: "/",
          sameSite: "Lax",
          secure: true,
        });
        if (data.refreshToken)
          Cookies.set("refresh_token", data.refreshToken, {
            expires: 30,
            path: "/",
            sameSite: "Lax",
            secure: true,
          });

        toast.success(data.message);
        router.replace("/profile");
      }
    } catch {
      toast.error("خطای شبکه");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 h-screen">
      <h1>کد تایید را وارد کنید</h1>
      <p className="w-[90%] mx-auto text-center">
        لطفا کد تاییدی که به شماره‌ی {phoneNumber} پیامک شده را وارد کنید
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row-reverse gap-4 mt-4">
          {code.map((num, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-14 h-14 text-center text-xl border-2 border-gray-300 rounded-full focus:outline-none"
            />
          ))}
        </div>

        <div className="mx-auto mt-5 flex flex-col gap-3">
          <SubmitButton title="ورود" disabled={code.includes("") || loading} />
          <button
            type="button"
            onClick={onBack}
            className="text-left px-12 py-2 bg-[var(--mainGreen)] text-white rounded-[30px] hover:bg-[#34bdb1]"
          >
            بازگشت
          </button>
        </div>
      </form>
    </div>
  );
}
