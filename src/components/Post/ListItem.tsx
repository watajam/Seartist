import React, { memo, useState, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';
import Link from 'next/link';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';
import SkeletonLoading from '../SkeletonLoading';
import { useUpdateAddandDeletLikes } from '../../../FireBase/Mutation/Update/useUpdateAddandDeletLikes';
import { useQueryLikePostsCheck } from '../../../FireBase/Query/Posts/useQueryLikePostsCheck';

type Props = {
  post: Omit<PostData, `email`>;
  user: Pick<UserData, 'userId' | 'name' | 'image' | 'email'>;
};

const ListItem: VFC<Props> = (props) => {
  const { updateAddandDeletLikes } = useUpdateAddandDeletLikes();
  const [like, setLike] = useState(null);
  useQueryLikePostsCheck(like, setLike, props.post?.id);

  if (like === null) {
    return <SkeletonLoading />;
  }

  return (
    <div className="rounded-2xl shadow">
      <Link href={`/profile/${props.user?.userId}`}>
        <a>
          <header className="bg-gray-400 text-white flex  p-4 rounded-t-2xl items-center font-bold text-base ">
            {props.user?.image !== '' ? (
              <img src={props.user?.image} className="w-8 h-8 rounded-full" />
            ) : (
              <HiUserCircle className="w-8 h-8" />
            )}
            <h1 className="ml-2">{props.user?.name}</h1>
            <time dateTime={props.post?.eventDate} className="ml-auto text-lg">
              {props.post?.eventDate}
            </time>
          </header>
        </a>
      </Link>
      <Link href={`/posts/${props.post?.id}`}>
        <a>
          <div className="p-4">
            <p className="text-base text-bold font-bold break-words max-w-sm  sm:max-w-md md:max-w-lg">
              {props.post?.writing}
            </p>

            {props.post?.image !== '' ? (
              <div className="flex justify-center  h-80 mt-6  outline-none  rounded-2xl bg-gray-100 ">
                <img src={props.post?.image} className="text-center object-contain " />
              </div>
            ) : null}

            <table className="table-fixed text-center text-base w-full mt-6 ">
              <tbody className="mt-2">
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left w-2/5">イベント名</th>
                  <td className="border px-4 py-2 text-left break-words max-w-sm ">{props.post?.eventName}</td>
                </tr>
                <tr>
                  <th className="border px-4 py-2 text-left">ジャンル</th>
                  <td className="border px-4 py-2 text-left">{props.post?.genre}</td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">開催場所</th>
                  <td className="border px-4 py-2 text-left break-words max-w-sm ">{props.post?.eventLocation}</td>
                </tr>
                <tr>
                  <th className="border px-4 py-2 text-left">開催時間</th>
                  <td className="border px-4 py-2 text-left">{`${props.post?.openTime}～${props.post?.closeTime}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </a>
      </Link>

      <div className="flex justify-end  items-center mt-6 mr-4 mb-2">
        <span
          className={`text-base ${like === 1 ? 'text-red-600' : null}`}
          onClick={() => updateAddandDeletLikes(setLike, props.user, props.post)}
        >
          <AiFillHeart className={`inline-block mr-2 align-top  `} />
          {props.post?.likeCount}
        </span>
      </div>
    </div>
  );
};

export default memo(ListItem);
