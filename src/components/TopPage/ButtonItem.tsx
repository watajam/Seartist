import React, { memo, VFC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuthGoogleLogin } from '../../../FireBase/Authentication/useAuthGoogleLogin';
import { useAuthGuest } from '../../../FireBase/Authentication/useAuthGuest';
import Link from 'next/link';

//各ログインボタン
const ButtonItem: VFC = () => {
  const { googleLogin } = useAuthGoogleLogin();
  const { login } = useAuthGuest();
  return (
    <div className="text-gray-600 body-font bg-orange-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <div className="flex flex-wrap justify-center w-full  py-10 ">
          <Link href="/login">
            <a className="mb-8 inline-flex text-white bg-yellow-500 border-0 py-3  focus:outline-none hover:bg-yellow-600 rounded text-lg w-full  md:w-3/12 justify-center">
              新規登録 / ログイン
            </a>
          </Link>

          <button
            onClick={googleLogin}
            className="mb-8 inline-flex text-white bg-gray-400 border-0 py-3  focus:outline-none hover:bg-gray-500 rounded text-lg w-full md:w-3/12 md:ml-16 justify-center"
          >
            <FcGoogle />
            <span className="pl-2">Googleでログイン</span>
          </button>
          <button
            onClick={login}
            className="mb-8 inline-flex text-white bg-yellow-500 border-0 py-3 focus:outline-none hover:bg-yellow-600 rounded text-lg w-full md:w-3/12 md:ml-16 justify-center"
          >
            ゲストログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ButtonItem);
