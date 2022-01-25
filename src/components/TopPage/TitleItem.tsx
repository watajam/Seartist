import React, { memo, VFC } from 'react';

type Props = {
  title: string;
  subTitle: string;
};

//タイトルバー
const TitleItem: VFC<Props> = (props) => {
  return (
    <header className="text-gray-700 bg-gray-400">
      <div className="container flex flex-col flex-wrap justify-center items-center p-5 mx-auto">
        <span className="mb-2 text-2xl text-white">{props.title}</span>
        <span>{props.subTitle}</span>
      </div>
    </header>
  );
};

export default memo(TitleItem);
