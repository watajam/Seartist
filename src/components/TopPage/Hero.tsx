import React, { memo, VFC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuthGoogleLogin } from '../../../FireBase/Authentication/useAuthGoogleLogin';
import { useAuthGuest } from '../../../FireBase/Authentication/useAuthGuest';
import Link from 'next/link';
import ButtonItem from './ButtonItem';

//ファーストビュー
const Hero: VFC = () => {
  const { googleLogin } = useAuthGoogleLogin();
  const { login } = useAuthGuest();
  return (
    <section className="text-gray-600 body-font bg-orange-200">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <p className="mb-1 text-xs leading-relaxed">アーティスト・イベント検索アプリ</p>
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
            身近なアーティストやイベントをより知ろう！
          </h1>
          <p className="mb-8 leading-relaxed">
            Seartistはアーティストやイベント主催者を応援し、沢山の方に知ってもらうために作りました！
          </p>
          <div className="sm:hidden">
            <ButtonItem />
          </div>
          <div className="hidden sm:block">
            <div className="flex justify-center md:flex-wrap  ">
              <Link href="/login">
                <a className=" md:mb-6 md:w-full xl:w-auto inline-flex justify-center text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                  新規登録 / ログイン
                </a>
              </Link>
              <button
                onClick={googleLogin}
                className="md:mb-6 md:w-full  xl:ml-4 xl:w-auto inline-flex justify-center text-white bg-gray-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded text-lg"
              >
                <FcGoogle />
                <span className="pl-2">Googleでログイン</span>
              </button>
              <button
                onClick={login}
                className="md:mb-6 md:w-full  xl:ml-4 xl:w-auto inline-flex justify-center text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
              >
                ゲストログイン
              </button>
            </div>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="/profilePage.png" />
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
