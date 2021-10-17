import React, { memo } from "react";
import { BottomNavigation } from "../../BottomNavigation";
import Header from "../../Header";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <Header />
      <BottomNavigation />
      <div className="pt-5 pb-20">{props.children}</div>
    </div>
  );
};

export default memo(ProfileLayout);
