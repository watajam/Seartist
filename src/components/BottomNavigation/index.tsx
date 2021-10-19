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
        <div className="flex justify-around">
          <Link href="/posts">
            <a className="w-full  justify-center inline-block text-center pt-2 pb-3">
              {router.pathname === "/posts" ? (
                <HiHome className="w-7 h-7  text-white inline-block  mb-1" />
              ) : (
                <HiOutlineHome className="w-7 h-7  text-white inline-block  mb-1" />
              )}
              <span className="block text-sm text-white">ホーム</span>
            </a>
          </Link>

          <Link href="/explore">
            <a className="w-full  justify-center inline-block text-center pt-2 pb-3">
              {router.pathname === "/explore" ? (
                <BiSearchAlt className="w-7 h-7 text-white inline-block  mb-1" />
              ) : (
                <BiSearch className="w-7 h-7 text-white inline-block  mb-1" />
              )}
              <span className="block text-sm text-white">投稿</span>
            </a>
          </Link>

          <Link href="/profile/1">
            <a className="w-full  justify-center inline-block text-center pt-2 pb-3">
              {router.pathname === "/profile/[id]" ? (
                <HiUserCircle className="w-7 h-7 text-white inline-block  mb-1" />
              ) : (
                <BiUserCircle className="w-7 h-7 text-white inline-block  mb-1" />
              )}
              <span className="block text-sm text-white">プロフィール</span>
            </a>
          </Link>
        </div>
      </nav>
      {router.pathname !== `/posts/[id]` ? (
        <Link href="/posts">
          <a className="fixed bottom-20 bg-orange-400 right-4 rounded-full p-4">
            <RiQuillPenLine className="w-6 h-6  text-white " />
          </a>
        </Link>
      ) : null}
    </aside>
  );
};

export default memo(BottomNavigation);
