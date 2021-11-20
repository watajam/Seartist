import { NextPage } from 'next';
import PostLayout from '../../components/Layout/PostLayout';
import Post from '../../components/Post';

export const Posts: NextPage = () => {
  return (
    <PostLayout>
      <Post />
    </PostLayout>
  );
};

export default Posts;
