import React, { memo, VFC } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { useAuthGoogleLogin } from '../../../../FireBase/Authentication/useAuthGoogleLogin';

//GoogleログインForm
const GoogleLogin: VFC = () => {
  const { googleLogin } = useAuthGoogleLogin();

  return (
    <button
      onClick={googleLogin}
      className="flex justify-center py-3 pl-2 mt-4 w-full font-bold hover:bg-gray-100 rounded-xl border border-gray-400"
    >
      <FcGoogle className="text-2xl" />
      <span className="pl-2 text-2xl text-gray-400 ">Googleでログイン</span>
    </button>
  );
};

export default memo(GoogleLogin);
