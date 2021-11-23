import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { PostDetailData } from '../../types/PostDetailData';

//ユーザーの投稿詳細を取得する
export const useQuerPostsDetailSetLoading = (user) => {
  const [post, setPost] = useState<PostDetailData>(null);
  const [postLoading, setPostLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        if (user?.email !== undefined && router.query.id !== undefined) {
          const docRef = doc(db, 'users', `${user?.email}`, 'posts', `${router.query.id[1]}`);
          const docSnap = await getDoc(docRef);
          if (docSnap.data()) {
            const postData = docSnap.data() as PostDetailData;
            setPost({
              ...postData,
            });
            setPostLoading(false);
          } else {
            console.log('投稿が見つかりませんでした');
          }
        }
      } else {
        router.push('/login');
      }
    });
  }, [user, router]);

  return { post, postLoading };
};
