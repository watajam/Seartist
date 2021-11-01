import React, { memo, ReactNode, VFC } from "react";
import PostBottomNavigation from "../BottomNavigation/PostBottomNavigation";
import ProfileHeader from "../Header/ProfileHeader";

type Props = {
  children: ReactNode;
};

const ProfileLayout: VFC<Props> = (props) => {
  return (
    <div className="flex min-h-screen">
      <PostBottomNavigation />
      <div className="flex-1">
        <ProfileHeader />
        <main className="py-20">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(ProfileLayout);
