import React, { memo, VFC } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from '@firebase/auth';
import { auth } from '../../../../lib/firebase';
import { useRouter } from 'next/dist/client/router';

type ResetFormData = {
  email: string;
};

//パスワードリセットForm
const ResetPassword: VFC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    mode: 'onChange',
  });

  const resetPassword = async (data: ResetFormData) => {
    auth.languageCode = 'ja';
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        alert('パスワードリセットメールを送信しました。');
        router.push(`/login`);
      })
      .catch(() => {
        alert('メールアドレスが見つかりません。');
      });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-orange-300 ">パスワードの再設定</h1>
      <p className="mt-12 text-base text-gray-400">
        登録いただいたメールアドレスを入力し、「送信」ボタンをクリックしてください。
      </p>
      <form onSubmit={handleSubmit(resetPassword)}>
        <label htmlFor="email" className="block mt-8 text-base text-gray-400 ">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          placeholder="メールアドレスを入力してください"
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
        <div className="flex justify-between mt-16">
          <Link href="/login">
            <a className="inline-block py-3 w-12/25 text-2xl font-bold text-center text-white bg-gray-400 hover:bg-gray-500 rounded-xl">
              戻る
            </a>
          </Link>
          <button className="py-3 w-12/25 text-2xl font-bold text-white bg-orange-300 hover:bg-orange-400 rounded-xl border">
            送信
          </button>
        </div>
      </form>
    </>
  );
};

export default memo(ResetPassword);
