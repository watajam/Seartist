import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../../lib/firebase';

export const useUpdateProfileEdit = () => {
  const router = useRouter();

  const updateProfileImageEdit = async (url, data, setError) => {
    const q = query(collection(db, 'users'), where('userId', '==', data.userId));
    const currentUser = await getDocs(q);
    if (currentUser.docs.length === 1) {
      currentUser.docs.forEach(async (doc1) => {
        if (doc1.data().email !== auth.currentUser?.email) {
          setError('userId', {
            type: 'validate',
            message: 'このユーザーIDは既に使用されています',
          });
        } else {
          await updateDoc(doc(db, 'users', auth.currentUser?.email), {
            image: url,
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
        image: url,
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

  const updateProfileEdit = async (data, setError) => {
    const q = query(collection(db, 'users'), where('userId', '==', data.userId));
    const currentUser = await getDocs(q);
    if (currentUser.docs.length === 1) {
      currentUser.docs.forEach(async (doc1) => {
        if (doc1.data().email !== auth.currentUser?.email) {
          setError('userId', {
            type: 'validate',
            message: 'このユーザーIDは既に使用されています',
          });
        } else {
          await updateDoc(doc(db, 'users', auth.currentUser?.email), {
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
  return { updateProfileImageEdit, updateProfileEdit };
};
