import React, { memo, VFC } from 'react';
import ListItem from './ListItem';
import FollowsAndFollowersSkeletonLoading from '../SkeletonLoading/FollowsAndFollowersSkeletonLoading';
import { useQueryFollowers } from '../../../FireBase/Query/FollowsAndFollowers/useQueryFollowers';

const Followers: VFC = () => {
  const { followers, followersLoading, authEmail } = useQueryFollowers();

  if (followers?.length === 0 || followersLoading) {
    return <FollowsAndFollowersSkeletonLoading />;
  }

  if (followers === undefined) {
    return <p>エラー</p>;
  }

  if (followers === null) {
    return <p>フォロワーがいません</p>;
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
