import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';
import Link from 'next/link';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';
import SkeletonLoading from '../SkeletonLoading';
import { useQueryLikePostsCheck } from '../../../FireBase/Query/Posts/useQueryLikePostsCheck';
import { useUpdateAddOrDeletLikes } from '../../../FireBase/Mutation/Update/useUpdateAddOrDeletLikes';

type postsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

type Props = {
  postsByUsers: postsByUsers;
};

const PostListItem: VFC<Props> = (props) => {
  const { updateAddOrDeletLikes, likeFlag } = useUpdateAddOrDeletLikes();
  const { like, likePostDetailLoading } = useQueryLikePostsCheck(props.postsByUsers?.id);

  if (likePostDetailLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="rounded-2xl shadow">
      <Link href={`/profile/${props.postsByUsers?.userId}`}>
        <a>
          <header className="bg-gray-400 text-white flex  p-4 rounded-t-2xl items-center font-bold text-base ">
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
            <p className="text-base text-bold font-bold break-words max-w-sm  sm:max-w-md md:max-w-lg">
              {props.postsByUsers?.writing}
            </p>

            {props.postsByUsers?.image !== '' ? (
              <div className="flex justify-center  h-80 mt-6  outline-none  rounded-2xl bg-gray-100 ">
                <img src={props.postsByUsers?.image} className="text-center object-contain " />
              </div>
            ) : null}

            <table className="table-fixed text-center text-base w-full mt-6 ">
              <tbody className="mt-2">
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left w-2/5">イベント名</th>
                  <td className="border px-4 py-2 text-left break-words max-w-sm ">{props.postsByUsers?.eventName}</td>
                </tr>
                <tr>
                  <th className="border px-4 py-2 text-left">ジャンル</th>
                  <td className="border px-4 py-2 text-left">{props.postsByUsers?.genre}</td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">開催場所</th>
                  <td className="border px-4 py-2 text-left break-words max-w-sm ">
                    {props.postsByUsers?.eventLocation}
                  </td>
                </tr>
                <tr>
                  <th className="border px-4 py-2 text-left">開催時間</th>
                  <td className="border px-4 py-2 text-left">{`${props.postsByUsers?.openTime}～${props.postsByUsers?.closeTime}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </a>
      </Link>

      <div className="flex justify-end  items-center mt-6 mr-4 mb-2">
        <span
          className={`text-base ${
            likeFlag === null && like === 1 ? 'text-red-600' : likeFlag === true ? 'text-red-600' : null
          }`}
          onClick={() => updateAddOrDeletLikes(props.postsByUsers)}
        >
          <AiFillHeart className={`inline-block mr-2 align-top  `} />

          {like === 0 && likeFlag === true
            ? props.postsByUsers?.likeCount + 1
            : like === 1 && likeFlag === false
            ? props.postsByUsers?.likeCount - 1
            : props.postsByUsers?.likeCount}
        </span>
      </div>
    </div>
  );
};

export default memo(PostListItem);
