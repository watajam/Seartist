import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../../lib/firebase';

export const useUpdateUsereSelfLntroductionInfo = () => {
  const router = useRouter();

  const updateUserImageAndWritingInfo = async (url, data) => {
    await updateDoc(doc(db, 'users', auth.currentUser?.email), {
      image: url,
      writing: data.writing,
    });
    router.push('/posts');
  };
  const updateUserWritingInfo = async (data) => {
    await updateDoc(doc(db, 'users', auth.currentUser.email), {
      image: '',
      writing: data.writing,
    });
    router.push('/posts');
  };
  return { updateUserImageAndWritingInfo, updateUserWritingInfo };
};
