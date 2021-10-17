import React, { memo } from "react";

const Header: React.VFC = () => {
  return (
    <header className="px-4 py-2 text-4xl font-bold text-white bg-orange-300 h-14 fixed w-full bg-opacity-90">
      Seartist
    </header>
  );
};

export default memo(Header);
