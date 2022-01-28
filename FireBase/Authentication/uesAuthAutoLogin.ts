import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth, db } from '../../lib/firebase';

// 自動ログイン
export const useAuthAutoLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const postsRef = doc(db, 'users', user.email);
        const userCheck = async () => {
          const docSnap = await getDoc(postsRef);
          if (docSnap.data()?.email === user.email) {
            router.push('/posts');
          } else {
            router.push('/selection');
          }
        };
        userCheck();
      }
    });

    return () => unSub();
  }, [router]);
};
