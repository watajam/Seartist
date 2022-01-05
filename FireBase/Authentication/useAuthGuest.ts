import { signInWithEmailAndPassword } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../lib/firebase';

export const useAuthGuest = () => {
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, `${process.env.NEXT_PUBLIC_EMAIL}`,`${process.env.NEXT_PUBLIC_PASSWORD}`);
      const q = query(collection(db, 'users'), where('email', '==',`${process.env.NEXT_PUBLIC_EMAIL}`));
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
