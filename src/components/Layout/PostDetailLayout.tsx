import React, { memo, ReactNode, VFC } from "react";
import BottomNavigation from "../BottomNavigation";
import PostDetailHeader from "../Header/PostDetailHeader";

type Props = {
  children: ReactNode;
};

const PostDetailLayout: VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <PostDetailHeader />
      <BottomNavigation />
      <div className="px-5  py-20">{props.children}</div>
    </div>
  );
};

export default memo(PostDetailLayout);
