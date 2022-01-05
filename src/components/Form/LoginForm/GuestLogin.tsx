import React, { memo, VFC } from 'react';
import { useAuthGuest } from '../../../../FireBase/Authentication/useAuthGuest';

const GuestLogin: VFC = () => {
  const { login } = useAuthGuest();

  return (
    <button onClick={login} className="border block text-center w-full  mt-6  py-3 font-bold  text-2xl text-white rounded-xl bg-gray-400 hover:bg-gray-500">
      ゲストログイン
    </button>
  );
};

export default memo(GuestLogin);
