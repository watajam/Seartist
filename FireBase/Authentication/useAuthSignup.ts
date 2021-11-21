import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../lib/firebase';
import { AuthFormData } from '../../types/AuthFormData';

export const useAuthSignup = () => {
  const router = useRouter();

  const signup = async (data: AuthFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push(`/selection`);
      alert('プロフィールを登録しましょう。');
    } catch (error) {
      alert('アカウントが作成できません。');
    }
  };
  return { signup };
};
