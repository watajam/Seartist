import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { UserData } from '../../types/UserData';

//ユーザープロフィール情報を取得する
export const useQueryProfileUserInfoSetLoading = () => {
  const [user, setUser] = useState<UserData>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userRef = collection(db, 'users');

    const unSub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (router.query.id !== undefined) {
          const q = query(userRef, where('userId', '==', `${router.query.id}`));
          const querySnap = await getDocs(q);
          if (querySnap.docs) {
            const userData = querySnap.docs[0]?.data() as UserData;

            setUser({
              ...userData,
            });
            setUserLoading(false);
          } else {
            alert('存在しないページです');
          }
        }
      } else {
        router.push('/login');
      }
    });

    return () => unSub();
  }, [router]);

  return { user, userLoading };
};
