import React, { memo, VFC } from "react";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import { RiQuillPenLine } from "react-icons/ri";
import { useRouter } from "next/dist/client/router";

const PostBottomNavigation: VFC = () => {
  const router = useRouter();

  return (
    <aside className="w-full fixed  bottom-0 z-10 bg-orange-400  md:static  md:w-1/4 md:bg-orange-300">
      <nav className="flex justify-around md:fixed  md:flex-col  md:w-1/4 md:justify-center">
        <Link href="/posts">
          <a className="w-full text-center pt-2 pb-3 md:mt-4 md:flex md:items-center md:space-x-4 md:pl-8">
            {router.pathname === "/posts" ? (
              <HiHome className="w-7 h-7  text-white inline-block  mb-1" />
            ) : (
              <HiOutlineHome className="w-7 h-7  text-white inline-block  mb-1" />
            )}
            <span className="block text-sm text-white">ホーム</span>
          </a>
        </Link>

        <Link href="/explore">
          <a className="w-full text-center pt-2 pb-3 md:mt-4 md:flex md:items-center  md:space-x-4 md:pl-8">
            {router.pathname === "/explore" ? (
              <BiSearchAlt className="w-7 h-7 text-white inline-block  mb-1" />
            ) : (
              <BiSearch className="w-7 h-7 text-white inline-block  mb-1" />
            )}
            <span className="block text-sm text-white">検索</span>
          </a>
        </Link>

        <Link href="/profile/1">
          <a className="w-full text-center pt-2 pb-3 md:mt-4 md:flex md:items-center  md:space-x-2 md:pl-8">
            {router.pathname === "/profile/[id]" ? (
              <HiUserCircle className="w-7 h-7 text-white inline-block  mb-1" />
            ) : (
              <BiUserCircle className="w-7 h-7 text-white inline-block  mb-1" />
            )}
            <span className="block text-sm text-white">プロフィール</span>
          </a>
        </Link>

        <Link href="/posts/create">
          <a className="w-full text-center pt-2 pb-3 hidden  md:mt-4 md:flex md:items-center md:space-x-4 md:pl-8">
            {router.pathname === "/posts/create" ? (
              <RiQuillPenLine className="w-7 h-7 text-white inline-block  mb-1" />
            ) : (
              <RiQuillPenLine className="w-7 h-7 text-white inline-block  mb-1" />
            )}
            <span className="block text-sm text-white">投稿</span>
          </a>
        </Link>
      </nav>

      <Link href="/posts/create">
        <a className="fixed bottom-20 bg-orange-400 right-4 rounded-full p-4 md:hidden">
          <RiQuillPenLine className="w-6 h-6  text-white " />
        </a>
      </Link>
    </aside>
  );
};

export default memo(PostBottomNavigation);
