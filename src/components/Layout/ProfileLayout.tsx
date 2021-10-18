import React, { memo } from "react";
import { BottomNavigation } from "../BottomNavigation";
import AppHeader from "../Header/AppHeader";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <BottomNavigation />
      <div className="py-20">{props.children}</div>
    </div>
  );
};

export default memo(ProfileLayout);
