import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { auth } from '../../lib/firebase';
import { usePromiseToast } from '../../src/hooks/usePromiseToast';
import { AuthFormData } from '../../types/AuthFormData';

//新規登録
export const useAuthSignUp = () => {
  const router = useRouter();
  const { promiseToast, isLoading } = usePromiseToast();

  const signUp = useCallback(
    async (data: AuthFormData) => {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push(`/selection`);
    },
    [router]
  );

  const handleSignUp = async (data: AuthFormData) => {
    promiseToast(signUp(data), 'プロフィールを登録しましょう。', 'アカウントが作成できません。');
  };
  return { handleSignUp, isLoading };
};
