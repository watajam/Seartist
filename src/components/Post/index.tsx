import React, { memo, VFC } from 'react';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/User/useQueryUserEmailCheck';
import SkeletonLoading from '../SkeletonLoading';
import { useQueryPostsByUsers } from '../../../FireBase/Query/Posts/useQueryPostsByUsers';
import PostListItem from './PostListItem';

//ホーム画面一覧
const Post: VFC = () => {
  const { postsByUsers, postsByUsersLoading, error } = useQueryPostsByUsers();
  useQueryUserEmailCheck();

  if (postsByUsersLoading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {postsByUsers.map((postByUser) => {
        return <PostListItem key={postByUser.id} postsByUsers={postByUser} />;
      })}
    </div>
  );
};

export default memo(Post);
