import { NextPage } from 'next';
import FollowAndFollowersLayout from '../../../components/Layout/FollowAndFollowersLayout';
import Follows from '../../../components/FollowsAndFollowers/Follows';

//フォロー一覧ページ
const following: NextPage = () => {
  return (
    <FollowAndFollowersLayout>
      <Follows />
    </FollowAndFollowersLayout>
  );
};

export default following;
