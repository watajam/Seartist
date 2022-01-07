import React, { memo } from 'react';
import { useQueryProfileLikesPostsByUsers } from '../../../FireBase/Query/Profile/useQueryProfileLikesPostsByUsers';
import ListItem from '../Post/ListItem';
import SkeletonLoading from '../SkeletonLoading';

const ProfileLikePost = () => {
  const { postsByUsers, postsByUsersLoading, error } = useQueryProfileLikesPostsByUsers();

  if (postsByUsersLoading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="grid gap-6 ">
        {postsByUsers?.map((postByUser) => {
          return <ListItem key={postByUser.id} postsByUsers={postByUser} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfileLikePost);
