import React, { memo, VFC } from 'react';
import ListItem from './ListItem';
import FollowsAndFollowersSkeletonLoading from '../SkeletonLoading/FollowsAndFollowersSkeletonLoading';
import { useQueryFollowers } from '../../../FireBase/Query/FollowsAndFollowers/useQueryFollowers';

//フォロワー一覧のリスト
const Followers: VFC = () => {
  const { followers, followersLoading, error, authEmail } = useQueryFollowers();

  if (followersLoading) {
    return <FollowsAndFollowersSkeletonLoading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className=" md:max-w-xl lg:max-w-2xl">
      {followers.map((user) => {
        return <ListItem key={user.email} user={user} email={authEmail} />;
      })}
    </div>
  );
};

export default memo(Followers);
