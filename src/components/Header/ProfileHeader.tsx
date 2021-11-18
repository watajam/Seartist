import { signOut } from '@firebase/auth';
import { useRouter } from 'next/dist/client/router';
import React, { memo, VFC } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { auth } from '../../../lib/firebase';

const ProfileHeader: VFC = () => {
  const router = useRouter();

  const Logout = () => {
    signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        alert('できませんでした');
      });
  };

  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full bg-opacity-95 z-10 flex justify-between  md:max-w-xl lg:max-w-2xl">
      Seartist
      <button onClick={Logout}>
        <AiOutlineLogout />
      </button>
    </header>
  );
};

export default memo(ProfileHeader);
