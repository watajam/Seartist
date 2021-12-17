//フォロワー
import { NextPage } from 'next';
import ListItem from '../../../components/FollowAndFollowers/ListItem';
import FollowAndFollowersLayout from '../../../components/Layout/FollowAndFollowersLayout';

const followers: NextPage = () => {
  return (
    <FollowAndFollowersLayout>
      <ListItem />
    </FollowAndFollowersLayout>
  );
};

export default followers;
