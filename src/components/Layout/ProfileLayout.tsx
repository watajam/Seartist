import React, { memo } from "react";
import PostBottomNavigation from "../BottomNavigation/PostBottomNavigation";
import PostAndProfileHeader from "../Header/PostAndProfileHeader.tsx";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <PostAndProfileHeader />
      <PostBottomNavigation />
      <div className="py-20">{props.children}</div>
    </div>
  );
};

export default memo(ProfileLayout);
