import React, { VFC } from 'react';
import PostLayout from '../../components/Layout/PostLayout';
import Post from '../../components/Post';

export const Posts: VFC = () => {
  return (
    <PostLayout>
      <Post />
    </PostLayout>
  );
};

export default Posts;
