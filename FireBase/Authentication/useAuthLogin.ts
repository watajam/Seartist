import { signInWithEmailAndPassword } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../lib/firebase';
import { AuthFormData } from '../../types/AuthFormData';
import { usePromiseToast } from '../../src/hooks/usePromiseToast';
import { useCallback } from 'react';

//ログイン
export const useAuthLogin = () => {
  const router = useRouter();
  const { promiseToast, isLoading } = usePromiseToast();

  const login = useCallback(
    async (data) => {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      const q = query(collection(db, 'users'), where('email', '==', data.email));
      const user = await getDocs(q);
      if (user.docs.length) {
        router.push(`/posts`);
      } else {
        router.push(`/selection`);
      }
    },
    [router]
  );

  const handleLogin = async (data: AuthFormData) => {
    promiseToast(login(data), 'ログインできました。', 'アカウントが見つかりません。');
  };
  return { handleLogin, isLoading };
};
