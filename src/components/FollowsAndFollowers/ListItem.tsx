import React, { memo, useState, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import Link from 'next/link';
import { UserData } from '../../../types/UserData';
import { useUpdateFollow } from '../../../FireBase/Mutation/Update/useUpdateFollow';
import { useUpdateUnfollow } from '../../../FireBase/Mutation/Update/useUpdateUnfollow';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';

type Props = {
  user: Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email' | 'followingFlag'> & { followingFlag: boolean };
  email: string;
};

//フォロー or フォロワーのリストアイテム
const ListItem: VFC<Props> = (props) => {
  const [followOrUnFollowFlag, setFollowOrUnFollowFlag] = useState(null);
  const { updateFollow } = useUpdateFollow(setFollowOrUnFollowFlag);
  const { updateUnfollow } = useUpdateUnfollow(setFollowOrUnFollowFlag);
  const { userEmail } = useRecoilSetEmail();

  return (
    <div className="flex justify-between items-center h-12 border-b-2">
      <Link href={`/profile/${props.user?.userId}`}>
        <a className={`flex items-center ${props.email === userEmail?.email ? 'w-4/6' : 'w-full'}  `}>
          {props.user?.profilePhoto !== '' ? (
            <img src={props.user?.profilePhoto} className="mr-6 ml-3 w-8 h-8 rounded-full" />
          ) : (
            <HiUserCircle className="mr-5 ml-2 w-10 h-10" />
          )}
          <div className="flex flex-col">
            <h1 className="font-bold">{props.user?.name}</h1>

            <h3 className="text-gray-400">@{props.user?.userId}</h3>
          </div>
        </a>
      </Link>
      {props.email === userEmail?.email ? (
        <button
          onClick={
            props.user.followingFlag && followOrUnFollowFlag === null
              ? () => updateUnfollow(props.user.email)
              : !props.user.followingFlag && followOrUnFollowFlag === null
              ? () => updateFollow(props.user.email)
              : followOrUnFollowFlag
              ? () => updateUnfollow(props.user.email)
              : () => updateFollow(props.user.email)
          }
          className={`text-white text-base font-bold mr-2  p-2 rounded-full ${
            props.user?.followingFlag && followOrUnFollowFlag === null
              ? 'bg-gray-400'
              : !props.user.followingFlag && followOrUnFollowFlag === null
              ? 'bg-orange-300'
              : followOrUnFollowFlag
              ? 'bg-gray-400'
              : 'bg-orange-300'
          }`}
        >
          {props.user?.followingFlag && followOrUnFollowFlag === null
            ? 'フォロー中'
            : !props.user?.followingFlag && followOrUnFollowFlag === null
            ? 'フォローする'
            : followOrUnFollowFlag
            ? 'フォロー中'
            : 'フォローする'}
        </button>
      ) : null}
    </div>
  );
};

export default memo(ListItem);
