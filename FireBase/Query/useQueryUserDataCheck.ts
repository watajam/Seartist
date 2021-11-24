import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth, db } from '../../lib/firebase';

//ログインしているユーザーのデータが存在するかどうかを確認する
export const useQueryUserDataCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const  unSub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.data() === undefined) {
          router.push('/selection');
        }
      } else {
        router.push('/login');
      }
    });
    return () =>  unSub();
  }, []);
};
