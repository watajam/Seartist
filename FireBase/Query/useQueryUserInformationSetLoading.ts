import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { FormData } from '../../types/FormData';

//ユーザー情報を取得する
export const useQueryUserInformationSetLoading = () => {
  const [user, setUser] = useState<Pick<FormData, 'userId' | 'name' | 'image'>>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.data()) {
          setUser({ userId: docSnap.data().userId, name: docSnap.data().name, image: docSnap.data().image });
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
