import React, { memo } from "react";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

const ProfileEditHeader: React.VFC = () => {
  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full z-10 flex justify-between top-0">
      <Link href="/profile/1">
        <a>
          <IoMdArrowBack />
        </a>
      </Link>
      <button>保存</button>
    </header>
  );
};

export default memo(ProfileEditHeader);