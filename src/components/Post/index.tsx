import React, { memo, VFC } from "react";
import ListItem from "./ListItem";

const Post: VFC = () => {
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
