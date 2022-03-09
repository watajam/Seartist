import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';
import { PostDetailData } from '../../../types/PostDetailData';
import { UserData } from '../../../types/UserData';
import { useUpdateAddOrDeletLikes } from '../../../FireBase/Mutation/Update/useUpdateAddOrDeletLikes';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import { useDeletePost } from '../../../FireBase/Mutation/Delete/useDeletePost';
import { useQueryLikePostCheck } from '../../../FireBase/Query/Posts/useQueryLikePostCheck';
import { useRouter } from 'next/router';
import { useFetch } from '../../hooks/useFetch';
import { useSWRConfig } from 'swr';
import { useQueryProfileLikesPostsByUsers } from '../../../FireBase/Query/Profile/useQueryProfileLikesPostsByUsers';
import { useQueryPostByUserDetail } from '../../../FireBase/Query/Posts/useQueryPostByUserDetail';
import { useQueryPostsByUsers } from '../../../FireBase/Query/Posts/useQueryPostsByUsers';
import { DocumentData } from 'firebase/firestore';

type PostByUser = Omit<PostDetailData, 'email'> & Pick<UserData, 'name' | 'profilePhoto' | 'email'>;

type Props = {
  postByUser: PostByUser;
};

//投稿詳細のリストアイテム
const PostDetailListItem: VFC<Props> = (props) => {
  const { updateAddOrDeletLikes, likeFlag } = useUpdateAddOrDeletLikes();
  const queryLikePostCheck = useQueryLikePostCheck();
  const { deletePost } = useDeletePost();
  const { userEmail } = useRecoilSetEmail();
  const { mutate } = useSWRConfig();
  const { queryProfileLikedPostsByUsers } = useQueryProfileLikesPostsByUsers();
  const { queryDetailPost } = useQueryPostByUserDetail();
  const { queryPostsByFollowings } = useQueryPostsByUsers();

  const router = useRouter();

  //既にいいねしているか投稿かどうか確認
  const { data: liked } = useFetch<DocumentData, (email: string, id: string | string[]) => Promise<DocumentData>>(
    userEmail && router.query.id ? `firestore/users/${userEmail.email}/likedPosts/${router.query.id}` : null,
    () => queryLikePostCheck(userEmail.email, router.query.id)
  );

  return (
    <div>
      <div className="flex items-center text-base font-bold rounded-t-2xl">
        {props.postByUser?.profilePhoto !== '' ? (
          <img src={props.postByUser?.profilePhoto} className="w-8 h-8 rounded-full" />
        ) : (
          <HiUserCircle className="w-8 h-8" />
        )}
        <h1 className="ml-2">{props.postByUser?.name}</h1>
        <div className="ml-auto ">
          <button
            className={`text-base ${
              likeFlag === null && liked ? 'text-red-600' : likeFlag === true ? 'text-red-600' : null
            }`}
            onClick={async () => {
              await updateAddOrDeletLikes(props.postByUser),
                // 投稿のいいね数を更新
                mutate(
                  userEmail ? [`firestore/users/${userEmail.email}/postsByFollowing`, userEmail.email] : null,
                  queryPostsByFollowings
                );
              // 投稿詳細のいいね数を更新
              mutate(router.query.id ? [`firestore/posts`, router.query.id] : null, () =>
                queryDetailPost(router.query.id)
              );
              // いいね欄の表示を更新
              mutate(userEmail ? `firestore/users/${userEmail.email}/likedPosts` : null, () =>
                queryProfileLikedPostsByUsers(userEmail.email)
              );
            }}
          >
            <AiFillHeart className={`inline-block mr-2 align-top  `} />
            {!liked && likeFlag === true
              ? props.postByUser?.likeCount + 1
              : liked && likeFlag === false
              ? props.postByUser?.likeCount - 1
              : props.postByUser?.likeCount}
          </button>
        </div>
      </div>
      <p className="mt-4 text-base font-bold">{props.postByUser?.writing}</p>
      {props.postByUser?.image !== '' ? (
        <div className="flex justify-center mt-6 h-80 bg-gray-100 rounded-2xl outline-none">
          <img src={props.postByUser?.image} className="object-contain text-center" />
        </div>
      ) : null}
      <table className="mt-6 w-full text-base text-center table-fixed">
        <tbody className="mt-2">
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border">イベント名</th>
            <td className="py-2 px-4 max-w-sm text-left break-words border">{props.postByUser?.eventName}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-left border">ジャンル</th>
            <td className="py-2 px-4 text-left border">{props.postByUser?.genre}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border">都道府県</th>
            <td className="py-2 px-4 text-left border">{props.postByUser?.location}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-left border">開催日</th>
            <td className="py-2 px-4 text-left border">{props.postByUser?.eventDate}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border">開催場所</th>
            <td className="py-2 px-4 max-w-sm text-left break-words border">{props.postByUser?.eventLocation}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-left border">開催時間</th>
            <td className="py-2 px-4 text-left border">{`${props.postByUser?.openTime}～${props.postByUser?.closeTime}`}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border">値段</th>
            <td className="py-2 px-4 text-left border">
              {props.postByUser?.minAmount}～{props.postByUser?.maxAmount}
            </td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-left border">チケット</th>
            <td className="py-2 px-4 text-left border">{props.postByUser?.tickets}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border">クーポンコード</th>
            <td className="py-2 px-4 max-w-sm text-left break-words border">{props.postByUser?.coupon}</td>
          </tr>
        </tbody>
      </table>
      {userEmail?.email === props.postByUser?.email ? (
        <button
          onClick={deletePost}
          className="block p-1 mt-6 ml-auto font-bold text-white bg-red-500 hover:bg-red-600"
        >
          投稿を削除する
        </button>
      ) : null}
    </div>
  );
};

export default memo(PostDetailListItem);
