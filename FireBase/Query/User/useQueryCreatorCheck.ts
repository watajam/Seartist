import { doc, getDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';

//リスナーアカウントが投稿作成ページに遷移した際に投稿できないようにする
export const useQueryCreatorCheck = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
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
  }, [router]);
};
