import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { UserData } from '../../types/UserData';

//ユーザー情報を取得する
export const useQueryUserDetailInfoSetLoading = () => {
  const [user, setUser] = useState<Pick<UserData, 'userId' | 'name' | 'image' | 'email'>>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userRef = collection(db, 'users');

    const unSub = auth.onAuthStateChanged(async (user) => {
      if (router.query.id !== undefined) {
        const q = query(userRef, where('userId', '==', `${router.query.id[0]}`));
        const querySnap = await getDocs(q);
        if (querySnap.docs) {
          const userData = querySnap.docs[0].data() as Pick<UserData, 'userId' | 'name' | 'image' | 'email'>;
          setUser({
            userId: userData.userId,
            name: userData.name,
            image: userData.image,
            email: userData.email,
          });
          setUserLoading(false);
        } else {
          console.log('No such document!');
        }
      }
      if (user) {
      } else {
        router.push('/login');
      }
    });
    return () => unSub();
  }, [router]);

  return { user, userLoading };
};
