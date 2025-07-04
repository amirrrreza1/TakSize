"use client";
import React from "react";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl cursor-pointer"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default ModalWrapper;
