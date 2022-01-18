import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../../lib/firebase';

//プロフィール編集機能
export const useUpdateProfileEdit = () => {
  const router = useRouter();

  //投稿する再に写真が追加している場合の処理
  const updateProfileEdit = async (url, data, setError) => {
    //ログインしているユーザーの情報を取得
    const q = query(collection(db, 'users'), where('userId', '==', data.userId));
    const userInfoDocs = await getDocs(q);

    //ユーザーidを変更した再に重複がないか判定
    if (userInfoDocs.docs.length === 1) {
      userInfoDocs.docs.forEach(async (userInfoDoc) => {
        //ユーザーidを変更した再に重複があり、ログインしているユーザーのメールアドレスと違う場合はエラーを返す
        if (userInfoDoc.data().email !== auth.currentUser?.email) {
          setError('userId', {
            type: 'validate',
            message: 'このユーザーIDは既に使用されています',
          });
        } else {
          await updateDoc(doc(db, 'users', auth.currentUser?.email), {
            profilePhoto: url ? url : '',
            name: data.name,
            userId: data.userId,
            genre: data.genre ? data.genre : '',
            location: data.location,
            birthday: data.birthday,
            writing: data.writing,
            twitterUrl: data.twitterUrl,
            instagramUrl: data.instagramUrl,
            homepageUrl: data.homepageUrl,
            otherUrl: data.otherUrl,
          });
          router.back();
        }
      });
    } else {
      await updateDoc(doc(db, 'users', auth.currentUser?.email), {
        profilePhoto: url ? url : '',
        name: data.name,
        userId: data.userId,
        genre: data.genre ? data.genre : '',
        location: data.location,
        birthday: data.birthday,
        writing: data.writing,
        twitterUrl: data.twitterUrl,
        instagramUrl: data.instagramUrl,
        homepageUrl: data.homepageUrl,
        otherUrl: data.otherUrl,
      });
      router.push(`/profile/${data.userId}`);
    }
  };

  return { updateProfileEdit };
};
