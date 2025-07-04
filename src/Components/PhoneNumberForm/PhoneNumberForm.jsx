"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import SubmitButton from "@/Components/SubmitButton/SubmitButton";
import ModalWrapper from "@/Components/ModalWrapper/ModalWrapper";

export default function PhoneNumberForm({ onSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        toast.error(data.error || "ارسال ناموفق بود");
      } else {
        onSuccess(phoneNumber); // شماره را به والد می‌دهیم
        toast.success("کد تایید ارسال شد");
      }
    } catch {
      toast.error("خطای شبکه");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center w-full pb-5 border-b-2 border-gray-300">
        ورود به حساب کاربری
      </h1>

      <form
        onSubmit={handleSubmit}
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
          <SubmitButton
            title="ارسال"
            disabled={phoneNumber.length < 11 || loading}
          />
        </div>

        <div className="w-full text-center mt-6 text-gray-400 text-sm">
          <p>
            ثبت نام در تکسایز به منزله‌ی{" "}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-green-500 font-bold"
            >
              پذیرش قوانین
            </button>{" "}
            آن است
          </p>
        </div>
      </form>

      <ModalWrapper isOpen={showModal} onClose={() => setShowModal(false)}>
        {/* قوانین... */}
      </ModalWrapper>
    </>
  );
}
