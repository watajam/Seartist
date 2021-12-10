import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';

//リスナーが投稿ページに遷移した際に、投稿できないようにする
export const useQueryCreatorCheck = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.data()?.genre === '') {
          alert('投稿できるのはクリエイターアカウントのみです');
          router.push('/posts');
        }
      } else {
        router.push('/login');
      }
    });
  }, []);
};
