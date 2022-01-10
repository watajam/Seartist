import React, { memo, VFC } from 'react';
import { useQueryPostsByUsersExplore } from '../../../FireBase/Query/Posts/useQueryPostsByUsersExplore';
import PostListItem from '../Post/PostListItem';
import SkeletonLoading from '../SkeletonLoading';

//投稿検索結果のリスト
const PostsExplore: VFC = () => {
  const { postsByUsers, postsByUsersLoading, error } = useQueryPostsByUsersExplore();

  if (postsByUsersLoading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {postsByUsers.map((postsByUser) => {
        return <PostListItem key={postsByUser.id} postsByUsers={postsByUser} />;
      })}
    </div>
  );
};

export default memo(PostsExplore);
