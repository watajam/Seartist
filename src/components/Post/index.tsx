import React, { memo } from "react";
import { ListItem } from "./ListItem";

const Post: React.VFC = () => {
  return (
    <div className="grid gap-6 ">
      {/* テスト */}
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
  );
};

export default memo(Post);
