import React, { memo } from "react";
import { HiUserCircle } from "react-icons/hi";
import Link from "next/link";

export const ListItem: React.VFC = () => {
  return (
    <Link href={`/posts/${1}`}>
      <a className="shadow rounded-2xl">
        <header className="bg-gray-400 text-white flex  p-4 rounded-t-2xl items-center font-bold text-base ">
          <HiUserCircle className="w-8 h-8" />
          <h1 className="ml-2">WATARU</h1>
          <time dateTime="2022-01-24" className="ml-auto">
            2022/01/24
          </time>
        </header>
        <div className="p-4">
          <p className="text-base text-bold font-bold">
            XXXXX開催！！ 今回は演出をパワーアップして開催します
            お待ちしてます！
          </p>
          <div className="bg-gray-200 text-center  h-48 mt-6">写真</div>
          <dl className="flex flex-wrap text-base font-bold mt-4">
            <dt className="w-3/12">ジャンル</dt>
            <dd className="w-3/4">パーティー</dd>
            <dt className="w-3/12 mt-2">開催時間</dt>
            <dd className="w-3/4 mt-2">22:00~4:00</dd>
            <dt className="w-3/12 mt-2">開催場所</dt>
            <dd className="mt-2">Zepp Tokyo</dd>
            <dt className="ml-auto mt-2">♡</dt>
            <dd className="mt-2">200</dd>
          </dl>
        </div>
      </a>
    </Link>
  );
};

export default memo(ListItem);
