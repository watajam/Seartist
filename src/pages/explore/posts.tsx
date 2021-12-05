import { NextPage } from 'next';
import PostsExplore from '../../components/Explore/PostsExplore';
import PostLayout from '../../components/Layout/PostLayout';

const posts: NextPage = () => {
  return (
    <PostLayout>
      <PostsExplore />
    </PostLayout>
  );
};

export default posts;
