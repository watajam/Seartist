import React, { memo, ReactNode, VFC } from 'react';
import BottomNavigation from '../BottomNavigation';
import PostDetailHeader from '../Header/PostDetailHeader';

type Props = {
  children: ReactNode;
};

//利用規約とプライバシーポリシーのレイアウト
const TermsOfUseAndPrivacyPolicyLayout: VFC<Props> = (props) => {
  return (
    <div className="flex  min-h-screen md:justify-center md:bg-gray-100">
      <BottomNavigation />
      <div className="flex-1 md:max-w-xl lg:max-w-2xl md:bg-white">
        <PostDetailHeader />
        <main className="py-20 pb-36 px-4">{props.children}</main>
      </div>
    </div>
  );
};

export default memo(TermsOfUseAndPrivacyPolicyLayout);
