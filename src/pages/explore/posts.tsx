import { NextPage } from 'next';
import PostsExplore from '../../components/Explore/PostsExplore';
import PostLayout from '../../components/Layout/PostLayout';

//検索結果ページ
const posts: NextPage = () => {
  return (
    <PostLayout>
      <PostsExplore />
    </PostLayout>
  );
};

export default posts;
