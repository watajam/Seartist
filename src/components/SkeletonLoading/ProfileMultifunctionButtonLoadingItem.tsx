import React, { VFC } from 'react';

//プロフィールに表示しているボタンのスケルトンローディング
const ProfileMultifunctionButtonLoadingItem: VFC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-400  mt-6 p-4 "></div>
    </div>
  );
};

export default ProfileMultifunctionButtonLoadingItem;
