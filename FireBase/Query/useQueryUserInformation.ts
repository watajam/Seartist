import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { FormData } from '../../types/FormData';

//ユーザー情報を取得する
export const useQueryUserInformation = () => {
  const [user, setUser] = useState<Pick<FormData, 'userId' | 'genre'>>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.data()) {
          setUser({ userId: docSnap.data().userId, genre: docSnap.data().genre });
        } else {
          console.log('No such document!');
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
};
