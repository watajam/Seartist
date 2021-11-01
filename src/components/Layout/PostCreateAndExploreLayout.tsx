import React, { memo, ReactNode, VFC } from "react";
import BottomNavigation from "../BottomNavigation";
import Header from "../Header";

type Props = {
  children: ReactNode;
};

const PostCreateAndExploreLayout: VFC<Props> = (props) => {
  return (
    <div className="flex min-h-screen">
      <BottomNavigation />
      <div className="flex-1">
        <Header />
        <main className="px-5  pt-12 pb-20">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(PostCreateAndExploreLayout);
