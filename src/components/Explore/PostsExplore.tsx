import React, { memo, VFC } from 'react';
import { useQueryPostsExploreSetLoading } from '../../../FireBase/Query/useQueryPostsExploreSetLoading';
import { useQueryUsersExploreSetLoading } from '../../../FireBase/Query/useQueryUsersExploreSetLoading';

import ListItem from '../Post/ListItem';
import SkeletonLoading from '../SkeletonLoading';

const PostsExplore: VFC = () => {
  const { posts, postsLoading } = useQueryPostsExploreSetLoading();
  const { users } = useQueryUsersExploreSetLoading(posts);

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

export default memo(PostsExplore);
