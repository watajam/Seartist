import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../../lib/firebase';

//ユーザー情報に氏名とユーザーIDとジャンルと所在地と生年月日をメールアドレス登録
export const useUpdateUserInfo = () => {
  const router = useRouter();

  const updateUserInfo = async (data, setError, url) => {
    const q = query(collection(db, 'users'), where('userId', '==', data.userId));
    const querySnap = await getDocs(q);
    if (querySnap.docs.length === 1) {
      setError('userId', {
        type: 'validate',
        message: 'このユーザーIDは既に使用されています',
      });
    } else {
      updateDoc(doc(db, 'users', auth.currentUser?.email), {
        name: data.name,
        userId: data.userId,
        genre: data.genre ? data.genre : '',
        location: data.location,
        birthday: data.birthday,
        email: auth.currentUser?.email,
      })
        .then(() => {
          router.push(url);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  return { updateUserInfo };
};
