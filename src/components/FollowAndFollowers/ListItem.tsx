import React, { memo, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import Link from 'next/link';

type Props = {
  // post: Omit<PostData, `email`>;
  // user: Pick<UserData, 'userId' | 'name' | 'image' | 'email'>;
};

const ListItem: VFC<Props> = (props) => {
  return (
    <div className="border-b-2 flex items-center justify-between h-12">
      <Link href={`/profile/${1}`}>
        {/* <Link href={`/profile/${props.user?.userId}`}> */}
        <a className="flex items-center">
          <HiUserCircle className="w-10 h-10 ml-2 mr-5 " />
          {/* {props.user?.image !== '' ? (
            <img src={props.user?.image} className="w-8 h-8 rounded-full" />
          ) : (
            <HiUserCircle className="w-8 h-8" />
          )} */}
          <div className="flex flex-col">
            <h1 className="font-bold">{'岡本航'}</h1>
            {/* <h1 className="">{props.user?.name}</h1> */}

            <h3 className="text-gray-400">@{'seartist'}</h3>
          </div>
        </a>
      </Link>
      <button className="text-white text-base font-bold mr-2 bg-orange-300 p-2 rounded-full">フォロー</button>
      {/* またはフォロー中 */}
    </div>
  );
};

export default memo(ListItem);
