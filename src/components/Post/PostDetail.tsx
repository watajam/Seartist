import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import PostDetailSkeletonLoadingItem from '../SkeletonLoading/PostDetailSkeletonLoadingItem';
import { useDeletePost } from '../../../FireBase/Mutation/Delete/useDeletePost';
import { AiFillHeart } from 'react-icons/ai';
import { useQueryLikePostDetailCheck } from '../../../FireBase/Query/Posts/useQueryLikePostDetailCheck';
import { useUpdateAddandDeletLikes } from '../../../FireBase/Mutation/Update/useUpdateAddandDeletLikes';
import { useQueryPostByUserDetail } from '../../../FireBase/Query/Posts/useQueryPostByUserDetail';

const PostDetail: VFC = () => {
  const { userEmail } = useRecoilSetEmail();

  const { deletePost } = useDeletePost();

  const { postByUser, postByUserLoading } = useQueryPostByUserDetail();
  const { updateAddandDeletLikes, likeFlag } = useUpdateAddandDeletLikes();

  const like = useQueryLikePostDetailCheck(postByUser?.id);

  if (postByUser === null || postByUserLoading || like === null) {
    return <PostDetailSkeletonLoadingItem />;
  }

  if (postByUser === undefined) {
    return <p>エラー</p>;
  }

  if (postByUser === null) {
    return <p>投稿が見つかりませんでした</p>;
  }

  return (
    <div>
      <div className=" flex  rounded-t-2xl items-center font-bold text-base ">
        {postByUser?.profilePhoto !== '' ? (
          <img src={postByUser?.profilePhoto} className="w-8 h-8 rounded-full" />
        ) : (
          <HiUserCircle className="w-8 h-8" />
        )}
        <h1 className="ml-2">{postByUser?.name}</h1>
        <div className="ml-auto ">
          <span
            className={`text-base ${
              likeFlag === null && like === 1 ? 'text-red-600' : likeFlag === 1 ? 'text-red-600' : null
            }`}
            onClick={() => updateAddandDeletLikes(postByUser)}
          >
            <AiFillHeart className={`inline-block mr-2 align-top  `} />
            {like === 0 && likeFlag === 1
              ? postByUser?.likeCount + 1
              : like === 1 && likeFlag === 0
              ? postByUser?.likeCount - 1
              : postByUser?.likeCount}
          </span>
        </div>
      </div>
      <p className="text-base font-bold mt-4">{postByUser?.writing}</p>
      {postByUser?.image !== '' ? (
        <div className="flex justify-center  h-80 mt-6  outline-none  rounded-2xl bg-gray-100 ">
          <img src={postByUser?.image} className="text-center object-contain " />
        </div>
      ) : null}
      <table className="table-fixed text-center text-base w-full mt-6">
        <tbody className="mt-2">
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left ">イベント名</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{postByUser?.eventName}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">ジャンル</th>
            <td className="border px-4 py-2 text-left">{postByUser?.genre}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">都道府県</th>
            <td className="border px-4 py-2 text-left">{postByUser?.location}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">開催日</th>
            <td className="border px-4 py-2 text-left">{postByUser?.eventDate}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">開催場所</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{postByUser?.eventLocation}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">開催時間</th>
            <td className="border px-4 py-2 text-left">{`${postByUser?.openTime}～${postByUser?.closeTime}`}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">値段</th>
            <td className="border px-4 py-2 text-left">
              {postByUser?.minAmount}～{postByUser?.maxAmount}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">チケット</th>
            <td className="border px-4 py-2 text-left">{postByUser?.tickets}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">クーポンコード</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{postByUser?.coupon}</td>
          </tr>
        </tbody>
      </table>
      {userEmail.email === postByUser?.email ? (
        <button
          onClick={deletePost}
          className="text-white font-bold block ml-auto mt-6 p-1 bg-red-500 hover:bg-red-600"
        >
          投稿を削除する
        </button>
      ) : null}
    </div>
  );
};

export default memo(PostDetail);
