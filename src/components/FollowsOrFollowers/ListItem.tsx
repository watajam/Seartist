import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import Link from 'next/link';
import { UserData } from '../../../types/UserData';
import { useUpdateFollow } from '../../../FireBase/Mutation/Update/useUpdateFollow';
import { useUpdateUnfollow } from '../../../FireBase/Mutation/Update/useUpdateUnfollow';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';

type Props = {
  user: Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'> & { followingFlag: boolean };
  email: string;
};

const ListItem: VFC<Props> = (props) => {
  const { updateFollow } = useUpdateFollow();
  const { updateUnfollow } = useUpdateUnfollow();
  const { userEmail } = useRecoilSetEmail();

  return (
    <div className="border-b-2 flex items-center justify-between h-12">
      <Link href={`/profile/${props.user?.userId}`}>
        <a className={`flex items-center ${props.email === userEmail?.email ? 'w-4/6' : 'w-full'}  `}>
          {props.user?.profilePhoto !== '' ? (
            <img src={props.user?.profilePhoto} className="w-8 h-8 rounded-full ml-3 mr-6" />
          ) : (
            <HiUserCircle className="w-10 h-10 ml-2 mr-5 " />
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
            props.user?.followingFlag === true
              ? () => updateUnfollow(props.user?.email)
              : () => updateFollow(props.user?.email)
          }
          className={`text-white text-base font-bold mr-2  p-2 rounded-full ${
            props.user?.followingFlag === true ? 'bg-gray-400' : 'bg-orange-300'
          }`}
        >
          {props.user?.followingFlag === true ? 'フォロー中' : 'フォローする'}
        </button>
      ) : null}
    </div>
  );
};

export default memo(ListItem);
