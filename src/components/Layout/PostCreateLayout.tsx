import React, { memo } from "react";
import { BottomNavigation } from "../BottomNavigation";
import Header from "../Header";
import AppHeader from "../Header/AppHeader";

type Props = {
  children: React.ReactNode;
};

const PostCreateLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <Header />
      <BottomNavigation />
      <div className="px-5  py-12">{props.children}</div>
    </div>
  );
};

export default memo(PostCreateLayout);
