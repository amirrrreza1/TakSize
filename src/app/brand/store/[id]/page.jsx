"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Products from "../../../../Components/Products/Products";
import empty from "../../../../assets/images/emptyList/empty-list.png";

export default function BrandProduct({ params }) {
  const { id } = use(params);

  const [brandsProducts, setBrandsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProductsofBrand = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://api.taksize.com/api/v1/Common/Brand/GetAdses",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imei: "123456789123456789",
              brandId: 5,
              brandMainStoreId: id,
              pagable: { page: 1, pageSize: 30, search: "string" },
              filtering: { cityIds: [] },
            }),
          }
        );

        const data = await res.json();

        if (data?.isSuccess) {
          setBrandsProducts(data.data ?? []);
        } else {
          const msg = data.message || "خطا در دریافت لیست برندها";
          setError(msg);
          toast.error(msg);
        }
      } catch (err) {
        console.error("Error fetching brands:", err);
        const msg = "خطا در ارتباط با سرور";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsofBrand();
  }, [id]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainGreen" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col justify-center items-center min-h-[200px] text-red-500">
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-mainGreen text-white rounded-lg hover:bg-opacity-90"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );

  if (!brandsProducts.length)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Image src={empty} width={200} height={200} alt="not-found" />
        <h2 className="mt-[20px]">برند مورد نظر یافت نشد !</h2>
      </div>
    );

  return (
    <div className="flex max-w-[1400px] mx-auto mt-[25px] w-full justify-center items-center gap-x-5 gap-y-7 flex-wrap text-gray-700 font-regular pb-[50px]">
      {brandsProducts.map((item) => (
        <>
          <Products
            key={item.id}
            item={item}
            storeId={item.storeId}
            Id={item.id}
          />
        </>
      ))}
    </div>
  );
}
