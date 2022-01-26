import React, { memo, VFC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuthGoogleLogin } from '../../../FireBase/Authentication/useAuthGoogleLogin';
import { useAuthGuest } from '../../../FireBase/Authentication/useAuthGuest';
import Link from 'next/link';

//各ログインボタン
const ButtonItem: VFC = () => {
  const { handleGoogleLogin, isLoading: googleLoading } = useAuthGoogleLogin();
  const { handleGuestLogin, isLoading: guestLoading } = useAuthGuest();
  return (
    <div className="text-gray-600 bg-orange-200">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <div className="flex flex-wrap justify-center py-10 w-full">
          <Link href="/login">
            <a className="inline-flex justify-center py-3 mb-8 w-full text-lg text-white bg-yellow-500 hover:bg-yellow-600 rounded border-0 focus:outline-none md:w-3/12">
              新規登録 / ログイン
            </a>
          </Link>

          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="inline-flex justify-center py-3 mb-8 w-full text-lg text-white bg-gray-400 hover:bg-gray-500 rounded border-0 focus:outline-none md:ml-16 md:w-3/12"
          >
            <FcGoogle />
            <span className="pl-2">Googleでログイン</span>
          </button>
          <button
            onClick={handleGuestLogin}
            disabled={guestLoading}
            className="inline-flex justify-center py-3 mb-8 w-full text-lg text-white bg-yellow-500 hover:bg-yellow-600 rounded border-0 focus:outline-none md:ml-16 md:w-3/12"
          >
            ゲストログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ButtonItem);
