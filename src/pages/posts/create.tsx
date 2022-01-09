import { NextPage } from 'next';
import PostCreateAndExploreLayout from '../../components/Layout/PostCreateAndExploreLayout';
import PostCreate from '../../components/Post/PostCreate';

//投稿作成ページ
export const Create: NextPage = () => {
  return (
    <PostCreateAndExploreLayout>
      <PostCreate />
    </PostCreateAndExploreLayout>
  );
};

export default Create;
