import React, { memo } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.VFC<Props> = (props) => {
  return <div className="min-h-screen px-5 py-12  ">{props.children}</div>;
};

export default memo(Layout);
