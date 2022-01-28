import React, { memo, VFC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuthGoogleLogin } from '../../../FireBase/Authentication/useAuthGoogleLogin';
import { useAuthGuest } from '../../../FireBase/Authentication/useAuthGuest';
import Link from 'next/link';
import ButtonItem from './ButtonItem';

//ファーストビュー
const Hero: VFC = () => {
  const { handleGoogleLogin, isLoading: googleLoading } = useAuthGoogleLogin();
  const { handleGuestLogin, isLoading: guestLoading } = useAuthGuest();
  return (
    <section className="text-gray-600 bg-orange-200">
      <div className="container flex flex-col items-center py-24 px-5 mx-auto md:flex-row">
        <div className="flex flex-col items-center mb-16 text-center md:items-start md:pr-16 md:mb-0 md:w-1/2 md:text-left lg:grow lg:pr-24 ">
          <p className="mb-1 text-xs leading-relaxed">アーティスト・イベント検索アプリ</p>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
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
                <a className="inline-flex justify-center py-2 px-6 text-lg text-white bg-yellow-500 hover:bg-yellow-600 rounded border-0 focus:outline-none md:mb-6 md:w-full xl:w-auto">
                  新規登録 / ログイン
                </a>
              </Link>
              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="inline-flex justify-center py-2 px-6 text-lg text-white bg-gray-400 hover:bg-gray-500 rounded border-0 focus:outline-none md:mb-6 md:w-full xl:ml-4 xl:w-auto"
              >
                <FcGoogle />
                <span className="pl-2">Googleでログイン</span>
              </button>
              <button
                onClick={handleGuestLogin}
                disabled={guestLoading}
                className="inline-flex justify-center py-2 px-6 text-lg text-white bg-yellow-500 hover:bg-yellow-600 rounded border-0 focus:outline-none md:mb-6 md:w-full xl:ml-4 xl:w-auto"
              >
                ゲストログイン
              </button>
            </div>
          </div>
        </div>
        <div className="lg:max-w-lg">
          <img className="object-cover object-center rounded" alt="hero" src="/profilePage.png" />
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
