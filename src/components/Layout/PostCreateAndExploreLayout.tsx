import React, { memo, ReactNode, VFC } from 'react';
import BottomNavigation from '../BottomNavigation';
import PostCreateAndExploreHeader from '../Header/PostCreateAndExploreHeader';

type Props = {
  children: ReactNode;
};

//投稿検索画面と検索画面のレイアウト
const PostCreateAndExploreLayout: VFC<Props> = (props) => {
  return (
    <div className="flex min-h-screen md:justify-center md:bg-gray-100">
      <BottomNavigation />
      <div className="flex-1 md:max-w-xl md:bg-white lg:max-w-2xl">
        <PostCreateAndExploreHeader />
        <main className="px-5 pt-12 pb-20">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(PostCreateAndExploreLayout);
