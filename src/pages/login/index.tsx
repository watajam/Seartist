import React, { useCallback, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string | number;
  password: number;
};

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  //ログインと新規作成の切り替え
  const handleIsLogin = useCallback(
    (e: React.MouseEvent<HTMLParagraphElement>) => {
      setIsLogin((prevIsLogin) => !prevIsLogin);
    },
    []
  );

  return (
    <>
      <div className="min-h-screen ">
        <header className="px-4 py-2 text-4xl font-bold text-white bg-orange-300 h-14">
          Seartist
        </header>
        <div className="px-5 py-12 ">
          <h1 className="text-2xl font-bold text-center text-orange-300 ">
            {isLogin ? "ログイン" : "アカウント作成"}
          </h1>
          {/* メールログイン */}
          {/* ログイン＆アカウント作成のForm */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* メールアドレスのフォームとバリデーション */}
            <label
              htmlFor="email"
              className="block mt-8 text-base text-gray-400 "
            >
              メールアドレス
            </label>
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
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
            {/* パスワードのフォームとバリデーション */}
            <label
              htmlFor="password"
              className="block mt-8 text-base text-gray-400 "
            >
              パスワード
            </label>
            <input
              type="password"
              placeholder="パスワードを入力してください"
              {...register("password", {
                required: "必須項目です。",
                minLength: {
                  value: 6,
                  message:
                    "パスワードは6文字数以上16文字以下で入力してください",
                },
                maxLength: {
                  value: 16,
                  message:
                    "パスワードは6文字数以上16文字以下で入力してください",
                },
              })}
              className="w-full h-10 pl-2 mt-2 text-base border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.password && (
              <p className="text-red-600"> {errors.password?.message} </p>
            )}
            <div className="mt-4 text-right">
              <Link href="">
                <a className="block text-base text-gray-400 underline cursor-pointer hover:text-gray-600 ">
                  {isLogin ? "パスワードを忘れた場合" : null}
                </a>
              </Link>
            </div>
            <button className="w-full py-3 mt-10 text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400">
              {isLogin ? "ログイン" : "アカウント作成"}
            </button>
          </form>
          <p
            onClick={handleIsLogin}
            className="mt-6 text-base text-center text-orange-200 underline cursor-pointer hover:text-orange-400"
          >
            {isLogin
              ? "アカウントをお持ちでない方はこちら"
              : "既にアカウントをお持ちですか？"}
          </p>
          <hr className="mt-8 border-gray-400" />
          <h3 className="mt-4 text-base text-center text-gray-400 ">
            他の方法でログイン
          </h3>
          {/* Googleログイン */}
          <button className="border border-gray-400  pl-2 w-full mt-4 py-3 font-bold  rounded-xl flex justify-center  hover:bg-gray-100 ">
            <FcGoogle className="text-2xl" />
            <span className="pl-2 text-2xl text-gray-400 ">
              Googleでログイン
            </span>
          </button>
          {/* ゲストログイン */}
          <Link href="">
            <a className="border block text-center w-full  mt-6  py-3 font-bold  text-2xl text-white rounded-xl bg-gray-400 hover:bg-gray-500">
              ゲストログイン
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
