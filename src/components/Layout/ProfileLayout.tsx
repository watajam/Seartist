import React, { memo, ReactNode, VFC } from 'react';
import PostBottomNavigation from '../BottomNavigation/PostBottomNavigation';
import ProfileHeader from '../Header/ProfileHeader';

type Props = {
  children: ReactNode;
  openModal: () => void;
};

//プロフィール画面のレイアウト
const ProfileLayout: VFC<Props> = (props) => {
  return (
    <div className="flex  min-h-screen md:justify-center md:bg-gray-100">
      <PostBottomNavigation />
      <div className="flex-1 md:max-w-xl  lg:max-w-2xl md:bg-white">
        <ProfileHeader openModal={props.openModal} />
        <main className="py-20 pb-36">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(ProfileLayout);
