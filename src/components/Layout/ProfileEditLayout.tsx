import React, { memo, ReactNode, VFC } from "react";
import BottomNavigation from "../BottomNavigation";
import PostDetailHeader from "../Header/PostDetailHeader";

type Props = {
  children: ReactNode;
};

const ProfileEditLayout: VFC<Props> = (props) => {
  return (
    <div className="flex min-h-screen">
      <BottomNavigation />
      <main className="flex-1">
        <PostDetailHeader />
        {props.children}
      </main>
    </div>
  );
};

export default memo(ProfileEditLayout);
