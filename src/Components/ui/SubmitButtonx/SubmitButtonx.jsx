"use client";
import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ProductCall } from "../../../assets/icon/svgExport";

const style = {
  position: "absolute",
  borderRadius: "50px",
  left: "50%",
  top: "90%",
  bottom: "0",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SubmitButtonDetail = ({ discount, price }) => {
  const [buttonText, setButtonText] = useState("سفارش");
  const [isFading, setIsFading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // تابع تبدیل اعداد به فارسی
  const toPersianNumbers = (num) => {
    if (typeof num !== "number") return num; // اگر ورودی عددی نبود، آن را بازگردانید
    return num.toString().replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasChanged) {
        setIsFading(true);
        setTimeout(() => {
          setButtonText(`تومان ${toPersianNumbers(price)}`); // تغییر متن به قیمت فارسی
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasChanged, price]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white w-full h-14 leading-[56px] text-center z-50">
      <button
        onClick={handleOpen}
        className={`transition-opacity duration-300 w-full h-full text-lg font-medium ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {buttonText}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex flex-col justify-start items-start gap-y-5">
              <div className="flex justify-start w-full items-center gap-x-4 border-b-2 pb-4">
                <ProductCall />
                <div>
                  <p className="pb-2">پیام کوتاه به فروشنده</p>
                  <p className="text-gray-500">09059236171</p>
                </div>
              </div>
              <div className="flex justify-start w-full items-center gap-x-4 border-b-2 pb-4">
                <ProductCall />
                <div>
                  <p className="pb-2">تماس تلفنی با فروشنده</p>
                  <p className="text-gray-500">09059236171</p>
                </div>
              </div>
              <div className="flex justify-start w-full items-center gap-x-4 border-b-2 pb-4">
                <ProductCall />
                <div>
                  <p className="pb-2">چت با احتمال پاسخگویی در چند ساعت</p>
                </div>
              </div>
              <div className="flex justify-start w-full items-center gap-x-4 border-b-2 pb-4">
                <ProductCall />
                <div>
                  <p className="pb-2">نشان کن تا بعدا تماس بگیرم</p>
                </div>
              </div>
              <div className="w-full text-center bg-red-500 text-white h-12 leading-[50px] rounded-xl">
                <button onClick={handleClose} className="w-full">
                  بعدا
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SubmitButtonDetail;
