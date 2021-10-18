import React, { memo } from "react";
import { BottomNavigation } from "../BottomNavigation";
import PostsDetailHeader from "../Header/PostsDetailHeader";

type Props = {
  children: React.ReactNode;
};

const PostsDetailLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <PostsDetailHeader />
      <BottomNavigation />
      <div className="px-5  py-20">{props.children}</div>
    </div>
  );
};

export default memo(PostsDetailLayout);
