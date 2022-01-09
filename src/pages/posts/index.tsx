import { NextPage } from 'next';
import PostLayout from '../../components/Layout/PostLayout';
import Post from '../../components/Post';

//メインページ（フォローしているユーザーの投稿の表示）
export const Posts: NextPage = () => {
  return (
    <PostLayout>
      <Post />
    </PostLayout>
  );
};

export default Posts;
