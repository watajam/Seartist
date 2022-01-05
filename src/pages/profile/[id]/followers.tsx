import { NextPage } from 'next';
import Followers from '../../../components/FollowsAndFollowers/Followers';
import FollowAndFollowersLayout from '../../../components/Layout/FollowAndFollowersLayout';

const followers: NextPage = () => {
  return (
    <FollowAndFollowersLayout>
      <Followers />
    </FollowAndFollowersLayout>
  );
};

export default followers;
