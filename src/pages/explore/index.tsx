import { NextPage } from 'next';
import PostCreateAndExploreLayout from '../../components/Layout/PostCreateAndExploreLayout';
import PostExplore from '../../components/Post/PostExplore';

const Explore: NextPage = () => {
  return (
    <PostCreateAndExploreLayout>
      <PostExplore />
    </PostCreateAndExploreLayout>
  );
};

export default Explore;
