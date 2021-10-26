import React, { memo } from "react";
import BottomNavigation from "../BottomNavigation";

type Props = {
  children: React.ReactNode;
};

const ProfileEditLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <BottomNavigation />
      {props.children}
    </div>
  );
};

export default memo(ProfileEditLayout);
