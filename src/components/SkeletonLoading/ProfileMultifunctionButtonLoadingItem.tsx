import React, { VFC } from 'react';

//プロフィールに表示しているボタンのスケルトンローディング
const ProfileMultifunctionButtonLoadingItem: VFC = () => {
  return (
    <div className="animate-pulse">
      <div className="p-4 mt-6 bg-gray-400"></div>
    </div>
  );
};

export default ProfileMultifunctionButtonLoadingItem;
