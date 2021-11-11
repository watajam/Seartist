import Link from "next/link";

import React, { memo, VFC } from "react";
import Image from "next/image";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import ProfileUserSkeletonLoadingItem from "../SkeletonLoading/ProfileUserSkeletonLoadingItem";

type Props = {
  user: {
    name: string;
    userId: string;
    genre: string;
    location: string;
    birthday: string;
    writing: string;
    twitterUrl: string;
    instagramUrl: string;
    homepageUrl: string;
    otherUrl: string;
    email: string;
  };

  userEmail: {
    email: string;
  };
  userLoading: boolean;
};

const ProfileUser: VFC<Props> = (props) => {
  if (props.userLoading) {
    return <ProfileUserSkeletonLoadingItem />;
  }
  if (props.user === null) {
    return <p>エラー</p>;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Image src="/camera.svg" width={96} height={96} />
        <Link href="#">
          <a className="flex flex-col items-center font-bold">
            <span>9</span>
            <span>投稿</span>
          </a>
        </Link>
        <Link href="#">
          <a className="flex flex-col items-center font-bold">
            <span>500</span>
            <span>フォロワー</span>
          </a>
        </Link>
        <Link href="#">
          <a className="flex flex-col items-center font-bold">
            <span>500</span>
            <span>フォロー中</span>
          </a>
        </Link>
      </div>
      {props.user?.name ? (
        <h1 className="text-2xl font-bold mt-2">{props.user?.name}</h1>
      ) : null}
      {props.user?.userId ? (
        <span className="text-gray-400">{`@ ${props.user?.userId}`}</span>
      ) : null}

      <div className="flex items-center text-gray-400">
        {props.user?.genre ? (
          <>
            <AiFillStar className="mr-1" />
            <span className="mr-4">{props.user?.genre}</span>
          </>
        ) : null}
        {props.user?.location ? (
          <>
            <IoLocationSharp className="mr-1" />
            <span className="mr-4">{props.user?.location}</span>{" "}
          </>
        ) : null}

        {props.user?.birthday ? (
          <>
            <FaBirthdayCake className="mr-1" />
            <span>{props.user?.birthday}</span>
          </>
        ) : null}
      </div>
      {props.user?.writing ? (
        <p className="mt-4 text-bold">{props.user?.writing}</p>
      ) : null}

      <nav className="mt-6">
        <ul className="flex w-full">
          {props.user?.instagramUrl ? (
            <>
              <li className="flex justify-center w-1/4">
                <a
                  href={props.user?.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer "
                  className="p-4 rounded-full bg-gray-400 "
                >
                  <BsInstagram className="text-white w-6 h-6" />
                </a>
              </li>
            </>
          ) : null}

          {props.user?.twitterUrl ? (
            <>
              <li className="flex justify-center w-1/4">
                <a
                  href={props.user?.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer "
                  className="p-4 rounded-full bg-gray-400 "
                >
                  <FiTwitter className="text-white w-6 h-6" />
                </a>
              </li>
            </>
          ) : null}

          {props.user?.homepageUrl ? (
            <>
              <li className="flex justify-center w-1/4">
                <a
                  href={props.user?.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer "
                  className="p-4 rounded-full bg-gray-400 "
                >
                  <IoHomeOutline className="text-white w-6 h-6" />
                </a>
              </li>
            </>
          ) : null}

          {props.user?.otherUrl ? (
            <>
              <li className="flex justify-center w-1/4">
                <a
                  href={props.user?.otherUrl}
                  target="_blank"
                  rel="noopener noreferrer "
                  className="p-4 rounded-full bg-gray-400 "
                >
                  <FiPaperclip className="text-white w-6 h-6" />
                </a>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
      {props.userEmail?.email === props.user?.email ? (
        <Link href="/profile/editprofile">
          <a className="bg-orange-400 text-white text-center mt-6 p-1 block">
            プロフィール編集
          </a>
        </Link>
      ) : null}
    </>
  );
};

export default memo(ProfileUser);
