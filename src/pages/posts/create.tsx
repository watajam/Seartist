import { NextPage } from 'next';
import PostCreateAndExploreLayout from '../../components/Layout/PostCreateAndExploreLayout';
import PostCreate from '../../components/Post/PostCreate';

export const Create: NextPage = () => {
  return (
    <PostCreateAndExploreLayout>
      <PostCreate />
    </PostCreateAndExploreLayout>
  );
};

export default Create;
