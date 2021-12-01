import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { UserData } from '../../types/UserData';

//ユーザー情報を取得する
export const useQueryUserDetailInfoSetLoading = (post) => {
  const [user, setUser] = useState<Pick<UserData, 'userId' | 'name' | 'image' | 'email'>>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userRef = collection(db, 'users');

    console.log(post?.email);
    const unSub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (post?.email !== undefined && router.query.id !== undefined) {
          const q = query(userRef, where('email', '==', `${post?.email}`));
          const querySnap = await getDocs(q);
          if (querySnap.docs) {
            const userData = querySnap.docs[0]?.data() as Pick<UserData, 'userId' | 'name' | 'image' | 'email'>;
            setUser({
              ...userData,
            });
            setUserLoading(false);
          } else {
            console.log('No such document!');
          }
        }
      } else {
        console.log(2);

        // router.push('/login');
      }
    });
    return () => unSub();
  }, [router, post]);

  return { user, userLoading };
};
