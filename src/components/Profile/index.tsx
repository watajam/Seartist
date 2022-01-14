import React, { memo, VFC } from 'react';
import { UserData } from '../../../types/UserData';
import ProfileUser from './ProfileUser';
import ProfilePost from './ProfilePost';
import ProfileLikePost from './ProfileLikePost';
import ProfileTab from './ProfileTab';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/User/useQueryUserEmailCheck';
import ProfileModal from './ProfileModal';
import { useHandleChenge } from '../../hooks/useHandleChenge';

type Props = {
  user: UserData;
  handleChengeModal: () => void;
  isOpen: boolean;
};

//プロフィール画面
const Profile: VFC<Props> = (props) => {
  const { chenge, handleChenge } = useHandleChenge();
  useQueryUserEmailCheck();

  return (
    <>
      {/* プロフィール */}
      <div className="px-5">
        <ProfileUser user={props.user} />
      </div>

      {/* タブ */}
      <div className="mt-6 flex">
        <ProfileTab user={props.user} handleChengePage={handleChenge} chengePage={chenge} />
      </div>

      {/* プロフィール投稿といいねした投稿 */}
      <div className="px-5 mt-4 grid gap-6  md:max-w-xl lg:max-w-2xl">
        {props.user?.genre === '' ? <ProfileLikePost /> : chenge === true ? <ProfilePost /> : <ProfileLikePost />}
      </div>
      
      {/* プロフィールモーダル */}
      <ProfileModal handleChengeModal={props.handleChengeModal} isOpen={props.isOpen} />
    </>
  );
};

export default memo(Profile);
