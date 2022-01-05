import React, { memo } from 'react';
import { useQueryProfileLikesPostsByUsers } from '../../../FireBase/Query/Profile/useQueryProfileLikesPostsByUsers';
import ListItem from '../Post/ListItem';
import SkeletonLoading from '../SkeletonLoading';

const ProfileLikePost = () => {
  const { postsByUser, postsByUsersLoading } = useQueryProfileLikesPostsByUsers();

  if (postsByUser?.length === 0 || postsByUsersLoading) {
    return <SkeletonLoading />;
  }

  if (postsByUser === undefined) {
    return <p>エラー</p>;
  }

  if (postsByUser === null) {
    return <p>いいねしている投稿がありません</p>;
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

export default memo(ProfileLikePost);
