import React, { VFC } from 'react';
import FollowAndFollowerSkeletonLoadingItem from './FollowAndFollowerSkeletonLoadingItem';

//フォロー or フォロワーのスケルトンローディングを表示するコンポーネント
const FollowsAndFollowersSkeletonLoading: VFC = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((index) => {
        return <FollowAndFollowerSkeletonLoadingItem key={index} />;
      })}
    </div>
  );
};

export default FollowsAndFollowersSkeletonLoading;
