import { signOut } from '@firebase/auth';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { auth } from '../../lib/firebase';
import { usePromiseToast } from '../../src/hooks/usePromiseToast';
import toast from 'react-hot-toast';

//ログアウト
export const useAuthLogout = () => {
  const router = useRouter();
  const { promiseToast, isLoading } = usePromiseToast();

  const logout = useCallback(async () => {
    await signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch(() => {
        toast.error('ログアウトに失敗しました。');
      });
  }, [router]);

  const handleLogout = () => {
    promiseToast(logout(), 'ログアウトしました。');
  };
  return { handleLogout, isLoading };
};
