import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';
import Link from 'next/link';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';
import { useQueryLikePostCheck } from '../../../FireBase/Query/Posts/useQueryLikePostCheck';
import { useUpdateAddOrDeletLikes } from '../../../FireBase/Mutation/Update/useUpdateAddOrDeletLikes';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import useSWR, { useSWRConfig } from 'swr';
import { doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useFetch } from '../../hooks/useFetch';
import SkeletonLoading from '../SkeletonLoading';

type PostsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

type Props = {
  postsByUsers: PostsByUsers;
};

//投稿のリストアイテム
const PostListItem: VFC<Props> = (props) => {
  const { updateAddOrDeletLikes, likeFlag } = useUpdateAddOrDeletLikes();
  const queryLikePostCheck = useQueryLikePostCheck();
  const { mutate } = useSWRConfig();
  const { userEmail } = useRecoilSetEmail();

  //既にいいねしているか投稿かどうか確認
  const { data: liked } = useFetch(
    userEmail && props.postsByUsers.id
      ? `firestore/users/${userEmail.email}/likedPosts/${props.postsByUsers.id}`
      : null,
    () => queryLikePostCheck(userEmail.email, props.postsByUsers.id)
  );

  return (
    <div className="rounded-2xl shadow">
      <Link href={`/profile/${props.postsByUsers?.userId}`}>
        <a>
          <header className="flex items-center p-4 text-base font-bold text-white bg-gray-400 rounded-t-2xl">
            {props.postsByUsers?.profilePhoto !== '' ? (
              <img src={props.postsByUsers?.profilePhoto} className="w-8 h-8 rounded-full" />
            ) : (
              <HiUserCircle className="w-8 h-8" />
            )}
            <h1 className="ml-2">{props.postsByUsers?.name}</h1>
            <time dateTime={props.postsByUsers?.eventDate} className="ml-auto text-lg">
              {props.postsByUsers?.eventDate}
            </time>
          </header>
        </a>
      </Link>
      <Link href={`/posts/${props.postsByUsers?.id}`}>
        <a>
          <div className="p-4">
            <p className="max-w-sm text-base font-bold break-words sm:max-w-md md:max-w-lg">
              {props.postsByUsers?.writing}
            </p>

            {props.postsByUsers?.image !== '' ? (
              <div className="flex justify-center mt-6 h-80 bg-gray-100 rounded-2xl outline-none">
                <img src={props.postsByUsers?.image} className="object-contain text-center" />
              </div>
            ) : null}

            <table className="mt-6 w-full text-base text-center table-fixed">
              <tbody className="mt-2">
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 w-2/5 text-left border">イベント名</th>
                  <td className="py-2 px-4 max-w-sm text-left break-words border">{props.postsByUsers?.eventName}</td>
                </tr>
                <tr>
                  <th className="py-2 px-4 text-left border">ジャンル</th>
                  <td className="py-2 px-4 text-left border">{props.postsByUsers?.genre}</td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left border">開催場所</th>
                  <td className="py-2 px-4 max-w-sm text-left break-words border">
                    {props.postsByUsers?.eventLocation}
                  </td>
                </tr>
                <tr>
                  <th className="py-2 px-4 text-left border">開催時間</th>
                  <td className="py-2 px-4 text-left border">{`${props.postsByUsers?.openTime}～${props.postsByUsers?.closeTime}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </a>
      </Link>

      <div className="flex justify-end items-center mt-6 mr-4 mb-2">
        <button
          className={`text-base ${
            likeFlag === null && liked ? 'text-red-600' : likeFlag === true ? 'text-red-600' : null
          }`}
          onClick={async () => {
            await updateAddOrDeletLikes(props.postsByUsers),
              mutate(userEmail ? `firestore/users/${userEmail.email}/postsByFollowing` : null);
          }}
        >
          <AiFillHeart className={`inline-block mr-2 align-top  `} />

          {!liked && likeFlag === true
            ? props.postsByUsers?.likeCount + 1
            : liked && likeFlag === false
            ? props.postsByUsers?.likeCount - 1
            : props.postsByUsers?.likeCount}
        </button>
      </div>
    </div>
  );
};

export default memo(PostListItem);
