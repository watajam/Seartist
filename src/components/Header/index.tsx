import React, { memo, VFC } from "react";

const Header: VFC = () => {
  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300">
      Seartist
    </header>
  );
};

export default memo(Header);
