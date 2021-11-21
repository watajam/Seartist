import React, { memo, VFC } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useAuthLogout } from '../../../FireBase/Authentication/useAuthLogout';

const ProfileHeader: VFC = () => {
  const { logout } = useAuthLogout();

  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full bg-opacity-95 z-10 flex justify-between  md:max-w-xl lg:max-w-2xl">
      Seartist
      <button onClick={logout}>
        <AiOutlineLogout />
      </button>
    </header>
  );
};

export default memo(ProfileHeader);
