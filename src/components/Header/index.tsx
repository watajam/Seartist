import React, { memo, VFC } from 'react';
import Link from 'next/link';

//ヘッダー
const Header: VFC = () => {
  return (
    <header className="px-4 py-5 text-4xl font-bold text-white bg-orange-300 w-full ">
      <Link href="/">
        <a>Seartist</a>
      </Link>
    </header>
  );
};

export default memo(Header);
