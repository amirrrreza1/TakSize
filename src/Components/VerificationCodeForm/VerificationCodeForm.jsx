import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login } from "../../lib/actions/auth";
import SubmitButton from "../../Components/SubmitButton/SubmitButton";

export default function VerificationCodeForm({ phoneNumber, onBack }) {
  const router = useRouter();
  const [state, formAction] = React.useActionState(login, {});
  const [code, setCode] = useState(["", "", "", ""]);
  const formRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.message && !state.isSuccess) toast.error(state.message);
    if (state?.isSuccess) {
      toast.success(state.message);
      localStorage.removeItem("phoneNumber");
      router.push("/profile");
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
      if (val && idx < 3) {
        setTimeout(() => {
          inputRefs.current[idx + 1]?.focus();
        }, 0);
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 h-screen">
      <h1>کد تایید را وارد کنید</h1>
      <p className="w-[90%] mx-auto text-center">لطفا کد تاییدی که به شماره‌ی {phoneNumber} پیامک شده را وارد کنید</p>

      <form
        ref={formRef}
        action={formAction}
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-row-reverse gap-4 mt-4">
          {code.map((num, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
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
        <div className="mx-auto mt-5 flex flex-col gap-3">
          <SubmitButton title="ورود" />
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
