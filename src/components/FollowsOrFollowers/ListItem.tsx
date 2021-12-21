import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import Link from 'next/link';
import { UserData } from '../../../types/UserData';

type Props = {
  user: Pick<UserData, 'userId' | 'name' | 'image' | 'email'> & { followingFlag: boolean };
};

const ListItem: VFC<Props> = (props) => {
  return (
    <div className="border-b-2 flex items-center justify-between h-12">
      <Link href={`/profile/${props.user?.userId}`}>
        <a className="flex items-center w-3/4">
          {props.user?.image !== '' ? (
            <img src={props.user?.image} className="w-9 h-9 rounded-full ml-3 mr-5" />
          ) : (
            <HiUserCircle className="w-10 h-10 ml-2 mr-5 " />
          )}
          <div className="flex flex-col">
            <h1 className="font-bold">{props.user?.name}</h1>

            <h3 className="text-gray-400">@{props.user?.userId}</h3>
          </div>
        </a>
      </Link>
      <button
        className={`text-white text-base font-bold mr-2  p-2 rounded-full ${
          props.user?.followingFlag === true ? 'bg-gray-400' : 'bg-orange-300'
        }`}
      >
        {props.user?.followingFlag === true ? 'フォロー中' : 'フォローする'}
      </button>
    </div>
  );
};

export default memo(ListItem);
