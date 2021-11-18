import React, { memo, ReactNode, VFC } from 'react';
import BottomNavigation from '../BottomNavigation';
import PostDetailHeader from '../Header/PostDetailHeader';

type Props = {
  children: ReactNode;
};

const ProfileEditLayout: VFC<Props> = (props) => {
  return (
    <div className="flex  min-h-screen md:justify-center md:bg-gray-100">
      <BottomNavigation />
      <div className="flex-1 md:max-w-xl lg:max-w-2xl md:bg-white">
        <PostDetailHeader />
        <main>{props.children}</main>
      </div>
    </div>
  );
};

export default memo(ProfileEditLayout);
