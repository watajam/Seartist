import React, { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

type LoginFormData = {
  email: string | number;
  password: number;
};

type Props = {
  isLogin: boolean;
  handleIsLogin: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

const MailLogin: React.VFC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <>
      {/* ログイン＆アカウント作成のForm */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレスのフォームとバリデーション */}
        <label htmlFor="email" className="block mt-8 text-base text-gray-400 ">
          メールアドレス
          <input
            placeholder="メールアドレスを入力してください"
            type="email"
            {...register("email", {
              required: "必須項目です。",
              pattern: {
                value:
                  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                message: "正しい形式で入力してください",
              },
            })}
            className="w-full h-10 pl-2 mt-2 text-base border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        {errors.email && (
          <p className="text-red-600">{errors.email?.message}</p>
        )}
        {/* パスワードのフォームとバリデーション */}
        <label
          htmlFor="password"
          className="block mt-8 text-base text-gray-400 "
        >
          パスワード
          <input
            type="password"
            placeholder="パスワードを入力してください"
            {...register("password", {
              required: "必須項目です。",
              minLength: {
                value: 6,
                message: "パスワードは6文字数以上16文字以下で入力してください",
              },
              maxLength: {
                value: 16,
                message: "パスワードは6文字数以上16文字以下で入力してください",
              },
            })}
            className="w-full h-10 pl-2 mt-2 text-base border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
        {errors.password && (
          <p className="text-red-600"> {errors.password?.message} </p>
        )}
        <div className="mt-4 text-right">
          <Link href="">
            <a className="block text-base text-gray-400 underline cursor-pointer hover:text-gray-600 ">
              {props.isLogin ? "パスワードを忘れた場合" : null}
            </a>
          </Link>
        </div>
        <button className="w-full py-3 mt-10 text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400">
          {props.isLogin ? "ログイン" : "アカウント作成"}
        </button>
      </form>
      <p
        onClick={props.handleIsLogin}
        className="mt-6 text-base text-center text-orange-200 underline cursor-pointer hover:text-orange-400"
      >
        {props.isLogin
          ? "アカウントをお持ちでない方はこちら"
          : "既にアカウントをお持ちですか？"}
      </p>
    </>
  );
};

export default memo(MailLogin);
