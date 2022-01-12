import React, { memo } from 'react';
import { useQueryProfileLikesPostsByUsers } from '../../../FireBase/Query/Profile/useQueryProfileLikesPostsByUsers';
import PostListItem from '../Post/PostListItem';
import SkeletonLoading from '../SkeletonLoading';

//プロフィールに表示するいいねした投稿一覧
const ProfileLikePost = () => {
  const { postsByUsers, postsByUsersLoading, error } = useQueryProfileLikesPostsByUsers();

  if (postsByUsersLoading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return <p className="text-xl font-bold text-center">{error}</p>;
  }

  if (postsByUsers?.length === 0) {
    return <p className="text-xl font-bold text-center">いいねした投稿がありません</p>;
  }

  return (
    <>
      <div className="grid gap-6 ">
        {postsByUsers?.map((postByUser) => {
          return <PostListItem key={postByUser.id} postsByUsers={postByUser} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfileLikePost);
