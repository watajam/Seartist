import React, { memo, ReactNode, VFC } from 'react';
import BottomNavigation from '../BottomNavigation';
import PostDetailHeader from '../Header/PostDetailHeader';

type Props = {
  children: ReactNode;
};

//投稿詳細画面のレイアウト
const PostDetailLayout: VFC<Props> = (props) => {
  return (
    <div className="flex min-h-screen md:justify-center md:bg-gray-100">
      <BottomNavigation />
      <div className="flex-1 md:max-w-xl md:bg-white lg:max-w-2xl">
        <PostDetailHeader />
        <main className="py-20 px-5">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(PostDetailLayout);
