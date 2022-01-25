import { doc, getDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';

//編集画面でユーザー情報取得してFormの初期値に設定する
export const useQueryUserEditInfo = (setValue) => {
  const [user, setUser] = useState<Pick<UserData, 'profilePhoto' | 'userId' | 'genre'>>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = doc(db, 'users', userAuth.email);
        const docSnap = await getDoc(userRef);
        if (!docSnap.data()) {
          alert('ユーザー情報が取得できませんでした。');
        } else {
          const userData = docSnap?.data() as UserData;

          setUser({ ...userData });
          setValue('profilePhoto', userData.profilePhoto);
          setValue('name', userData.name);
          setValue('userId', userData.userId);
          setValue('birthday', userData.birthday);
          setValue('genre', userData.genre);
          setValue('location', userData.location);
          setValue('writing', userData.writing);
          setValue('twitterUrl', userData.twitterUrl);
          setValue('instagramUrl', userData.instagramUrl);
          setValue('homepageUrl', userData.homepageUrl);
          setValue('otherUrl', userData.otherUrl);
        }
      } else {
        router.push('/login');
      }
    });
  }, [router, setValue]);
  return user;
};
