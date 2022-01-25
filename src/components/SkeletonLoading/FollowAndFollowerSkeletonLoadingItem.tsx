import React, { VFC } from 'react';

//フォロー or フォロワーのスケルトンローディング
const FollowAndFollowerSkeletonLoadingItem: VFC = () => {
  return (
    <div className="flex justify-between items-center h-12 border-b-2 animate-pulse">
      <div className="flex items-center">
        <div className="mr-5 ml-3 w-9 h-9 bg-gray-300 rounded-full" />

        <div className="flex flex-col">
          <h1 className="mb-1 w-14 h-4 bg-gray-300 rounded-2xl"></h1>

          <h3 className="w-16 h-4 bg-gray-300 rounded-2xl"></h3>
        </div>
      </div>
      <span className="p-4 mr-2 w-[4rem] h-4 bg-gray-300 rounded-2xl"></span>
    </div>
  );
};

export default FollowAndFollowerSkeletonLoadingItem;
