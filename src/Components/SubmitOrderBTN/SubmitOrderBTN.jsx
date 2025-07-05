"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const SubmitOrderBTN = ({ discount, price, description }) => {
  const [buttonText, setButtonText] = useState("سفارش");
  const [isFading, setIsFading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toPersianNumbers = (num) => {
    if (typeof num !== "number") return num;
    return num.toString().replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasChanged) {
        setIsFading(true);
        setTimeout(() => {
          setButtonText(`${toPersianNumbers(price)} تومان`);
          setIsFading(false);
          setHasChanged(true);
        }, 300);
      } else if (window.scrollY <= 50 && hasChanged) {
        setIsFading(true);
        setTimeout(() => {
          setButtonText("سفارش");
          setIsFading(false);
          setHasChanged(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasChanged, price]);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--mainGreen)] text-white w-full h-14 leading-[56px] text-center z-50">
        <button
          onClick={() => setShowModal(true)}
          className={`transition-opacity duration-300 cursor-pointer hover:scale-105 w-full h-full text-lg font-medium ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {buttonText}
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-[95%] max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg font-semibold mb-4">
              آیا مایل به هدایت به فروشگاه اصلی هستید؟
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Link
                href={description}
                className="bg-[var(--mainGreen)] text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
              >
                بله
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
              >
                خیر
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitOrderBTN;
