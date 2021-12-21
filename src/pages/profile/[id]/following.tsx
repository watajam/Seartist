import { NextPage } from 'next';
import Follows from '../../../components/FollowsOrFollowers/follows';
import FollowAndFollowersLayout from '../../../components/Layout/FollowAndFollowersLayout';

const following: NextPage = () => {
  return (
    <FollowAndFollowersLayout>
      <Follows />
    </FollowAndFollowersLayout>
  );
};

export default following;
