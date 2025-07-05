"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";

const Products = ({
  item,
  slug,
  useCategorySlug,
  storeId,
  Id,
  onRemoveFromFavorites,
  isFavoritePage = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const IMEI = "123456789123456789";
  
  const toPersianNumbers = (num) => {
    if (typeof num !== "number") return num;
    return num.toString().replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  useEffect(() => {
    if (!item?.adsCode) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(
          "https://api.taksize.com/api/v1/Common/Favorite/GetForUser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imei: IMEI,
              pagable: { page: 1, pageSize: 100, search: "%%" },
            }),
          }
        );
        const data = await res.json();
        if (data?.isSuccess && Array.isArray(data?.data)) {
          const isFav = data.data.some(
            (favItem) => favItem.adsCode === item.adsCode
          );
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error("خطا در گرفتن علاقه‌مندی‌ها:", error);
      }
    };

    fetchFavorites();
  }, [item?.adsCode]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const advertisingId = item?.adsId || item?.adsCode || item?.id;

    if (!advertisingId) {
      setLoading(false);
      return;
    }

    const url = isFavorite
      ? `https://api.taksize.com/api/v1/Common/Favorite/Remove?IMEI=${IMEI}&advertisingId=${Id}`
      : `https://api.taksize.com/api/v1/Common/Favorite/Add?IMEI=${IMEI}&advertisingId=${Id}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { Accept: "text/plain" },
        body: "",
      });

      const data = await res.json();
      if (!res.ok || !data.isSuccess) throw new Error(data.message);

      setIsFavorite(!isFavorite);

      if (isFavoritePage && isFavorite && onRemoveFromFavorites) {
        onRemoveFromFavorites(advertisingId);
      }

      toast.success(
        isFavorite
          ? "محصول از لیست علاقه‌مندی‌ها حذف شد"
          : "محصول به لیست علاقه‌مندی‌ها اضافه شد"
      );
    } catch (err) {
      toast.error("خطا در انجام عملیات. لطفاً دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      href={`/${storeId}/${Id}`}
      className="lg:w-[20%] sm:w-[40%] w-[43%]"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <div className="relative">
          <Image
            className="rounded-lg"
            width={800}
            height={800}
            alt={item.title}
            src={`https://api.taksize.com/${item.picture}`}
          />
          <div
            onClick={(e) => toggleFavorite(e)}
            className="absolute top-[2px] right-[2px] w-[40px] h-[40px] flex items-center justify-center cursor-pointer z-10"
          >
            {loading ? (
              <span className="animate-spin text-pink-600 text-[20px]">⏳</span>
            ) : isFavorite ? (
              <FavoriteIcon sx={{ color: "#e91e63" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#e91e63" }} />
            )}
          </div>
        </div>

        <h3 className="text-[13px] text-end px-[4px] text-gray-500 pt-[7px]">
          {item.title}
        </h3>

        <div className="flex justify-between items-center pt-[10px]">
          <div className="flex items-center gap-x-5">
            <span className="line-through text-[13px] text-gray-500">
              {toPersianNumbers(item.originalPrice)}
            </span>
          </div>
          <div className="text-left">
            <span className="sm:pl-[10px] pl-[5px] text-[13px]">
              {toPersianNumbers(item.takSizePrice)}
            </span>
            <span className="text-[12px]">تومان</span>
          </div>
        </div>

        <div className="flex flex-row-reverse justify-start gap-x-3">
          {item?.discount > 0 && (
            <div>
              <span className="bg-[#ce1818] text-white text-[12px] rounded-[10px] pt-[3px] px-[4px]">
                {toPersianNumbers(item.discount)}%
              </span>
            </div>
          )}
          <div className="text-left text-gray-600">
            {item?.sizes?.map((elem) => (
              <span key={elem.id} className="text-[12px] text-gray-500">
                {elem.name}{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Products;
