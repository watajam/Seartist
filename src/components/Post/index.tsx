import React, { memo, VFC } from 'react';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/User/useQueryUserEmailCheck';

import SkeletonLoading from '../SkeletonLoading';
import PostByUserListItem from './PostByUserListItem';
import { useQueryPostsByUsers } from '../../../FireBase/Query/Posts/useQueryPostsByUsers';

const Post: VFC = () => {
  const { postsByUsers, postsByUsersLoading } = useQueryPostsByUsers();
  useQueryUserEmailCheck();

  if (postsByUsers?.length === 0 || postsByUsersLoading) {
    return <SkeletonLoading />;
  }

  if (postsByUsers === undefined) {
    return <p>エラー</p>;
  }

  if (postsByUsers === null) {
    return <p>フォローしているユーザーの投稿がありません</p>;
  }

  if (postsByUsers?.length === 0) {
    return <p>投稿がありません</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {postsByUsers.map((post) => {
        return <PostByUserListItem key={post.id} postsByUsers={post} />;
      })}
    </div>
  );
};

export default memo(Post);
