import React, { memo } from 'react';
import { useQueryProfilePostsByUser } from '../../../FireBase/Query/Profile/useQueryProfilePostsByUser';
import ListItem from '../Post/ListItem';
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
          return <ListItem key={postsByUser.id} postsByUsers={postsByUser} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfilePost);
