import React, { memo } from "react";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import { useRouter } from "next/dist/client/router";

const BOTTOM_NAV = [
  {
    href: "/posts",
    clickIcon: <HiHome className="w-6 h-6 text-white inline-block mb-1 " />,
    icon: <HiOutlineHome className="w-6 h-6 text-white inline-block mb-1 " />,
    name: "ホーム",
  },
  {
    href: "/explore",
    clickIcon: (
      <BiSearchAlt className="w-6 h-6 text-white inline-block mb-1 " />
    ),
    icon: <BiSearch className="w-6 h-6 text-white inline-block mb-1 " />,
    name: "検索",
  },
  {
    href: "/profile/[userId]",
    clickIcon: (
      <HiUserCircle className="w-6 h-6 text-white inline-block mb-1 " />
    ),
    icon: <BiUserCircle className="w-6 h-6 text-white inline-block mb-1 " />,
    name: "プロフィール",
  },
];

export const BottomNavigation: React.VFC = () => {
  const router = useRouter();

  return (
    <aside className="w-full block fixed  bottom-0 z-10 bg-orange-400 ">
      <nav>
        <ul className="flex justify-around">
          {BOTTOM_NAV.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.href}>
                  <a className="w-full  justify-center inline-block text-center pt-2 pb-1">
                    {router.pathname === item.href ? item.clickIcon : item.icon}
                    <span className=" block text-xs text-white">
                      {item.name}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(BottomNavigation);
