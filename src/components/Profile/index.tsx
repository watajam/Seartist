import Link from "next/link";

import React, { memo, useState } from "react";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import Posts from "../Posts";

const Profile: React.VFC = () => {
  const [chengePage, setChengePage] = useState(true);

  const handleChengePage = () => {
    setChengePage((prevChengePage) => {
      return !prevChengePage;
    });
  };
  return (
    <>
      <div className="px-5">
        <div className="flex items-center justify-between">
          <Image src="/camera.svg" width={91} height={91} />
          <Link href="">
            <a className="flex flex-col items-center font-bold">
              <span>9</span>
              <span>投稿</span>
            </a>
          </Link>
          <Link href="">
            <a className="flex flex-col items-center font-bold">
              <span>500</span>
              <span>フォロワー</span>
            </a>
          </Link>
          <Link href="">
            <a className="flex flex-col items-center font-bold">
              <span>500</span>
              <span>フォロー中</span>
            </a>
          </Link>
        </div>
        <h1 className="text-2xl font-bold mt-2">WATARU</h1>
        <div className="flex items-center text-gray-400">
          <span className="mr-4">@seartist_jp</span>
          <AiOutlineStar />
          <span>ギターリスト</span>
        </div>
        <p className="mt-4 text-bold">
          2000年1月24日生まれ静岡県出身
          プロギターリストを目指して週に2日路上ライブをしています！
        </p>
        <nav className="mt-6">
          <ul className="flex justify-between ">
            <li className=" flex">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer "
                className="p-4 rounded-full bg-gray-400 "
              >
                <BsInstagram className="text-white w-6 h-6" />
              </a>
            </li>
            <li className="flex">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer "
                className="p-4 rounded-full bg-gray-400 "
              >
                <FiTwitter className="text-white w-6 h-6" />
              </a>
            </li>
            <li className="flex">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer "
                className="p-4 rounded-full bg-gray-400 "
              >
                <IoHomeOutline className="text-white w-6 h-6" />
              </a>
            </li>
            <li className="flex">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer "
                className="p-4 rounded-full bg-gray-400 "
              >
                <FiPaperclip className="text-white w-6 h-6" />
              </a>
            </li>
          </ul>
        </nav>
        <p className=" bg-orange-400 text-white text-center mt-6">
          プロフィール編集
        </p>
      </div>

      {/* タブ */}
      <div className="mt-6 flex">
        <button
          className={`w-2/4 flex justify-center border-b-2 pb-2 ${
            chengePage ? "border-orange-400" : "border-gray-400"
          }   `}
          onClick={handleChengePage}
          disabled={chengePage}
        >
          <AiOutlineEye
            className={`w-6 h-6 ${
              chengePage ? "text-orange-400" : "text-gray-400 "
            }   `}
          />
        </button>

        <button
          className={`w-2/4 flex justify-center border-b-2 pb-2 ${
            chengePage ? "border-gray-400" : " border-orange-400"
          }   `}
          onClick={handleChengePage}
          disabled={!chengePage}
        >
          <AiOutlineHeart
            className={`w-6 h-6 ${
              chengePage ? "text-gray-400 " : "text-orange-400  "
            }  `}
          />
        </button>
      </div>
      {console.log(chengePage)}
      {console.log(!chengePage)}
      <div className="px-5 mt-4">
        <Posts />
      </div>
    </>
  );
};

export default memo(Profile);
