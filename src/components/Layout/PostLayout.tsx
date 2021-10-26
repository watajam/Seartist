import React, { memo } from "react";
import PostBottomNavigation from "../BottomNavigation/PostBottomNavigation";
import PostAndProfileHeader from "../Header/PostAndProfileHeader.tsx";

type Props = {
  children: React.ReactNode;
};

const PostLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <PostAndProfileHeader />
      <PostBottomNavigation />
      <div className="px-5  py-20">{props.children}</div>
    </div>
  );
};

export default memo(PostLayout);
