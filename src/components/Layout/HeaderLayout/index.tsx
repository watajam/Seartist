import React, { memo } from "react";
import Header from "../../Header";

type Props = {
  children: React.ReactNode;
};

const HeaderLayout: React.VFC<Props> = (props) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className=" px-5 py-12  ">{props.children}</div>;
    </div>
  );
};

export default memo(HeaderLayout);
