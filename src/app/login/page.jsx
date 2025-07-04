"use client";

import { useState } from "react";
import PhoneNumberForm from "@/Components/PhoneNumberForm/PhoneNumberForm";
import VerificationCodeForm from "@/Components/VerificationCodeForm/VerificationCodeForm";

export default function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBack = () => setPhoneNumber("");

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
