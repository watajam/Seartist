import React, { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/dist/client/router";

type LoginFormData = {
  email: string;
  password: string;
};

type Props = {
  isLogin: boolean;
  handleIsLogin: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

const MailLogin: React.VFC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    setEmail(data.email);
    setPassword(data.password);
  };

  //ログイン機能
  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(`/`);
    } catch (error) {
      alert("アカウントが見つかりません");
    }
  };

  //新規アカウント作成
  const signin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push(`/`);
    } catch (error) {
      alert("アカウントを作成できません");
    }
  };

  return (
    <>
      {/* ログイン＆アカウント作成のForm */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレスのフォームとバリデーション */}
        <label className="block mt-8 text-base text-gray-400 ">
          メールアドレス
          <input
            type="email"
            placeholder="メールアドレスを入力してください"
            {...register("email", {
              required: "必須項目です。",
              pattern: {
                value:
                  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                message: "正しい形式で入力してください",
              },
            })}
            className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
          />
        </label>
        {errors.email && (
          <p className="text-red-600">{errors.email?.message}</p>
        )}
        {/* パスワードのフォームとバリデーション */}
        <label className="block mt-8 text-base text-gray-400 ">
          パスワード
          <input
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
            className="w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
            type="password"
          />
        </label>
        {errors.password && (
          <p className="text-red-600"> {errors.password?.message} </p>
        )}
        <div className="mt-4 text-right">
          <Link href="/">
            <a className="inline-block text-base text-gray-400 underline cursor-pointer hover:text-gray-600 ">
              {props.isLogin ? "パスワードを忘れた場合" : null}
            </a>
          </Link>
        </div>
        <button
          onClick={props.isLogin ? login : signin}
          disabled={!isDirty || !isValid}
          className="w-full py-3 mt-10 text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400"
        >
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
