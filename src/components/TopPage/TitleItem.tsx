import React, { memo, VFC } from 'react';

type Props = {
  title: string;
  subTitle: string;
};

//タイトルバー
const TitleItem: VFC<Props> = (props) => {
  return (
    <header className="text-gray-700 body-font bg-gray-400 ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col  items-center justify-center">
        <span className="text-2xl text-white mb-2">{props.title}</span>
        <span>{props.subTitle}</span>
      </div>
    </header>
  );
};

export default memo(TitleItem);
