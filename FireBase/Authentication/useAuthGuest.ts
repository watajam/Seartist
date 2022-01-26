import { signInWithEmailAndPassword } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { auth, db } from '../../lib/firebase';
import { usePromiseToast } from '../../src/hooks/usePromiseToast';

//ゲストログイン
export const useAuthGuest = () => {
  const router = useRouter();
  const { promiseToast, isLoading } = usePromiseToast();

  const guestLogin = useCallback(async () => {
    await signInWithEmailAndPassword(auth, `${process.env.NEXT_PUBLIC_EMAIL}`, `${process.env.NEXT_PUBLIC_PASSWORD}`);
    const q = query(collection(db, 'users'), where('email', '==', `${process.env.NEXT_PUBLIC_EMAIL}`));
    const user = await getDocs(q);
    if (user.docs.length) {
      router.push(`/posts`);
    } else {
      router.push(`/selection`);
    }
  }, [router]);

  const handleGuestLogin = async () => {
    promiseToast(guestLogin(), 'ゲストログインできました。', 'ログインに失敗しました。');
  };
  return { handleGuestLogin, isLoading };
};
