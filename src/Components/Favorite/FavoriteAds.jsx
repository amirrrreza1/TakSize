"use client";

import { useEffect, useState } from "react";
import empty from "../../assets/images/emptyList/empty-messages.png";
import Products from "../Products/Products";
import { toast } from "react-toastify";
import Image from "next/image";

const FavoriteAds = () => {
  const [favoriteAds, setFavoriteAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMEI = "123456789123456789";

  // تابع حذف محصول از لیست
  const handleRemoveFromFavorites = (removedAdsId) => {
    setFavoriteAds((prevAds) =>
      prevAds.filter((ad) => ad.adsId !== removedAdsId)
    );
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(
          "https://api.taksize.com/api/v1/Common/Favorite/GetForUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imei: IMEI,
              pagable: {
                page: 1,
                pageSize: 100,
                search: "%%",
              },
            }),
          }
        );

        const data = await res.json();
        console.log("Favorite Items:", data.data);

        if (data?.isSuccess && Array.isArray(data?.data)) {
          console.log("Favorite Items:", data.data);

          setFavoriteAds(data.data);
        } else {
          console.warn("فرمت داده‌ها درست نیست:", data);
        }
      } catch (err) {
        console.error("خطا در دریافت علاقه‌مندی‌ها:", err);
        toast.error("خطا در دریافت لیست علاقه‌مندی‌ها", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          rtl: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-10 text-gray-500">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="container pb-[60px]">
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-7 mt-[25px] text-gray-700 font-regular">
        {favoriteAds.length > 0 ? (
          favoriteAds.map((item, index) => {
            console.log("Mapping favorite item:", {
              originalItem: item,
              storeId: item.storeId,
              adsId: item.adsId,
              adsCode: item.adsCode,
            });

            return (
              <Products
                storeId={item.storeId}
                adsId={item.adsId}
                key={item?.adsId ?? item?.adsCode ?? index}
                item={item}
                useCategorySlug={true}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                isFavoritePage={true}
              />
            );
          })
        ) : (
          <div className="absolute top-[35%] right-[50%] translate-x-[50%]">
            <Image src={empty} width={200} height={200} alt="not-found" />
            <h2 className="mt-[20px]">هنوز فروشگاه موزد علاقه نداری ! </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteAds;
