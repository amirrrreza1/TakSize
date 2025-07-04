"use client";

import PhoneNumberForm from "@/Components/PhoneNumberForm/PhoneNumberForm";
import VerificationCodeForm from "@/Components/VerificationCodeForm/VerificationCodeForm";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("phoneNumber");
    if (saved) setPhoneNumber(saved);
  }, []);

  const handleBack = () => {
    localStorage.removeItem("phoneNumber");
    setPhoneNumber(null);
  };

  return (
    <div className="mt-5 relative h-screen">
      {phoneNumber ? (
        <VerificationCodeForm phoneNumber={phoneNumber} onBack={handleBack} />
      ) : (
        <PhoneNumberForm onSuccess={setPhoneNumber} />
      )}
    </div>
  );
}
