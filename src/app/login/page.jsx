"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { register, login } from "../../lib/actions/auth";
import SubmitButton from "../../Components/SubmitButton/SubmitButton";
import ModalWrapper from "../../Components/ModalWrapper/ModalWrapper";

/* ---------- فرم شماره تلفن ---------- */
function PhoneNumberForm({ onSuccess }) {
  const [state, formAction] = React.useActionState(register, {});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.message && !state.isSuccess) toast.error(state.message);
    if (state?.isSuccess) {
      localStorage.setItem("phoneNumber", state.phoneNumber);
      onSuccess(state.phoneNumber);
    }
  }, [state, onSuccess]);

  const isButtonDisabled = phoneNumber.length < 11;

  return (
    <>
      <h1 className="text-center w-full pb-5 border-b-2 border-gray-300">
        ورود به حساب کاربری
      </h1>

      <form
        action={formAction}
        className="w-full absolute top-[40%] right-[50%] translate-x-[50%]"
      >
        <div className="flex flex-col gap-y-4 justify-center items-center">
          <label htmlFor="number">شماره همراه خود را وارد کنید</label>
          <input
            id="number"
            name="number"
            type="tel"
            className="mt-1 block w-[80%] max-w-[450px] px-3 py-2 border-2 border-[#DBDBDB] rounded-[30px] shadow-sm focus:outline-none text-center"
            value={phoneNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setPhoneNumber(val.slice(0, 11));
            }}
          />
          <SubmitButton title="ارسال" disabled={isButtonDisabled} />
        </div>

        <div className="w-full text-center mt-6 text-gray-400 text-sm">
          <p>
            ثبت نام در تکسایز به منزله‌ی
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-(--color-main-green) font-bold"
            >
              پذیرش قوانین
            </button>
            آن است
          </p>
        </div>
      </form>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)}>
        {/* محتوای قوانین همان قبلی */}
      </ModalWrapper>
    </>
  );
}

/* ---------- فرم کد تأیید ---------- */
function VerificationCodeForm({ phoneNumber }) {
  const router = useRouter();
  const [state, formAction] = React.useActionState(login, {});
  const [code, setCode] = useState(["", "", "", ""]);
  const formRef = useRef(null);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.message && !state.isSuccess) toast.error(state.message);
    if (state?.isSuccess) {
      toast.success(state.message);
      localStorage.removeItem("phoneNumber");
      router.push("/1");
    }
  }, [state, router]);

  useEffect(() => {
    if (code.every((d) => d !== "")) {
      formRef.current?.requestSubmit();
    }
  }, [code]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newCode = [...code];
      newCode[idx] = val;
      setCode(newCode);
      if (val && idx < 3)
        setTimeout(() => inputRefs[idx + 1].current?.focus(), 0);
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0)
      inputRefs[idx - 1].current?.focus();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 h-screen">
      <h1>کد تایید را وارد کنید</h1>
      <p>لطفا کد تاییدی که به شماره‌ی {phoneNumber} پیامک شده را وارد کنید</p>

      <form
        ref={formRef}
        action={formAction}
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row-reverse gap-4 mt-4">
          {code.map((num, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="text"
              name={`digit-${idx}`}
              inputMode="numeric"
              maxLength={1}
              value={num}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-14 h-14 text-center text-xl border-2 border-gray-300 rounded-full focus:outline-none"
            />
          ))}
        </div>

        <input type="hidden" name="activationCode" value={code.join("")} />
        <div className="mx-auto mt-5">
          <SubmitButton title="ورود" />
        </div>
      </form>
    </div>
  );
}

/* ---------- صفحه اصلی ---------- */
export default function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("phoneNumber");
    if (saved) setPhoneNumber(saved);
  }, []);

  return (
    <div className="mt-5 relative h-screen">
      {phoneNumber ? (
        <VerificationCodeForm phoneNumber={phoneNumber} />
      ) : (
        <PhoneNumberForm onSuccess={setPhoneNumber} />
      )}
    </div>
  );
}
