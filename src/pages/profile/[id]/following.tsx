import { NextPage } from 'next';
import FollowAndFollowersLayout from '../../../components/Layout/FollowAndFollowersLayout';
import Follows from '../../../components/FollowsAndFollowers/Follows';

const following: NextPage = () => {
  return (
    <FollowAndFollowersLayout>
      <Follows />
    </FollowAndFollowersLayout>
  );
};

export default following;
