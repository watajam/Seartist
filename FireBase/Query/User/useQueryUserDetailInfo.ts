import { collection, getDocs, query, where } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';

//ユーザー詳細情報を取得する
export const useQueryUserDetailInfo = (post) => {
  const [user, setUser] = useState<Pick<UserData, 'name' | 'profilePhoto'>>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userRef = collection(db, 'users');

    onAuthStateChanged(auth,async (user) => {
      if (user) {
        if (post?.email !== undefined && router.query.id !== undefined) {
          const q = query(userRef, where('email', '==', `${post?.email}`));
          const querySnap = await getDocs(q);
          if (querySnap.docs) {
            const userData = querySnap.docs[0]?.data() as Pick<UserData, 'name' | 'profilePhoto'>;
            setUser({
              ...userData,
            });
            setUserLoading(false);
          } else {
            console.log('No such document!');
          }
        }
      } else {
        router.push('/login');
      }
    });
  }, [router, post]);

  return { user, userLoading };
};
