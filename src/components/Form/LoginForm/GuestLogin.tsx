import React, { memo, VFC } from "react";
import Link from "next/link";

const GuestLogin: VFC = () => {
  return (
    <Link href="/">
      <a className="border block text-center w-full  mt-6  py-3 font-bold  text-2xl text-white rounded-xl bg-gray-400 hover:bg-gray-500">
        ゲストログイン
      </a>
    </Link>
  );
};

export default memo(GuestLogin);
