import React, { memo } from "react";

type Props = {
  title: string;
};

const FormProfileTitle: React.VFC<Props> = (props) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center text-orange-300 ">
        {props.title}
      </h1>
    </>
  );
};

export default memo(FormProfileTitle);
