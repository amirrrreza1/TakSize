"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  PriorityHighRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  ShareRounded,
} from "@mui/icons-material";

const IMEI = "123456789123456789";

const ProductActionsComponent = ({ item = {} }) => {
  const advertisingId = item.adsId ?? item.id;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const parseResponse = async (res) => {
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) return res.json();
    const raw = (await res.text()).trim();
    try {
      return JSON.parse(raw);
    } catch {
      return { isSuccess: raw.toLowerCase() === "true" };
    }
  };

  useEffect(() => {
    if (!advertisingId) return;

    (async () => {
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

        const data = await parseResponse(res);
        if (data?.isSuccess && Array.isArray(data?.data)) {
          const fav = data.data.some(
            (favItem) => favItem.adsId === advertisingId
          );
          setIsFavorite(fav);
        }
      } catch (err) {
        console.error("خطا در دریافت علاقه‌مندی‌ها:", err);
      }
    })();
  }, [advertisingId]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "اشتراک‌گذاری آگهی",
          text: "یه آگهی جالب دیدم، بیا ببین:",
          url: window.location.href,
        });
      } else {
        toast.info("مرورگر شما اشتراک‌گذاری وب را پشتیبانی نمی‌کند.");
      }
    } catch (err) {
      console.error("⚠️ خطا در اشتراک‌گذاری:", err);
    }
  };

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (loading || !advertisingId) return;

    setLoading(true);
    const url = isFavorite
      ? `https://api.taksize.com/api/v1/Common/Favorite/Remove?IMEI=${IMEI}&advertisingId=${advertisingId}`
      : `https://api.taksize.com/api/v1/Common/Favorite/Add?IMEI=${IMEI}&advertisingId=${advertisingId}`;

    try {
      const res = await fetch(url, { method: "POST" });
      const data = await parseResponse(res);

      if (!res.ok || !data.isSuccess)
        throw new Error(data?.message || "خطای ناشناخته");

      setIsFavorite((prev) => !prev);
      toast.success(
        isFavorite
          ? "محصول از علاقه‌مندی‌ها حذف شد"
          : "محصول به علاقه‌مندی‌ها اضافه شد"
      );
    } catch (err) {
      console.error("⚠️ خطا در انجام عملیات علاقه‌مندی:", err);
      toast.error("خطا در انجام عملیات. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex place-content-evenly">
        <button
          onClick={handleShare}
          className="absolute top-2 left-24 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
        >
          <ShareRounded fontSize="small" />
        </button>

        <button
          onClick={toggleFavorite}
          className="absolute top-2 left-[52px] bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
        >
          {loading ? (
            <span className="animate-spin text-pink-600 text-lg">⏳</span>
          ) : isFavorite ? (
            <FavoriteRounded sx={{ color: "#e91e63" }} />
          ) : (
            <FavoriteBorderRounded sx={{ color: "#e91e63" }} />
          )}
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="absolute top-2 left-2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
        >
          <PriorityHighRounded fontSize="small" />
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-[90%] max-w-md rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
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
