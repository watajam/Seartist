import React, { memo, VFC } from 'react';
import { useAuthGuest } from '../../../../FireBase/Authentication/useAuthGuest';

//ゲストログインForm
const GuestLogin: VFC = () => {
  const { handleGuestLogin, isLoading } = useAuthGuest();

  return (
    <button
      onClick={handleGuestLogin}
      disabled={isLoading}
      className="block py-3 mt-6 w-full text-2xl font-bold text-center text-white bg-gray-400 hover:bg-gray-500 rounded-xl border"
    >
      ゲストログイン
    </button>
  );
};

export default memo(GuestLogin);
