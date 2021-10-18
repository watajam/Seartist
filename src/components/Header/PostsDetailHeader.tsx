import React, { memo } from "react";
import { IoMdArrowBack } from "react-icons/io";


const Header: React.VFC = () => {
  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full z-10">
      <IoMdArrowBack />
    </header>
  );
};

export default memo(Header);
