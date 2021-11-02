import React, { memo, VFC } from "react";
import { IoMdArrowBack } from "react-icons/io";

const PostDetailHeader: VFC = () => {
  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full z-10 md:max-w-xl lg:max-w-2xl">
      <IoMdArrowBack />
    </header>
  );
};

export default memo(PostDetailHeader);
