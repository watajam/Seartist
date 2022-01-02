import { collectionGroup, query, where, getDocs, collection } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { PostDetailData } from '../../../types/PostDetailData';
import { UserData } from '../../../types/UserData';

type postsByUsers = PostDetailData & Pick<UserData, 'name' | 'profilePhoto'>;

//ユーザーの投稿詳細を取得する
export const useQueryPostByUserDetail = () => {
  const [postByUser, setPostByUser] = useState<postsByUsers>(null);
  const [postByUserLoading, setPostByUserLoading] = useState(true);
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
            setPostByUser(null);
          } else {
            const postData = postDocs.docs[0].data() as PostDetailData;

            const q = query(collection(db, 'users'), where('email', '==', `${postData?.email}`));
            const userDoc = await getDocs(q);
            if (userDoc.empty) {
              setPostByUserLoading(false);
              setPostByUser(null);
            } else {
              const userData = userDoc.docs[0].data() as Pick<UserData, 'name' | 'profilePhoto'>;
              setPostByUser({
                ...postData,
                name: userData.name,
                profilePhoto: userData.profilePhoto,
              });
              setPostByUserLoading(false);
            }
          }
        }
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  return { postByUser, postByUserLoading };
};
