import React, { memo, ReactNode, VFC } from "react";
import Header from "../Header";

type Props = {
  children: ReactNode;
};

const HeaderLayout: VFC<Props> = (props) => {
  return (
    <>
      <div className="flex flex-col items-center  min-h-screen sm:bg-gray-100">
        <Header />
        <main className="px-5 py-12 w-full sm:max-w-xl sm:bg-white md:my-20 md:max-w-2xl md:shadow-lg md:rounded-2xl ">
          {props.children}
        </main>
      </div>
    </>
  );
};

export default memo(HeaderLayout);
