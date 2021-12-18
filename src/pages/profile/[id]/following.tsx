//フォロー中
import { NextPage } from 'next';
import FollowAndFollowers from '../../../components/FollowAndFollowers';
import FollowAndFollowersLayout from '../../../components/Layout/FollowAndFollowersLayout';

const following: NextPage = () => {

  return (
    <FollowAndFollowersLayout>
      <FollowAndFollowers />
    </FollowAndFollowersLayout>
  );
};

export default following;
