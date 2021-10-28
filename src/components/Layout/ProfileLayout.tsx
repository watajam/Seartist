import React, { memo, ReactNode, VFC } from "react";
import PostBottomNavigation from "../BottomNavigation/PostBottomNavigation";
import ProfileHeader from "../Header/ProfileHeader";

type Props = {
  children: ReactNode;
};

const ProfileLayout: VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <ProfileHeader />
      <PostBottomNavigation />
      <div className="py-20">{props.children}</div>
    </div>
  );
};

export default memo(ProfileLayout);
