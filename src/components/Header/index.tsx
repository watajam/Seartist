import React, { memo, VFC } from 'react';
import Link from 'next/link';

//ヘッダー
const Header: VFC = () => {
  return (
    <header className="py-5 px-4 w-full text-4xl font-bold text-white bg-orange-300">
      <Link href="/">
        <a>Seartist</a>
      </Link>
    </header>
  );
};

export default memo(Header);
