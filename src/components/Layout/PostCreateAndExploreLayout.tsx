import React, { memo, ReactNode, VFC } from "react";
import BottomNavigation from "../BottomNavigation";
import Header from "../Header";

type Props = {
  children: ReactNode;
};

const PostCreateAndExploreLayout: VFC<Props> = (props) => {
  return (
    <div className="min-h-screen">
      <Header />
      <BottomNavigation />
      <div className="px-5  pt-12 pb-20">{props.children}</div>
    </div>
  );
};

export default memo(PostCreateAndExploreLayout);
