import { NextPage } from 'next';
import Followers from '../../../components/FollowsOrFollowers/Followers';
import FollowAndFollowersLayout from '../../../components/Layout/FollowAndFollowersLayout';

const followers: NextPage = () => {
  return (
    <FollowAndFollowersLayout>
      <Followers />
    </FollowAndFollowersLayout>
  );
};

export default followers;
