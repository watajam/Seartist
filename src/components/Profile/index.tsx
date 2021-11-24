import React, { memo, useCallback, useState, VFC } from 'react';
import { UserData } from '../../../types/UserData';
import ProfileUser from './ProfileUser';
import ProfilePost from './ProfilePost';
import ProfileTab from './ProfileTab';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/useQueryUserEmailCheck';
import { useQueryProfileUserInfoSetLoading } from '../../../FireBase/Query/useQueryProfileUserInfoSetLoading';
import { useQuerProfilePostSetLoading } from '../../../FireBase/Query/useQuerProfilePostSetLoading';

type Props = {
  user: UserData;
  postsLength: number;
};

const Profile: VFC<Props> = (props) => {
  const { user, userLoading } = useQueryProfileUserInfoSetLoading();
  const { posts, postsLoading } = useQuerProfilePostSetLoading(user);
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
        <ProfileUser user={props.user} postsLength={props.postsLength} />
      </div>

      {/* タブ */}
      <div className="mt-6 flex">
        <ProfileTab user={props.user} handleChengePage={handleChengePage} chengePage={chengePage} />
      </div>

      {/* プロフィール投稿 */}
      <div className="px-5 mt-4 grid gap-6  md:max-w-xl lg:max-w-2xl">
        <ProfilePost posts={posts} user={user} userLoading={userLoading} postsLoading={postsLoading} />
      </div>
    </>
  );
};

export default memo(Profile);
