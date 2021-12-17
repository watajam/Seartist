//フォロー中
import { NextPage } from 'next';
import ListItem from '../../../components/FollowAndFollowers/ListItem';
import FollowAndFollowersLayout from '../../../components/Layout/FollowAndFollowersLayout';

const following: NextPage = () => {
  return (
    <FollowAndFollowersLayout>
      <ListItem />
    </FollowAndFollowersLayout>
  );
};

export default following;
