import React, { memo, ReactNode, VFC } from "react";
import Header from "../Header";

type Props = {
  children: ReactNode;
};

const HeaderLayout: VFC<Props> = (props) => {
  return (
    <>
      <div className="flex flex-col items-center  min-h-screen sm:bg-gray-100 ">
        <Header />
        <main className="px-5 py-12 w-full sm:mt-20 sm:max-w-xl sm:shadow-lg sm:rounded-2xl sm:bg-white">
          {props.children}
        </main>
      </div>
    </>
  );
};

export default memo(HeaderLayout);
