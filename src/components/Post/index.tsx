import React, { memo, VFC } from 'react';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/User/useQueryUserEmailCheck';

import SkeletonLoading from '../SkeletonLoading';
import ListItem from './ListItem';
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

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {postsByUsers.map((postsByUser) => {
        return <ListItem key={postsByUser.id} postsByUsers={postsByUser} />;
      })}
    </div>
  );
};

export default memo(Post);
