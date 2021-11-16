import React, { memo, VFC } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth, db } from "../../../../lib/firebase";
import { useRouter } from "next/dist/client/router";
import { collection, getDocs, query, where } from "@firebase/firestore";

type LoginFormData = {
  email: string;
  password: string;
};

type Props = {
  isLogin: boolean;
  handleIsLogin: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

const EmailLogin: VFC<Props> = (props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  //ログイン機能
  const login = async (data: LoginFormData) => {
    const q = query(collection(db, "users"), where("email", "==", data.email));
    const user = await getDocs(q);
    try {
      if (user.docs.length) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        router.push(`/posts`);
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        router.push(`/selection`);
      }
    } catch (error) {
      alert("アカウントが見つかりません");
    }
  };

  

  //新規アカウント作成
  const signup = async (data: LoginFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push(`/selection`);
      alert("プロフィールを登録しましょう");
    } catch (error) {
      alert("アカウントを作成できません");
    }
  };

  return (
    <>
      {/* ログイン＆新規アカウント作成のForm */}
      <form
        onSubmit={props.isLogin ? handleSubmit(login) : handleSubmit(signup)}
      >
        {/* メールアドレスのフォームとバリデーション */}
        <label htmlFor="email" className="block mt-8 text-base text-gray-400 ">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          placeholder="メールアドレスを入力してください"
          {...register("email", {
            required: "必須項目です。",
            pattern: {
              value:
                /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: "正しい形式で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 appearance-none"
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
          id="password"
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
          className="w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 appearance-none"
        />

        {errors.password && (
          <p className="text-red-600"> {errors.password?.message} </p>
        )}
        <div className="mt-4 text-right">
          <Link href="/login/changepassword">
            <a className="inline-block text-base text-orange-200 underline cursor-pointer hover:text-orange-400 ">
              {props.isLogin ? "パスワードを忘れた場合" : null}
            </a>
          </Link>
        </div>
        <button className="w-full py-3 mt-10 text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400 ">
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

export default memo(EmailLogin);
