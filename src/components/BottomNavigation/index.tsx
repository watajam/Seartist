import React, { memo } from "react";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import { RiQuillPenLine } from "react-icons/ri";
import { useRouter } from "next/dist/client/router";

export const BottomNavigation: React.VFC = () => {
  const router = useRouter();

  return (
    <aside>
      <nav className="w-full fixed  bottom-0 z-10 bg-orange-400 ">
        <ul className="flex justify-around">
          <li className="pt-2 pb-4">
            <Link href="/posts">
              <a className="w-full  justify-center inline-block text-center ">
                {router.pathname === "/posts" ? (
                  <HiHome className="w-7 h-7  text-white inline-block  " />
                ) : (
                  <HiOutlineHome className="w-7 h-7  text-white inline-block  " />
                )}
              </a>
            </Link>
          </li>
          <li className="pt-2 pb-4">
            <Link href="/profile/user">
              <a className="w-full  justify-center inline-block text-center ">
                {router.pathname === "/profile/user" ? (
                  <BiSearchAlt className="w-7 h-7 text-white inline-block  " />
                ) : (
                  <BiSearch className="w-7 h-7 text-white inline-block  " />
                )}
              </a>
            </Link>
          </li>
          <li className="pt-2 pb-4">
            <Link href="/profile/[userId]">
              <a className="w-full  justify-center inline-block text-center ">
                {router.pathname === "/profile/[userId]" ? (
                  <HiUserCircle className="w-7 h-7 text-white inline-block  " />
                ) : (
                  <BiUserCircle className="w-7 h-7 text-white inline-block  " />
                )}
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <Link href="/posts">
        <a className="fixed bottom-20 bg-orange-400 right-4 rounded-full p-4">
          <RiQuillPenLine className="w-6 h-6  text-white " />
        </a>
      </Link>
    </aside>
  );
};

export default memo(BottomNavigation);
