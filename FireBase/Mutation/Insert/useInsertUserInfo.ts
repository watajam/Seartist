import { doc, setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

export const useInsertUserInfo = () => {
  const handleSetUserInfo = useCallback(() => {
    setDoc(doc(db, 'users', auth.currentUser?.email), {
      image: '',
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
    });
  }, [auth.currentUser]);
  return { handleSetUserInfo };
};
