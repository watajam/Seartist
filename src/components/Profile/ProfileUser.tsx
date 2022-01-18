import Link from 'next/link';
import React, { memo, VFC } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FiTwitter } from 'react-icons/fi';
import { IoHomeOutline } from 'react-icons/io5';
import { FiPaperclip } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import { FaBirthdayCake } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { UserData } from '../../../types/UserData';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import ProfileMultifunctionButtonLoadingItem from '../SkeletonLoading/ProfileMultifunctionButtonLoadingItem';
import { useUpdateFollow } from '../../../FireBase/Mutation/Update/useUpdateFollow';
import { useUpdateUnfollow } from '../../../FireBase/Mutation/Update/useUpdateUnfollow';
import { useQueryFollowingCheck } from '../../../FireBase/Query/FollowsAndFollowers/useQueryFollowingCheck';
import { useRouter } from 'next/router';
import { useQueryRealTimeCount } from '../../../FireBase/Query/FollowsAndFollowers/useQueryRealTimeCount';

type Props = {
  user: UserData;
};

//プロフィール画面に表示するユーザー情報
const ProfileUser: VFC<Props> = (props) => {
  const { updateFollow } = useUpdateFollow();
  const { updateUnfollow } = useUpdateUnfollow();
  const userFollowingInfo = useQueryFollowingCheck(props.user?.email);
  const { userEmail } = useRecoilSetEmail();
  const followAndFollower = useQueryRealTimeCount(props.user?.email);
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        {props.user?.profilePhoto ? (
          <img
            src={props.user?.profilePhoto}
            alt="プロフィール画像"
            className="object-cover h-24 w-24  rounded-full   "
          />
        ) : (
          <img src="/profile.png" alt="プロフィール画像" className="object-cover h-24 w-24  rounded-full   " />
        )}

        <Link href="#">
          <a className="flex flex-col items-center font-bold">
            <span>{props.user?.postsCount === undefined ? 0 : props.user?.postsCount}</span>
            <span>投稿</span>
          </a>
        </Link>
        <Link href={`/profile/${props.user?.userId}/followers`}>
          <a className="flex flex-col items-center font-bold">
            <span>
              {props.user?.followerUsersCount === undefined
                ? 0
                : followAndFollower?.followerUsersCount === undefined
                ? props.user?.followerUsersCount
                : followAndFollower?.followerUsersCount}
            </span>
            <span>フォロワー</span>
          </a>
        </Link>
        <Link href={`/profile/${props.user?.userId}/following`}>
          <a className="flex flex-col items-center font-bold">
            {props.user?.followerUsersCount === undefined
              ? 0
              : followAndFollower?.followUsersCount === undefined
              ? props.user?.followUsersCount
              : followAndFollower?.followUsersCount}
            <span>フォロー中</span>
          </a>
        </Link>
      </div>
      {props.user?.name ? <h1 className="text-2xl font-bold mt-2">{props.user?.name}</h1> : null}
      <span className="text-gray-400">{`@ ${router?.query?.id}`}</span>
      <div className="flex items-center flex-wrap text-gray-400">
        {props.user?.genre ? (
          <>
            <AiFillStar className="mr-1" />
            <span className="mr-4">{props.user?.genre}</span>
          </>
        ) : null}
        {props.user?.location ? (
          <>
            <IoLocationSharp className="mr-1" />
            <span className="mr-4">{props.user?.location}</span>
          </>
        ) : null}

        {props.user?.birthday ? (
          <>
            <FaBirthdayCake className="mr-1" />
            <span>{props.user?.birthday}</span>
          </>
        ) : null}
      </div>
      {props.user?.writing ? <p className="mt-4 text-bold">{props.user?.writing}</p> : null}
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

      {userEmail?.email === undefined ? (
        <ProfileMultifunctionButtonLoadingItem />
      ) : userEmail?.email === props.user?.email ? (
        <Link href="/profile/editprofile">
          <a className="bg-orange-400 text-white text-center mt-6 p-1 block">プロフィール編集</a>
        </Link>
      ) : userFollowingInfo === '' ? (
        <ProfileMultifunctionButtonLoadingItem />
      ) : userFollowingInfo === 'フォローする' ? (
        <button
          onClick={() => updateFollow(props.user?.email)}
          className="bg-orange-400 text-white text-center mt-6 p-1 w-full"
        >
          フォローする
        </button>
      ) : userFollowingInfo === 'フォロー中' ? (
        <button
          onClick={() => updateUnfollow(props.user?.email)}
          className="bg-gray-400 text-white text-center mt-6 p-1 w-full"
        >
          フォロー中
        </button>
      ) : null}
    </>
  );
};

export default memo(ProfileUser);
