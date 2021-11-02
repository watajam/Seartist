import React, { memo, ReactNode, VFC } from "react";
import PostBottomNavigation from "../BottomNavigation/PostBottomNavigation";
import ProfileHeader from "../Header/ProfileHeader";

type Props = {
  children: ReactNode;
};

const ProfileLayout: VFC<Props> = (props) => {
  return (
    <div className="flex  min-h-screen md:justify-center md:bg-gray-100">
      <PostBottomNavigation />
      <div className="md:max-w-xl lg:max-w-2xl md:bg-white">
        <ProfileHeader />
        <main className="py-20">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(ProfileLayout);
