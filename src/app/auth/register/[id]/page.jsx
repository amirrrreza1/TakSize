"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SubmitButton from "../../../../Components/SubmitButton/SubmitButton";
import { useActionState } from "react";
import { login } from "../../../../lib/actions/auth";

const Login = () => {
  const router = useRouter();
  const state = useActionState(login);
  const [phoneNum, setPhoneNum] = useState(null);
  const [code, setCode] = useState(["", "", "", ""]);
  const formRef = useRef(null);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    setPhoneNum(localStorage.getItem("phoneNumber"));
  }, []);

  useEffect(() => {
    // فوکوس خودکار روی input اول
    inputRefs[0].current?.focus();
  }, [inputRefs]);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.message) {
      if (!state.isSuccess) {
        toast.error(state.message);
      }
    }
    if (state?.isSuccess) {
      toast.success(state.message);
      router.push("/1");
    }
  }, [state, router]);

  useEffect(() => {
    // وقتی همه‌ی رقم‌ها پر شدن، فرم سابمیت بشه
    if (code.every((digit) => digit !== "")) {
      formRef.current?.requestSubmit();
    }
  }, [code]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        setTimeout(() => {
          inputRefs[index + 1].current?.focus();
        }, 0);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  if (phoneNum === null) return null;

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 h-screen">
      <h1>کد تایید را وارد کنید</h1>
      <p>لطفا کد تاییدی که به شماره ی {phoneNum} پیامک شده را وارد کنید</p>
      <form
        ref={formRef}
        action={login}
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row-reverse gap-4 mt-4">
          {code.map((num, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              name={`digit-${index}`}
              inputMode="numeric"
              maxLength={1}
              value={num}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl border-2 border-gray-300 rounded-full focus:outline-none"
            />
          ))}
        </div>

        <input type="hidden" name="activationCode" value={code.join("")} />

        <div className="mx-auto mt-[20px]">
          <SubmitButton title="ورود" />
        </div>
      </form>
    </div>
  );
};

export default Login;
