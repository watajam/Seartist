import React, { memo, VFC } from 'react';
import { UserData } from '../../../types/UserData';
import ProfileUser from './ProfileUser';
import ProfilePost from './ProfilePost';
import ProfileLikePost from './ProfileLikePost';
import ProfileTab from './ProfileTab';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/User/useQueryUserEmailCheck';
import { useHandleChenge } from '../../hooks/useHandleChenge';

type Props = {
  user: UserData;
  error: string;
};

//プロフィール画面
const Profile: VFC<Props> = (props) => {
  const { chenge, handleChenge } = useHandleChenge();
  useQueryUserEmailCheck();

  if (props.error) return <div className="text-xl font-bold text-center">ユーザーが見つかりません</div>;

  return (
    <>
      {/* プロフィール */}
      <div className="px-5">
        <ProfileUser user={props.user} status={props.error} />
      </div>

      {/* タブ */}
      <div className="flex mt-6">
        <ProfileTab user={props.user} handleChengePage={handleChenge} chengePage={chenge} />
      </div>

      {/* プロフィール投稿といいねした投稿 */}
      <div className="grid gap-6 px-5 mt-4 md:max-w-xl lg:max-w-2xl">
        {props.user?.genre === '' ? <ProfileLikePost /> : chenge === true ? <ProfilePost /> : <ProfileLikePost />}
      </div>
    </>
  );
};

export default memo(Profile);
