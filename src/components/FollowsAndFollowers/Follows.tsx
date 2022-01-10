import { memo, VFC } from 'react';
import { useQueryFollows } from '../../../FireBase/Query/FollowsAndFollowers/useQueryFollows';
import FollowsAndFollowersSkeletonLoading from '../SkeletonLoading/FollowsAndFollowersSkeletonLoading';
import ListItem from './ListItem';

//フォロー一覧のリスト
const Follows: VFC = () => {
  const { follows, followsLoading, error, authEmail } = useQueryFollows();

  if (followsLoading) {
    return <FollowsAndFollowersSkeletonLoading />;
  }

  if (error) {
    return <p>{error}</p>;
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
