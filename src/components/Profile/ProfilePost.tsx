import React, { memo } from 'react';
import { useQueryProfilePostsByUser } from '../../../FireBase/Query/Profile/useQueryProfilePostsByUser';
import PostByUserListItem from '../Post/PostByUserListItem';
import SkeletonLoading from '../SkeletonLoading';

const ProfilePost = () => {
  const { postsByUser, postsByUserLoading } = useQueryProfilePostsByUser();

  if (postsByUser?.length === 0 || postsByUserLoading) {
    return <SkeletonLoading />;
  }

  if (postsByUser === undefined) {
    return <p>エラー</p>;
  }

  if (postsByUser === null) {
    return <p>投稿がありません</p>;
  }
  return (
    <>
      <div className="grid gap-6 ">
        {postsByUser?.map((postsByUser) => {
          return <PostByUserListItem key={postsByUser.id} postsByUsers={postsByUser} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfilePost);
