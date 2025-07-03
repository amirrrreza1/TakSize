"use client";
import db from "../../db/db.json";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const path = usePathname();
  const { header } = db;

  const isActivePath = (itemPath) => {
    return (
      path === itemPath ||
      (itemPath === "/1" &&
        (path.startsWith("/1") || path === "/2" || path === "/3")) ||
      (itemPath === "/2" && path.startsWith("/2")) ||
      (itemPath === "/3" && path.startsWith("/3"))
    );
  };

  return (
    <nav className="w-full z-40 bg-[#f5f2f2] flex fixed justify-center gap-6 bottom-0 border-t-2">
      {header.map((item) => {
        const isActive = isActivePath(item.path);
        return (
          <Link
            href={item.path}
            className="flex flex-col p-1 items-center"
            key={item.id}
          >
            <div>
              <Image
                src={isActive && item.fullIcon ? item.fullIcon : item.icon}
                className="w-6 h-6"
                width={50}
                height={50}
                alt="icons"
              />
            </div>
            <div>
              <p
                className={`${
                  isActive ? "text-[var(--mainGreen)]" : "text-[var(--lowGray)]"
                } text-sm`}
              >
                {item.title}
              </p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileMenu;
