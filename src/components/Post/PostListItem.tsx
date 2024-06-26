import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';
import Link from 'next/link';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';
import { useQueryLikePostCheck } from '../../../FireBase/Query/Posts/useQueryLikePostCheck';
import { useUpdateAddOrDeletLikes } from '../../../FireBase/Mutation/Update/useUpdateAddOrDeletLikes';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import { useSWRConfig } from 'swr';
import { useFetch } from '../../hooks/useFetch';
import { useQueryProfileLikesPostsByUsers } from '../../../FireBase/Query/Profile/useQueryProfileLikesPostsByUsers';
import { useQueryPostByUserDetail } from '../../../FireBase/Query/Posts/useQueryPostByUserDetail';
import { useQueryPostsByUsers } from '../../../FireBase/Query/Posts/useQueryPostsByUsers';
import { DocumentData } from 'firebase/firestore';

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
  const { queryProfileLikedPostsByUsers } = useQueryProfileLikesPostsByUsers();
  const { queryDetailPost } = useQueryPostByUserDetail();
  const { queryPostsByFollowings } = useQueryPostsByUsers();

  //既にいいねしているか投稿かどうか確認
  const { data: liked } = useFetch<DocumentData, (email: string, id: string | string[]) => Promise<DocumentData>>(
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
              <div className="h-56 relative overflow-hidden mt-6">
                <img src={props.postsByUsers?.image} className="object-cover absolute h-full w-full top-0 left-0 rounded-2xl" />
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
              // 投稿のいいね数を更新
              mutate(
                userEmail ? [`firestore/users/${userEmail.email}/postsByFollowing`, userEmail.email] : null,
                queryPostsByFollowings
              );
            // 投稿詳細のいいね数を更新
            mutate(props.postsByUsers.id ? [`firestore/posts`, props.postsByUsers.id] : null, () =>
              queryDetailPost(props.postsByUsers.id)
            );
            // いいね欄の表示を更新
            mutate(userEmail ? `firestore/users/${userEmail.email}/likedPosts` : null, () =>
              queryProfileLikedPostsByUsers(userEmail.email)
            );
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
