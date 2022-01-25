import React, { memo, VFC } from 'react';

//ホーム画面の際に使用するヘッダー
const PostHeader: VFC = () => {
  return (
    <header className="fixed z-10 py-3 px-4 w-full text-4xl font-bold text-white bg-orange-300 md:max-w-xl lg:max-w-2xl">
      Seartist
    </header>
  );
};

export default memo(PostHeader);
