import { auth, db } from '../../../lib/firebase';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useQueryFollowingCheck = (email) => {
  const router = useRouter();
  const [userFollowingInfo, setUserFollowingInfo] = useState('');
  //自分のフォローコレクションに表示されているプロフィールユーザーの情報が既にあるか確認
  useEffect(() => {
    if (email === undefined) {
      setUserFollowingInfo(undefined);
      return;
    }
    const userFollowingCheck = async () => {
      onAuthStateChanged(auth, (user) => {
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
    };
    userFollowingCheck();
  }, [router.query?.id]);

  return userFollowingInfo;
};
