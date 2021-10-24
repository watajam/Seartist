import React, { memo } from "react";

const FormProfileTitle: React.VFC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center text-orange-300 ">
        プロフィール登録
      </h1>
    </>
  );
};

export default memo(FormProfileTitle);
