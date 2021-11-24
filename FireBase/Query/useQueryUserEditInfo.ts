import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { UserData } from '../../types/UserData';

// ユーザー編集情報取得
export const useQueryUserEditInfo = (setValue) => {
  const [user, setUser] = useState<Pick<UserData, 'image' | 'userId' | 'genre'>>(null);
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = doc(db, 'users', userAuth.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.data()) {
          const userData = docSnap?.data() as UserData;

          setUser({ ...userData });
          setValue('image', userData.image);
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
        } else {
          console.log('No such document!');
        }
      } else {
        router.push('/login');
      }
    });
    return () => unSub();
  }, []);
  return user;
};
