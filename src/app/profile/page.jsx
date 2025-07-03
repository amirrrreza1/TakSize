"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const defaultUserImage = "/icons/userDefualt.svg";

const Layout = () => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const router = useRouter();

  const Logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/auth/register");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-100 text-center text-xl font-bold border-b">
        تک شو
      </header>

      <nav className="w-full max-w-md relative mx-auto border-b">
        <div className="flex">
          <button
            onClick={() => setSelectedTab("store")}
            className={`w-1/2 py-2 text-center relative z-10 ${
              selectedTab === "store" ? "text-(--color-main-green)" : ""
            }`}
          >
            فروشگاه
          </button>
          <button
            onClick={() => setSelectedTab("profile")}
            className={`w-1/2 py-2 text-center relative z-10 ${
              selectedTab === "profile" ? "text-(--color-main-green)" : ""
            }`}
          >
            حساب شخصی
          </button>
        </div>

        <div
          className={`absolute bottom-0 h-px bg-(--color-main-green) rounded transition-all duration-300 ease-in-out w-1/2 ${
            selectedTab === "store" ? "left-1/2" : "left-0"
          }`}
        />
      </nav>

      <main className="grow p-6">
        {selectedTab === "store" && (
          <div className="text-center text-gray-500">
            صفحه فروشگاه فعلاً موجود نیست
          </div>
        )}

        {selectedTab === "profile" && <Profile onLogout={Logout} />}
      </main>
    </div>
  );
};

const Profile = ({ onLogout }) => {
  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="flex justify-center items-center gap-4">
        <div className="border bg-(--color-main-green) rounded-full w-15 h-15 flex justify-center items-center">
          <Image
            src={defaultUserImage}
            alt="کاربر مهمان"
            width={40}
            height={40}
          />
        </div>
        <div className="text-sm">کاربر مهمان</div>
        <button
          onClick={onLogout}
          className="px-6 py-2 border rounded-4xl text-sm text-(--color-low-gray) hover:bg-(--color-main-green) hover:text-white transition duration-300"
        >
          خروج از حساب کاربری
        </button>
      </div>

      <div className="flex flex-col gap-4 text-right max-w-xs mx-auto">
        <NavItem
          label="علاقه‌مندی‌ها"
          href="/favorite"
          Icon={"/icons/activity.svg"}
        />
        <NavItem
          label="صندوق پیام"
          href="/messages"
          Icon={"/icons/brand-line.svg"}
        />
        <NavItem label="تنظیمات" href="/settings" Icon={"/icons/setting.svg"} />
        <NavItem label="پشتیبانی" href="/support" Icon={"/icons/support.svg"} />
        <NavItem
          label="شیوه نامه تک سایز"
          href="/profile/rules"
          Icon={"/icons/rules.svg"}
        />
      </div>
    </div>
  );
};

const NavItem = ({ label, href, Icon }) => {
  return (
    <Link
      href={href}
      className="pb-3 border-b flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-1">
        <Image src={Icon} alt="icon" width={20} height={20} />
        {label}
      </div>
      <Image
        src={"/icons/toLeft_Arrow.svg"}
        alt="icon"
        width={20}
        height={20}
      />
    </Link>
  );
};

export default Layout;
