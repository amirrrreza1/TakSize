"use client";

import Products from "../../../Components/Products/Products";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AllBrandsProducts() {
  const [AllBrandsProducts, setAllBrandsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllBrandsProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          "https://api.taksize.com/api/v1/Common/Brand/GetAllAdses",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imei: "123456789123456789",
              pagable: {
                page: 1,
                pageSize: 30,
                search: "string",
              },
              filtering: {
                cityIds: [],
              },
            }),
          }
        );

        const data = await res.json();

        if (data?.isSuccess) {
          setAllBrandsProducts(data.data || []);
        } else {
          setError(data.message || "خطا در دریافت لیست برندها");
          toast.error(data.message || "خطا در دریافت لیست برندها");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setError("خطا در ارتباط با سرور");
        toast.error("خطا در ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBrandsProducts();
  }, []);

  return (
    <>
      <div className="flex max-w-[1400px] mx-auto mt-[25px] w-full justify-center items-center gap-x-5 gap-y-7 flex-wrap text-gray-700 font-regular pb-[50px]">
        {AllBrandsProducts.map((item) => {
          return <Products key={item.id} item={item} />;
        })}
      </div>
    </>
  );
}
