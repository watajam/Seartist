import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../../lib/firebase';

//ユーザー情報にプロフィール写真と紹介文を登録
export const useUpdateUsereSelfLntroductionInfo = () => {
  const router = useRouter();

  const updateUserImageAndWritingInfo = async (url, data) => {
    await updateDoc(doc(db, 'users', auth.currentUser?.email), {
      profilePhoto: url,
      writing: data.writing,
    });
    router.push('/posts');
  };
  const updateUserWritingInfo = async (data) => {
    await updateDoc(doc(db, 'users', auth.currentUser.email), {
      profilePhoto: '',
      writing: data.writing,
    });
    router.push('/posts');
  };
  return { updateUserImageAndWritingInfo, updateUserWritingInfo };
};
