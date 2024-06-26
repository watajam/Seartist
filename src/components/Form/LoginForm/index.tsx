import React, { memo, useCallback, useState, VFC } from 'react';

import MailLogin from './EmailLogin';
import GuestLogin from './GuestLogin';
import GoogleLogin from './GoogleLogin';

//アカウント作成フォーム
const LoginForm: VFC = () => {
  const [isLogin, setIsLogin] = useState(true);

  //ログインと新規作成の切り替え
  const handleIsLogin = useCallback(() => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-orange-300 sm:text-4xl">
        {isLogin ? 'ログイン' : 'アカウント作成'}
      </h1>
      {/* メールログイン */}
      <MailLogin isLogin={isLogin} handleIsLogin={handleIsLogin} />
      <hr className="mt-8 border-gray-400" />
      <h3 className="mt-4 text-base text-center text-gray-400 ">他の方法でログイン</h3>
      {/* Googleログイン */}
      <GoogleLogin />
      {/* ゲストログイン */}
      <GuestLogin />
    </>
  );
};

export default memo(LoginForm);
