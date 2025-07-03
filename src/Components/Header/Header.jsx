"use client";

import MobileMenu from "../MobileMenu/MobileMenu";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isProductDetailPage =
    pathname.includes("/[slug]/[id]") ||
    (pathname.split("/").length === 3 && !isNaN(pathname.split("/")[2]));

  return (
    <>
      <header className="w-full">
        {!isProductDetailPage && <MobileMenu />}
      </header>
    </>
  );
};

export default Header;
