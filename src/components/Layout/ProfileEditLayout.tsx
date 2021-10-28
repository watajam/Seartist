import React, { memo, ReactNode, VFC } from "react";
import BottomNavigation from "../BottomNavigation";

type Props = {
  children: ReactNode;
};

const ProfileEditLayout: VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <BottomNavigation />
      {props.children}
    </div>
  );
};

export default memo(ProfileEditLayout);
