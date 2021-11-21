import { signInWithEmailAndPassword } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../lib/firebase';
import { AuthFormData } from '../../types/AuthFormData';

export const useAuthLogin = () => {
  const router = useRouter();

  const login = async (data: AuthFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      const q = query(collection(db, 'users'), where('email', '==', data.email));
      const user = await getDocs(q);
      if (user.docs.length) {
        router.push(`/posts`);
      } else {
        router.push(`/selection`);
      }
    } catch (error) {
      alert('アカウントが見つかりません。');
    }
  };
  return { login };
};
