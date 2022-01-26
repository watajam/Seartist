import { signInWithPopup } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { auth, db, provider } from '../../lib/firebase';
import { usePromiseToast } from '../../src/hooks/usePromiseToast';
import toast from 'react-hot-toast';

//googleログイン
export const useAuthGoogleLogin = () => {
  const router = useRouter();
  const { promiseToast, isLoading } = usePromiseToast();

  const googleLogin = useCallback(async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const q = query(collection(db, 'users'), where('email', '==', result.user.email));
        const user = await getDocs(q);
        if (user.docs.length) {
          router.push(`/posts`);
        } else {
          router.push(`/selection`);
          alert('プロフィールを登録しましょう。');
        }
      })
      .catch(() => {
        toast.error('ログインに失敗しました。');
      });
  }, [router]);

  const handleGoogleLogin = async () => {
    promiseToast(googleLogin(), 'ログインできました。');
  };
  return { handleGoogleLogin, isLoading };
};
