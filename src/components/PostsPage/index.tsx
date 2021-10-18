import React, { memo } from "react";
import { ListItem } from "../Posts/ListItem";


export const Posts: React.VFC = () => {
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

export default memo(Posts);
