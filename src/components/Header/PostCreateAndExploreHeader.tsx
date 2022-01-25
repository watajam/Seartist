import React, { memo, VFC } from 'react';

//投稿検索画面と検索画面の際に使用するヘッダー
const PostCreateAndExploreHeader: VFC = () => {
  return <header className="py-3 px-4 w-full text-4xl font-bold text-white bg-orange-300">Seartist</header>;
};

export default memo(PostCreateAndExploreHeader);
