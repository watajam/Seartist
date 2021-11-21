import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth, db } from '../../lib/firebase';

//ログインしているユーザーのメールアドレスが存在するかどうかを確認する
export const useQueryUserEmailCheck = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.data()?.email !== user.email) {
          router.push('/selection');
        }
      } else {
        router.push('/login');
      }
    });
  }, []);
};