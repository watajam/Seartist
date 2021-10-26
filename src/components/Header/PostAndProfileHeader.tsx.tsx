import React, { memo } from "react";

const PostAndProfileHeader: React.VFC = () => {
  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full bg-opacity-95 z-10">
      Seartist
    </header>
  );
};

export default memo(PostAndProfileHeader);
