import { NextPage } from 'next';
import PostCreateAndExploreLayout from '../../components/Layout/PostCreateAndExploreLayout';
import ExploreForm from '../../components/Explore';

const Explore: NextPage = () => {
  return (
    <PostCreateAndExploreLayout>
      <ExploreForm />
    </PostCreateAndExploreLayout>
  );
};

export default Explore;
