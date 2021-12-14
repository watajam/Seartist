import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';

//ユーザー情報を取得する
export const useQueryUserInfo = () => {
  const [user, setUser] = useState<Pick<UserData, 'userId' | 'name' | 'image' | 'email'>>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.data()) {
          const userData = docSnap?.data() as Pick<UserData, 'userId' | 'name' | 'image' | 'email'>;
          setUser({
            ...userData,
          });
          setUserLoading(false);
        } else {
          console.log('No such document!');
        }
      } else {
        router.push('/login');
      }
    });
    return () => unSub();
  }, []);

  return { user, userLoading };
};
