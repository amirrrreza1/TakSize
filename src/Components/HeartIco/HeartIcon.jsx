"use client";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/1")}
      className="absolute top-[8px] right-[8px] bg-white rounded-full w-[40px] h-[40px] text-center leading-[25px] flex items-center justify-center cursor-pointer"
    >
      <ArrowForwardIosRounded />
    </div>
  );
};

export default BackButton;
