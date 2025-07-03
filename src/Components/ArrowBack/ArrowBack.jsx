"use client";

import {
  PriorityHighRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  ShareRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductActionsComponent = ({ item }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const IMEI = "123456789123456789";

  // بررسی وضعیت اولیه علاقه‌مندی
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "اشتراک‌گذاری آگهی",
          text: "یه آگهی جالب دیدم، بیا ببین:",
          url: window.location.href,
        });
      } catch (error) {
        console.error("خطا در اشتراک‌گذاری:", error);
      }
    } else {
      alert("قابلیت اشتراک‌گذاری در مرورگر شما پشتیبانی نمی‌شود.");
    }
  };

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const advertisingId = item?.adsId || item?.adsCode;

    if (!advertisingId) {
      setLoading(false);
      return;
    }

    const url = isFavorite
      ? `https://api.taksize.com/api/v1/Common/Favorite/Remove?IMEI=${IMEI}&advertisingId=${advertisingId}`
      : `https://api.taksize.com/api/v1/Common/Favorite/Add?IMEI=${IMEI}&advertisingId=${advertisingId}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { Accept: "text/plain" },
        body: "",
      });

      const data = await res.json();
      if (!res.ok || !data.isSuccess) throw new Error(data.message);

      setIsFavorite(!isFavorite);

      // نمایش پیام موفقیت‌آمیز
      toast.success(
        isFavorite
          ? "محصول از لیست علاقه‌مندی‌ها حذف شد"
          : "محصول به لیست علاقه‌مندی‌ها اضافه شد"
      );
    } catch (err) {
      console.error("⚠️ خطا در تغییر علاقه‌مندی:", err);
      toast.error("خطا در انجام عملیات. لطفاً دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex place-content-evenly">
        <div
          onClick={handleShare}
          className="absolute top-[8px] left-[96px] bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
        >
          <ShareRounded />
        </div>
        <div
          onClick={toggleFavorite}
          className="absolute top-[8px] left-[52px] bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
        >
          {loading ? (
            <span className="animate-spin text-pink-600 text-[20px]">⏳</span>
          ) : isFavorite ? (
            <FavoriteRounded sx={{ color: "#e91e63" }} />
          ) : (
            <FavoriteBorderRounded sx={{ color: "#e91e63" }} />
          )}
        </div>
        <div
          onClick={() => setShowModal(true)}
          className="absolute top-[8px] left-[8px] bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
        >
          <PriorityHighRounded />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-end">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">گزارش</h2>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
            >
              انصراف
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductActionsComponent;
