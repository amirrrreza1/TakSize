"use client";

import FavoriteAds from "../../../Components/Favorite/FavoriteAds";
import FavoriteStore from "../../../Components/Favorite/FavoriteStore";
import { useState } from "react";

const AllFavorite = () => {
  const [activeTab, setActiveTab] = useState("ads");
  return (
    <div className="mx-auto mt-6 px-4">
      <div className="relative flex border-b max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("ads")}
          className={`w-1/2 py-2 text-center z-10 ${
            activeTab === "ads" ? "text-[var(--color-main-green)]" : ""
          }`}
        >
          آگهی‌های مورد علاقه
        </button>
        <button
          onClick={() => setActiveTab("store")}
          className={`w-1/2 py-2 text-center z-10 ${
            activeTab === "store" ? "text-[var(--color-main-green)]" : ""
          }`}
        >
          فروشگاه‌های مورد علاقه
        </button>
        <span
          className={`absolute bottom-0 left-0 h-[1px] w-1/2 bg-[var(--color-main-green)] transition-transform duration-300 ${
            activeTab === "store" ? "" : "translate-x-full"
          }`}
        />
      </div>

      <div className="mt-6">
        {activeTab === "ads" && <FavoriteAds />}
        {activeTab === "store" && <FavoriteStore />}
      </div>
    </div>
  );
};

export default AllFavorite;
