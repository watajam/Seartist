import React, { VFC } from 'react';
import SkeletonLoadingItem from './SkeletonLoadingItem';

const SkeletonLoading: VFC = () => {
  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {[1, 2, 3, 4, 5].map((index) => {
        return <SkeletonLoadingItem key={index} />;
      })}
    </div>
  );
};

export default SkeletonLoading;
