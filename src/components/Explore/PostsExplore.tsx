import React, { memo, VFC } from 'react';
import { useQueryPostsExplore } from '../../../FireBase/Query/Posts/useQueryPostsExplore';
import { useQueryUsersExplore } from '../../../FireBase/Query/Users/useQueryUsersExplore';
import PostListItem from '../Post/PostListItem';
import SkeletonLoading from '../SkeletonLoading';

const PostsExplore: VFC = () => {
  const { posts, postsLoading } = useQueryPostsExplore();
  const { users } = useQueryUsersExplore(posts);

  if (postsLoading) {
    return <SkeletonLoading />;
  }

  if (posts === null) {
    return <p>投稿が見つかりませんでした。</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {posts?.map((post, index) => (
        <PostListItem key={post.id} post={post} user={users[index]} />
      ))}
    </div>
  );
};

export default memo(PostsExplore);
