import { auth, db } from '../../../lib/firebase';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

//ログインしているユーザーがフォローしているユーザーかどうか確認
export const useQueryFollowingCheck = (email) => {
  const router = useRouter();
  const [userFollowingInfo, setUserFollowingInfo] = useState('');

  useEffect(() => {
    if (email === undefined) {
      setUserFollowingInfo(undefined);
      return;
    }
    const userFollowingCheck = async () => {
      const unSub = onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.email !== email) {
            const authUserRef = doc(db, 'users', user.email);
            const q = query(collection(authUserRef, 'following'), where('email', '==', email));
            const unSub = onSnapshot(q, (querySnap) => {
              if (querySnap.docs.length === 0) {
                setUserFollowingInfo('フォローする');
                return;
              } else {
                setUserFollowingInfo('フォロー中');
              }
            });
            return () => unSub();
          }
        } else {
          router.push('/login');
        }
      });
      return () => unSub();
    };
    userFollowingCheck();
  }, [router, email]);

  return userFollowingInfo;
};
