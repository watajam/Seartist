import React, { memo, VFC } from 'react';

//topPageヘッダー
const TopPageHeader: VFC = () => {
  return (
    <header className="text-gray-600 body-font bg-gray-400">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <span className="text-4xl text-white font-bold">Seartist</span>
      </div>
    </header>
  );
};

export default memo(TopPageHeader);
