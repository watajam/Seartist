import { collectionGroup, query, where, getDocs, collection } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { PostDetailData } from '../../../types/PostDetailData';
import { UserData } from '../../../types/UserData';

type postsByUsers = PostDetailData & Pick<UserData, 'name' | 'profilePhoto' | 'email'>;

//プロフィールページにログインしているユーザーの投稿データを表示
export const useQueryPostByUserDetail = () => {
  const [postByUser, setPostByUser] = useState<postsByUsers>(null);
  const [postByUserLoading, setPostByUserLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        if (router.query.id !== undefined) {
          const postRef = collectionGroup(db, 'posts');
          const q = query(postRef, where('id', '==', router.query.id));
          const postDocs = await getDocs(q);
          if (postDocs.empty) {
            setPostByUserLoading(false);
            setError('投稿がみつかりません');
          } else {
            const postData = postDocs.docs[0].data() as PostDetailData;

            const q = query(collection(db, 'users'), where('email', '==', `${postData?.email}`));
            const userDoc = await getDocs(q);
            if (userDoc.empty) {
              setPostByUserLoading(false);
              setError('ユーザーが存在しません');
            } else {
              const userData = userDoc.docs[0].data() as Pick<UserData, 'name' | 'profilePhoto' | 'email'>;
              setPostByUser({
                ...postData,
                name: userData.name,
                profilePhoto: userData.profilePhoto,
                email: userData.email,
              });
              setPostByUserLoading(false);
              setError(null);
            }
          }
        }
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  return { postByUser, postByUserLoading, error };
};
