import React, { memo } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.VFC<Props> = (props) => {
  return <div className="min-h-screen ">{props.children}</div>;
};

export default memo(Layout);
