import React, { memo, VFC } from "react";
import { HiUserCircle } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";

type Props = {
  post: {
    id: string;
    image: string;
    writing: string;
    eventName: string;
    genre: string;
    eventLocation: string;
    eventDate: string;
    openTime: string;
    closeTime: string;
  };
};

const ListItem: VFC<Props> = (props) => {
  return (
    <div className="rounded-2xl shadow">
      <Link href={`/profile/1`}>
        <a>
          <header className="bg-gray-400 text-white flex  p-4 rounded-t-2xl items-center font-bold text-base ">
            <HiUserCircle className="w-8 h-8" />
            <h1 className="ml-2">WATARU</h1>
            <time dateTime={props.post.eventDate} className="ml-auto text-lg">
              {props.post.eventDate}
            </time>
          </header>
        </a>
      </Link>
      <Link href={`/posts/{props.post.id}`}>
        <a>
          <div className="p-4">
            <p className="text-base text-bold font-bold break-words max-w-sm  sm:max-w-md md:max-w-lg">
              {props.post.writing}
            </p>

            {/* テスト中 */}
            {props.post.image !== "" ? (
              <div className="flex justify-center items-center mt-6">
                <img
                  src={props.post.image}
                  className="text-center  h-48  rounded-2xl object-contain "
                />
              </div>
            ) : null}

            <table className="table-fixed text-center text-base w-full mt-6 ">
              <tbody className="mt-2">
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left w-1/3">
                    イベント名
                  </th>
                  <td className="border px-4 py-2 text-left break-words max-w-sm ">
                    {props.post.eventName}
                  </td>
                </tr>
                <tr>
                  <th className="border px-4 py-2 text-left">ジャンル</th>
                  <td className="border px-4 py-2 text-left">
                    {props.post.genre}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">開催場所</th>
                  <td className="border px-4 py-2 text-left break-words max-w-sm ">
                    {props.post.eventLocation}
                  </td>
                </tr>
                <tr>
                  <th className="border px-4 py-2 text-left">開催時間</th>
                  <td className="border px-4 py-2 text-left">{`${props.post.openTime}～${props.post.closeTime}`}</td>
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
    </div>
  );
};

export default memo(ListItem);
