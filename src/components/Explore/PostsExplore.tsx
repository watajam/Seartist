import React, { memo, VFC } from 'react';
import { useQueryPostsByUsersExplore } from '../../../FireBase/Query/Posts/useQueryPostsByUsersExplore';
import ListItem from '../Post/ListItem';
import SkeletonLoading from '../SkeletonLoading';

const PostsExplore: VFC = () => {
  const { postsByUsers, postsByUsersLoading } = useQueryPostsByUsersExplore();

  if (postsByUsers?.length === 0 || postsByUsersLoading) {
    return <SkeletonLoading />;
  }

  if (postsByUsers === undefined) {
    return <p>エラー</p>;
  }

  if (postsByUsers === null) {
    return <p>投稿が見つかりませんでした</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {postsByUsers.map((postsByUser) => {
        return <ListItem key={postsByUser.id} postsByUsers={postsByUser} />;
      })}
    </div>
  );
};

export default memo(PostsExplore);
