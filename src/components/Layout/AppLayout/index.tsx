import React, { memo } from "react";
import { BottomNavigation } from "../../BottomNavigation";
import Header from "../../Header";

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <BottomNavigation />
      <div className=" px-5  mb-14 ">{props.children}</div>
    </div>
  );
};

export default memo(AppLayout);
