import React, { memo } from 'react';
import { useQueryProfilePostsByUser } from '../../../FireBase/Query/Profile/useQueryProfilePostsByUser';
import PostListItem from '../Post/PostListItem';
import SkeletonLoading from '../SkeletonLoading';

//プロフィールに表示する投稿一覧
const ProfilePost = () => {
  const { postsByUser, postsByUserLoading, error } = useQueryProfilePostsByUser();

  if (postsByUserLoading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return <p className="text-xl font-bold text-center">{error}</p>;
  }

  if (postsByUser?.length === 0) {
    return <p className="text-xl font-bold text-center">投稿がありません</p>;
  }

  return (
    <>
      <div className="grid gap-6">
        {postsByUser?.map((postsByUser) => {
          return <PostListItem key={postsByUser.id} postsByUsers={postsByUser} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfilePost);
