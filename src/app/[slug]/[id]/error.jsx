"use client";

import empty1 from "../../../assets/images/emptyList/empty-list.png";
import Image from "next/image";
const ErrorProductDetail = ({ error, reset }) => {
  return (
    <div className="absolute top-[35%] right-[50%] translate-x-[50%] flex flex-col gap-y-4 justify-center items-center">
      <h1>{error.message}</h1>
      <Image src={empty1} width={200} height={200} alt="not-found" />
      <button onClick={() => reset()}>تلاش دوباره</button>
    </div>
  );
};

export default ErrorProductDetail;
