import React, { memo } from "react";
import { PostsCord } from "../PostsCord";

export const index: React.VFC = () => {
  return (
    <div className="grid gap-6 ">
      {/* テスト */}
      <PostsCord />
      <PostsCord />
      <PostsCord />
      <PostsCord />
      <PostsCord />
      <PostsCord />
      <PostsCord />
      <PostsCord />
      <PostsCord />
      <PostsCord />
    </div>
  );
};

export default memo(index);
