import { NextPage } from 'next';
import PostDetailLayout from '../../../components/Layout/PostDetailLayout';
import PostDetail from '../../../components/Post/PostDetail';

//投稿詳細ページ
const PostsIds: NextPage = () => {
  return (
    <PostDetailLayout>
      <PostDetail />
    </PostDetailLayout>
  );
};

export default PostsIds;
