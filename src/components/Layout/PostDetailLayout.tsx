import React, { memo, ReactNode, VFC } from "react";
import BottomNavigation from "../BottomNavigation";
import PostDetailHeader from "../Header/PostDetailHeader";

type Props = {
  children: ReactNode;
};

const PostDetailLayout: VFC<Props> = (props) => {
  return (
    <div className="flex min-h-screen">
      <BottomNavigation />
      <div className="flex-1">
        <PostDetailHeader />
        <main className="px-5  py-20">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(PostDetailLayout);
