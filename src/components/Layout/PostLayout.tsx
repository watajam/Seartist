import React, { memo, ReactNode, VFC } from "react";
import PostBottomNavigation from "../BottomNavigation/PostBottomNavigation";
import PostHeader from "../Header/PostHeader";

type Props = {
  children: ReactNode;
};

const PostLayout: VFC<Props> = (props) => {
  return (
    <div className="flex  min-h-screen md:justify-center md:bg-gray-100">
      <PostBottomNavigation />
      <div className="flex-1 md:max-w-xl md:bg-white lg:max-w-2xl">
        <PostHeader />
        <main className="px-5  py-20">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(PostLayout);
