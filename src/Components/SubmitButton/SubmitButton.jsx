"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ title, disabled = false }) => {
  const { pending } = useFormStatus();

  const isDisabled = pending || disabled;

  return (
    <button
      className={`text-center px-12 py-2 bg-[var(--mainGreen)] text-white rounded-[30px]  ${
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "transition-all ease-linear hover:bg-[#34bdb1]"
      }`}
      type="submit"
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
