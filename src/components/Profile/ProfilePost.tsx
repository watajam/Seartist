import React, { memo } from 'react';
import { useQueryProfilePostsByUser } from '../../../FireBase/Query/Profile/useQueryProfilePostsByUser';
import ListItem from '../Post/ListItem';
import SkeletonLoading from '../SkeletonLoading';

const ProfilePost = () => {
  const { postsByUser, postsByUserLoading, error } = useQueryProfilePostsByUser();

  if (postsByUserLoading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (postsByUser?.length === 0) {
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
