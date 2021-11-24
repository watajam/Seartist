import React, { memo, VFC } from 'react';
import { useQuerPostsSetLoading } from '../../../FireBase/Query/useQuerPostsSetLoading';
import { useQueryUserInfoSetLoading } from '../../../FireBase/Query/useQueryUserInfoSetLoading';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/useQueryUserEmailCheck';

import SkeletonLoading from '../SkeletonLoading';
import ListItem from './ListItem';

const Post: VFC = () => {
  const { user, userLoading } = useQueryUserInfoSetLoading();
  const { posts, postsLoading } = useQuerPostsSetLoading();
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
