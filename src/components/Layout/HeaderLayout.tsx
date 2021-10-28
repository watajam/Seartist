import React, { memo, ReactNode, VFC } from "react";
import Header from "../Header";

type Props = {
  children: ReactNode;
};

const HeaderLayout: VFC<Props> = (props) => {
  return (
    <div className="min-h-screen ">
      <Header />
      <div className=" px-5 py-12">{props.children}</div>
    </div>
  );
};

export default memo(HeaderLayout);
