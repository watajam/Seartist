import React, { VFC } from 'react';

const ProfileEditSkeletonLoadingItem: VFC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-400  mt-6 p-4 "></div>
    </div>
  );
};

export default ProfileEditSkeletonLoadingItem;
