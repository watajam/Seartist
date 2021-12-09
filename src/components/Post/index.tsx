import React, { memo, VFC } from 'react';
import { useQueryUserInfo } from '../../../FireBase/query/User/useQueryUserInfo';
import { useQueryUserEmailCheck } from '../../../FireBase/query/User/useQueryUserEmailCheck';

import SkeletonLoading from '../SkeletonLoading';
import ListItem from './ListItem';
import { useQueryUserPosts } from '../../../FireBase/query/Posts/useQueryUserPosts';

const Post: VFC = () => {
  const { user, userLoading } = useQueryUserInfo();
  const { posts, postsLoading } = useQueryUserPosts();
  useQueryUserEmailCheck();

  if (postsLoading || userLoading) {
    return <SkeletonLoading />;
  }

  if (user === undefined || posts === undefined) {
    return <p>エラー</p>;
  }

  if (posts && posts.length === 0 && user) {
    return <p>まだ投稿がありません</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {posts.map((post) => {
        return <ListItem key={post.id} post={post} user={user} />;
      })}
    </div>
  );
};

export default memo(Post);
