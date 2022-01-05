import React, { VFC } from 'react';

const FollowAndFollowerSkeletonLoadingItem: VFC = () => {
  return (
    <div className="animate-pulse border-b-2 flex items-center justify-between h-12">
      <div className="flex items-center">
        <div className="w-9 h-9 ml-3 mr-5 bg-gray-300 rounded-full" />

        <div className="flex flex-col">
          <h1 className="h-4 mb-1 w-14 bg-gray-300 rounded-2xl"></h1>

          <h3 className="h-4  w-16 bg-gray-300 rounded-2xl"></h3>
        </div>
      </div>
      <span className="h-4 w-[4rem] bg-gray-300    mr-2  p-4 rounded-2xl "></span>
    </div>
  );
};

export default FollowAndFollowerSkeletonLoadingItem;
