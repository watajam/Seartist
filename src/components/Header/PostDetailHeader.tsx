import React, { memo, VFC } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useBackPage } from '../../hooks/useBackPage';

//投稿詳細画面の際に使用するヘッダー
const PostDetailHeader: VFC = () => {
  const { backPage } = useBackPage();

  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full z-10 md:max-w-xl lg:max-w-2xl">
      <IoMdArrowBack onClick={backPage} />
    </header>
  );
};

export default memo(PostDetailHeader);
