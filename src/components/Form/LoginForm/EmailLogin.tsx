import React, { memo, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuthLogin } from '../../../../FireBase/Authentication/useAuthLogin';
import { AuthFormData } from '../../../../types/AuthFormData';
import { useAuthSignup } from '../../../../FireBase/Authentication/useAuthSignup';

type Props = {
  isLogin: boolean;
  handleIsLogin: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

//メールアドレスログインForm
const EmailLogin: VFC<Props> = (props) => {
  const { handleLogin, isLoading: loginLoading } = useAuthLogin();
  const { handleSignUp, isLoading: signUpLoading } = useAuthSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    mode: 'onChange',
  });

  return (
    <>
      {/* ログイン＆新規アカウント作成のForm */}
      <form onSubmit={props.isLogin ? handleSubmit(handleLogin) : handleSubmit(handleSignUp)}>
        {/* メールアドレスのフォームとバリデーション */}
        <label htmlFor="email" className="block mt-8 text-base text-gray-400 ">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          placeholder="test@test.com"
          {...register('email', {
            required: '必須項目です。',
            pattern: {
              value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: '正しい形式で入力してください',
            },
          })}
          className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
        />

        {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
        {/* パスワードのフォームとバリデーション */}
        <label htmlFor="password" className="block mt-8 text-base text-gray-400 ">
          パスワード
        </label>
        <input
          type="password"
          id="password"
          placeholder="test29453"
          {...register('password', {
            required: '必須項目です。',
            minLength: {
              value: 6,
              message: 'パスワードは6文字数以上16文字以下で入力してください',
            },
            maxLength: {
              value: 16,
              message: 'パスワードは6文字数以上16文字以下で入力してください',
            },
          })}
          className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
        />

        {errors.password && <p className="text-red-600"> {errors.password?.message} </p>}
        <div className="mt-4 text-right">
          <Link href="/login/changepassword">
            <a className="inline-block text-base text-orange-200 hover:text-orange-400 underline cursor-pointer">
              {props.isLogin ? 'パスワードを忘れた場合' : null}
            </a>
          </Link>
        </div>
        <button
          disabled={props.isLogin ? loginLoading : signUpLoading}
          className="py-3 mt-10 w-full text-2xl font-bold text-white bg-orange-300 hover:bg-orange-400 rounded-xl border"
        >
          {props.isLogin ? 'ログイン' : 'アカウント作成'}
        </button>
      </form>
      <p
        onClick={props.handleIsLogin}
        className="mt-6 text-base text-center text-orange-200 hover:text-orange-400 underline cursor-pointer"
      >
        {props.isLogin ? 'アカウントをお持ちでない方はこちら' : '既にアカウントをお持ちですか？'}
      </p>
    </>
  );
};

export default memo(EmailLogin);
