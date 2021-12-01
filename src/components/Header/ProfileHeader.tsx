import React, { memo, VFC } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useAuthLogout } from '../../../FireBase/Authentication/useAuthLogout';
import { useBackPage } from '../../hooks/useBackPage';
import { IoMdArrowBack } from 'react-icons/io';

const ProfileHeader: VFC = () => {
  const { logout } = useAuthLogout();

  const { backPage } = useBackPage();

  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full bg-opacity-95 z-10 flex justify-between  md:max-w-xl lg:max-w-2xl">
      <IoMdArrowBack onClick={backPage} />
      <button onClick={logout}>
        <AiOutlineLogout />
      </button>
    </header>
  );
};

export default memo(ProfileHeader);
