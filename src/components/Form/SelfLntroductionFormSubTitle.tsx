import React, { memo } from "react";

const SelfLntroductionFormSubTitle: React.VFC = () => {
  return (
    <>
      <p className="text-base font-bold text-center text-gray-400 underline mt-6">
        URLを入力するとプロフィールに表示されます
      </p>
    </>
  );
};

export default memo(SelfLntroductionFormSubTitle);
