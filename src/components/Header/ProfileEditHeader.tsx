import React, { memo, VFC } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import Link from 'next/link';

//プロフィール編集画面の際に使用するヘッダー
const ProfileEditHeader: VFC = () => {
  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full z-10 flex justify-between top-0">
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
