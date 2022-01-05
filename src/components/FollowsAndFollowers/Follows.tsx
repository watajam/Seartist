import { memo, VFC } from 'react';
import { useQueryFollows } from '../../../FireBase/Query/FollowsAndFollowers/useQueryFollows';
import FollowsAndFollowersSkeletonLoading from '../SkeletonLoading/FollowsAndFollowersSkeletonLoading';
import ListItem from './ListItem';

const Follows: VFC = () => {
  const { follows, followsLoading, authEmail } = useQueryFollows();

  if (follows?.length === 0 || followsLoading) {
    return <FollowsAndFollowersSkeletonLoading />;
  }

  if (follows === undefined) {
    return <p>エラー</p>;
  }

  if (follows === null) {
    return <p>フォローしているユーザーいません</p>;
  }

  return (
    <div className="md:max-w-xl lg:max-w-2xl">
      {follows.map((user) => {
        return <ListItem key={user.email} user={user} email={authEmail} />;
      })}
    </div>
  );
};

export default memo(Follows);
