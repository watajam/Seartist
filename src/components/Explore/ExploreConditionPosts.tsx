import React, { memo, VFC } from 'react';

import { useQuerExploreConditionPostsSetLoading } from '../../../FireBase/Query/useQuerExploreConditionPostsSetLoading';
import ListItem from '../Post/ListItem';
import SkeletonLoading from '../SkeletonLoading';
import { useQuerExploreConditionUsersSetLoading } from '../../../FireBase/Query/useQuerExploreConditionUsersSetLoading';

const ExploreConditionPosts: VFC = () => {
  const { posts, postsLoading } = useQuerExploreConditionPostsSetLoading();
  const { users } = useQuerExploreConditionUsersSetLoading(posts);

  if (postsLoading) {
    return <SkeletonLoading />;
  }

  if (posts === null) {
    return <p>投稿が見つかりませんでした。</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {posts?.map((post, index) => (
        <ListItem key={post.id} post={post} user={users[index]} />
      ))}
    </div>
  );
};

export default memo(ExploreConditionPosts);
