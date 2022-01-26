import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { auth, db } from '../../../lib/firebase';

//ユーザー情報にプロフィール写真と紹介文を登録
export const useUpdateUsereSelfLntroductionInfo = () => {
  const router = useRouter();

  const updateUserImageAndWritingInfo = async (url, data) => {
    await updateDoc(doc(db, 'users', auth.currentUser?.email), {
      profilePhoto: url ? url : '',
      writing: data.writing,
    })
      .then(() => {
        toast.success('始めましょう！');
        router.push('/posts');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return { updateUserImageAndWritingInfo };
};
