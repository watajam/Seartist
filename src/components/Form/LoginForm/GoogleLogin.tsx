import React, { memo, VFC } from 'react';
import { signInWithPopup } from '@firebase/auth';
import { useRouter } from 'next/dist/client/router';

import { FcGoogle } from 'react-icons/fc';
import { auth, db, provider } from '../../../../lib/firebase';
import { collection, getDocs, query, where } from '@firebase/firestore';

//Googleログイン
const GoogleLogin: VFC = () => {
  const router = useRouter();

  //Googleログイン
  const googleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const q = query(collection(db, 'users'), where('email', '==', result.user.email));
        const user = await getDocs(q);
        if (user.docs.length) {
          router.push(`/posts`);
        } else {
          router.push(`/selection`);
        }
      })
      .catch(() => {
        alert('ログインできません。');
      });
  };

  return (
    <button
      onClick={googleLogin}
      className="border border-gray-400  pl-2 w-full mt-4 py-3 font-bold  rounded-xl flex justify-center  hover:bg-gray-100 "
    >
      <FcGoogle className="text-2xl" />
      <span className="pl-2 text-2xl text-gray-400 ">Googleでログイン</span>
    </button>
  );
};

export default memo(GoogleLogin);
