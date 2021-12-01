import { NextPage } from 'next';
import ExploreConditionPosts from '../../components/Explore/ExploreConditionPosts';
import PostLayout from '../../components/Layout/PostLayout';

const ExploreCondition: NextPage = () => {
  return (
    <PostLayout>
      <ExploreConditionPosts />
    </PostLayout>
  );
};

export default ExploreCondition;
