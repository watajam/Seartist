import React, { memo, VFC } from 'react';
import { useQuerPostsSetLoading } from '../../../FireBase/Query/useQuerPostsSetLoading';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/useQueryUserEmailCheck';
import { useQueryUserInformationSetLoading } from '../../../FireBase/Query/useQueryUserInformationSetLoading';
import SkeletonLoading from '../SkeletonLoading';
import ListItem from './ListItem';

const Post: VFC = () => {
  const { user, userLoading } = useQueryUserInformationSetLoading();
  const { posts, postLoading } = useQuerPostsSetLoading();
  useQueryUserEmailCheck();

  if (postLoading) {
    return <SkeletonLoading />;
  }
  if (userLoading) {
    return <SkeletonLoading />;
  }

  if (user === null) {
    return <p>エラー</p>;
  }

  if (posts === []) {
    return <p>エラー</p>;
  }

  if (posts && posts.length === 0) {
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
