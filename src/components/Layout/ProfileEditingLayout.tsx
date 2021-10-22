import React, { memo } from "react";

type Props = {
  children: React.ReactNode;
};

const ProfileEditingLayout: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="px-5  pt-28 pb-12">{props.children}</div>
    </>
  );
};

export default memo(ProfileEditingLayout);
