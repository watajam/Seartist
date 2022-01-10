import React, { memo, useCallback, useState, VFC } from 'react';
import { UserData } from '../../../types/UserData';
import ProfileUser from './ProfileUser';
import ProfilePost from './ProfilePost';
import ProfileLikePost from './ProfileLikePost';
import ProfileTab from './ProfileTab';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/User/useQueryUserEmailCheck';

type Props = {
  user: UserData;
};

//プロフィール画面
const Profile: VFC<Props> = (props) => {
  useQueryUserEmailCheck();
  const [chengePage, setChengePage] = useState(true);

  const handleChengePage = useCallback(() => {
    setChengePage((prevChengePage) => {
      return !prevChengePage;
    });
  }, []);

  return (
    <>
      {/* プロフィール */}
      <div className="px-5">
        <ProfileUser user={props.user} />
      </div>

      {/* タブ */}
      <div className="mt-6 flex">
        <ProfileTab user={props.user} handleChengePage={handleChengePage} chengePage={chengePage} />
      </div>

      {/* プロフィール投稿といいねした投稿 */}
      <div className="px-5 mt-4 grid gap-6  md:max-w-xl lg:max-w-2xl">
        {props.user?.genre === '' ? <ProfileLikePost /> : chengePage === true ? <ProfilePost /> : <ProfileLikePost />}
      </div>
    </>
  );
};

export default memo(Profile);
