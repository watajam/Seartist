import React, { memo, ReactNode, VFC } from "react";
import PostBottomNavigation from "../BottomNavigation/PostBottomNavigation";
import PostHeader from "../Header/PostHeader";

type Props = {
  children: ReactNode;
};

const PostLayout: VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <PostHeader />
      <PostBottomNavigation />
      <div className="px-5  py-20">{props.children}</div>
    </div>
  );
};

export default memo(PostLayout);
