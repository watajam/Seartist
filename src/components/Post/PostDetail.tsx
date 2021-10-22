import React, { memo } from "react";
import { HiUserCircle } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";

const PostDetail = () => {
  return (
    <div>
      <div className=" flex  rounded-t-2xl items-center font-bold text-base ">
        <HiUserCircle className="w-8 h-8" />
        <h1 className="ml-2">WATARU</h1>
        <div className="ml-auto ">
          <FiHeart className="inline" />
          <span>200</span>
        </div>
      </div>

      <p className="text-base font-bold mt-4">
        XXXXX開催！！ 今回は演出をパワーアップして開催します お待ちしてます！
      </p>
      <div className="bg-gray-200 text-center  h-48 mt-6">写真</div>

      <table className="table-fixed text-center text-base w-full mt-6">
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
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">開催場所</th>
            <td className="border px-4 py-2">Ageha Tokyo</td>
          </tr>
          <tr>
            <th className="border px-4 py-2">値段</th>
            <td className="border px-4 py-2">1000~2000</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">チケット</th>
            <td className="border px-4 py-2">あり</td>
          </tr>
          <tr>
            <th className="border px-4 py-2">クーポンコード</th>
            <td className="border px-4 py-2">fsfkfksnfk</td>
          </tr>
        </tbody>
      </table>
      <div className="bg-gray-200 text-center  h-48 mt-6">Google Map</div>
      <button className="text-red-500 font-bold block ml-auto mt-6 hover:text-red-600">
        投稿を削除する
      </button>
    </div>
  );
};

export default memo(PostDetail);
