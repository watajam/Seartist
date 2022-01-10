import React, { memo, VFC } from 'react';

//ホーム画面の際に使用するヘッダー
const PostHeader: VFC = () => {
  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full bg-opacity-95 z-10  md:max-w-xl lg:max-w-2xl">
      Seartist
    </header>
  );
};

export default memo(PostHeader);
