import { NextPage } from 'next';
import PostDetailLayout from '../../../components/Layout/PostDetailLayout';
import PostDetail from '../../../components/Post/PostDetail';

const PostsIds: NextPage = () => {
  return (
    <PostDetailLayout>
      <PostDetail />
    </PostDetailLayout>
  );
};

export default PostsIds;
