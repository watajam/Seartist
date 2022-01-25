import React, { memo, VFC } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useBackPage } from '../../hooks/useBackPage';

//投稿詳細画面の際に使用するヘッダー
const PostDetailHeader: VFC = () => {
  const { backPage } = useBackPage();

  return (
    <header className="fixed z-10 py-3 px-4 w-full text-4xl font-bold text-white bg-orange-300 md:max-w-xl lg:max-w-2xl">
      <IoMdArrowBack onClick={backPage} />
    </header>
  );
};

export default memo(PostDetailHeader);
