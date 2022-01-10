import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';
import { PostDetailData } from '../../../types/PostDetailData';
import { UserData } from '../../../types/UserData';
import { useUpdateAddOrDeletLikes } from '../../../FireBase/Mutation/Update/useUpdateAddOrDeletLikes';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import { useDeletePost } from '../../../FireBase/Mutation/Delete/useDeletePost';
import PostDetailSkeletonLoadingItem from '../SkeletonLoading/PostDetailSkeletonLoadingItem';
import { useQueryLikePostDetailCheck } from '../../../FireBase/Query/Posts/useQueryLikePostDetailCheck';

type postsByUsers = Omit<PostDetailData, 'email'> & Pick<UserData, 'name' | 'profilePhoto' | 'email'>;

type Props = {
  postByUser: postsByUsers;
};

//投稿詳細のリストアイテム
const PostDetailListItem: VFC<Props> = (props) => {
  const { updateAddOrDeletLikes, likeFlag } = useUpdateAddOrDeletLikes();
  const { like, likePostDetailLoading } = useQueryLikePostDetailCheck(props.postByUser?.id);
  const { deletePost } = useDeletePost();
  const { userEmail } = useRecoilSetEmail();

  if (likePostDetailLoading) {
    return <PostDetailSkeletonLoadingItem />;
  }

  return (
    <div>
      <div className=" flex  rounded-t-2xl items-center font-bold text-base ">
        {props.postByUser?.profilePhoto !== '' ? (
          <img src={props.postByUser?.profilePhoto} className="w-8 h-8 rounded-full" />
        ) : (
          <HiUserCircle className="w-8 h-8" />
        )}
        <h1 className="ml-2">{props.postByUser?.name}</h1>
        <div className="ml-auto ">
          <span
            className={`text-base ${
              likeFlag === null && like === 1 ? 'text-red-600' : likeFlag === true ? 'text-red-600' : null
            }`}
            onClick={() => updateAddOrDeletLikes(props.postByUser)}
          >
            <AiFillHeart className={`inline-block mr-2 align-top  `} />
            {like === 0 && likeFlag === true
              ? props.postByUser?.likeCount + 1
              : like === 1 && likeFlag === false
              ? props.postByUser?.likeCount - 1
              : props.postByUser?.likeCount}
          </span>
        </div>
      </div>
      <p className="text-base font-bold mt-4">{props.postByUser?.writing}</p>
      {props.postByUser?.image !== '' ? (
        <div className="flex justify-center  h-80 mt-6  outline-none  rounded-2xl bg-gray-100 ">
          <img src={props.postByUser?.image} className="text-center object-contain " />
        </div>
      ) : null}
      <table className="table-fixed text-center text-base w-full mt-6">
        <tbody className="mt-2">
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left ">イベント名</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{props.postByUser?.eventName}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">ジャンル</th>
            <td className="border px-4 py-2 text-left">{props.postByUser?.genre}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">都道府県</th>
            <td className="border px-4 py-2 text-left">{props.postByUser?.location}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">開催日</th>
            <td className="border px-4 py-2 text-left">{props.postByUser?.eventDate}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">開催場所</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{props.postByUser?.eventLocation}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">開催時間</th>
            <td className="border px-4 py-2 text-left">{`${props.postByUser?.openTime}～${props.postByUser?.closeTime}`}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">値段</th>
            <td className="border px-4 py-2 text-left">
              {props.postByUser?.minAmount}～{props.postByUser?.maxAmount}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">チケット</th>
            <td className="border px-4 py-2 text-left">{props.postByUser?.tickets}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">クーポンコード</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{props.postByUser?.coupon}</td>
          </tr>
        </tbody>
      </table>
      {userEmail?.email === props.postByUser?.email ? (
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

export default memo(PostDetailListItem);
