import { doc, setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

//初期データを追加機能
export const useInsertUserInfo = () => {
  const handleSetUserInfo = useCallback(() => {
    setDoc(doc(db, 'users', auth.currentUser?.email), {
      profilePhoto: '',
      name: '',
      userId: '',
      genre: '',
      location: '',
      birthday: '',
      writing: '',
      twitterUrl: '',
      instagramUrl: '',
      homepageUrl: '',
      otherUrl: '',
      likePostCount: 0,
      postsCount: 0,
    });
  }, [auth.currentUser]);
  return { handleSetUserInfo };
};
