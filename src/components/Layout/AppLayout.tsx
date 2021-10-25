import React, { memo } from "react";
import { PostBottomNavigation } from "../BottomNavigation/PostBottomNavigation";
import AppHeader from "../Header/AppHeader";

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <PostBottomNavigation />
      <div className="px-5  py-20">{props.children}</div>
    </div>
  );
};

export default memo(AppLayout);
