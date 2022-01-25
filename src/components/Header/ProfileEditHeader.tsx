import React, { memo, VFC } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import Link from 'next/link';

//プロフィール編集画面の際に使用するヘッダー
const ProfileEditHeader: VFC = () => {
  return (
    <header className="flex fixed top-0 z-10 justify-between py-3 px-4 w-full text-4xl font-bold text-white bg-orange-300">
      <Link href="/profile/1">
        <a>
          <IoMdArrowBack />
        </a>
      </Link>
      <button>保存</button>
    </header>
  );
};

export default memo(ProfileEditHeader);
