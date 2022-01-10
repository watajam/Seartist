import React, { VFC } from 'react';
import PostSkeletonLoadingItem from './PostSkeletonLoadingItem';

//投稿のスケルトンローディングを表示するコンポーネント
const SkeletonLoading: VFC = () => {
  return (
    <div className="grid gap-6">
      {[1, 2, 3, 4, 5].map((index) => {
        return <PostSkeletonLoadingItem key={index} />;
      })}
    </div>
  );
};

export default SkeletonLoading;
