"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          "https://api.taksize.com/api/v1/Common/Brand/GetAll",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              page: 1,
              pageSize: 30,
              search: "%%",
            }),
          }
        );

        const data = await res.json();
        console.log("Brand API Response:", data);

        if (data?.isSuccess) {
          setBrands(data.data || []);
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

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainGreen"></div>
        </div>
      </div>
    );
  }

  if (error) {
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
  }

  if (!brands.length) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center min-h-[200px] text-gray-500">
          برندی یافت نشد
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-[40px]">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brand/store/${brand.mainStoreId}`}
            className="transform transition-transform hover:scale-105"
          >
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-teal-200 hover:shadow-md">
              <div className="relative w-[100px] h-[100px] mb-3">
                <Image
                  alt={brand.title || "برند"}
                  src={`https://api.taksize.com/${brand.avatar?.replace(
                    /\\/g,
                    "/"
                  )}`}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  priority={true}
                />
              </div>
              <h2 className="text-sm font-medium text-gray-700 text-center">
                {brand.title}
              </h2>
            </div>
          </Link>
        ))}
        <Link
          href="/brand/allbrand"
          className="transform transition-transform hover:scale-105"
        >
          <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-teal-200 hover:shadow-md">
            <div className="relative w-[100px] h-[100px] mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs">+</span>
            </div>
            <h2 className="text-sm font-medium text-gray-700 text-center">
              همه برند ها
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BrandPage;
