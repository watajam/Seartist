import React, { memo, ReactNode, VFC } from 'react';
import Header from '../Header';

type Props = {
  children: ReactNode;
};

//各画面のレイアウト
const HeaderLayout: VFC<Props> = (props) => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen sm:bg-gray-100">
        <Header />
        <main className="py-12 px-5 w-full sm:max-w-xl sm:bg-white md:my-20 md:max-w-2xl md:rounded-2xl md:shadow-lg">
          {props.children}
        </main>
      </div>
    </>
  );
};

export default memo(HeaderLayout);
