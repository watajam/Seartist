import { signInWithPopup } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db, provider } from '../../lib/firebase';

//googleログイン
export const useAuthGoogleLogin = () => {
  const router = useRouter();

  const googleLogin = async () => {
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
        alert('ログインできません。');
      });
  };
  return { googleLogin };
};
