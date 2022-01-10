import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../../lib/firebase';

//ユーザー情報に各URLを登録
export const useUpdateUserUrlInfo = () => {
  const router = useRouter();

  const updateUserUrlInfo = async (data, url) => {
    await updateDoc(doc(db, 'users', auth.currentUser.email), {
      twitterUrl: data.twitterUrl,
      instagramUrl: data.instagramUrl,
      homepageUrl: data.homepageUrl,
      otherUrl: data.otherUrl,
    });
    router.push(url);
  };
  return { updateUserUrlInfo };
};
