import React, { memo } from "react";
import { HiUserCircle } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
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
          <div className="bg-gray-200 text-center  h-48 mt-6 rounded-2xl">写真</div>
          <table className="table-fixed text-center text-base w-full mt-6 ">
            <tbody className="mt-2">
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">イベント名</th>
                <td className="border px-4 py-2">Night 2021</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">ジャンル</th>
                <td className="border px-4 py-2">パーティー</td>
              </tr>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">開催日</th>
                <td className="border px-4 py-2">2022/01/24</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">開催時間</th>
                <td className="border px-4 py-2">22:00~4:00</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end  items-center mt-6">
            <span className="text-base">
              <AiOutlineHeart className=" inline-block mr-2 align-top" />
              200
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default memo(ListItem);
