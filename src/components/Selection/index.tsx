import React, { memo } from "react";
import Link from "next/link";

export const Selection: React.VFC = () => {
  return (
    <>
      <h1 className="text-xl font-bold text-center text-gray-400 underline ">
        該当している方を選択してください
      </h1>
      <Link href="/register/general">
        <a className="w-full block  py-3 text-center mt-40 text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400">
          一般の方はこちら
        </a>
      </Link>
      <hr className="mt-14 border-gray-400" />
      <Link href="/register/creator">
        <a className="w-full block  py-3 text-center mt-14 text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400">
          アーティストや主催者の方はこちら
        </a>
      </Link>
    </>
  );
};

export default memo(Selection);
