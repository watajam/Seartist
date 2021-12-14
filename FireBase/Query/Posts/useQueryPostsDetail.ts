import { collectionGroup, query, where, onSnapshot } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { PostDetailData } from '../../../types/PostDetailData';

//ユーザーの投稿詳細を取得する
export const useQueryPostsDetail = () => {
  const [post, setPost] = useState<PostDetailData>(null);
  const [postLoading, setPostLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        if (router.query.id !== undefined) {
          const postRef = collectionGroup(db, 'posts');
          const q = query(postRef, where('id', '==', router.query.id));
          const unSub = onSnapshot(q, (querySnap) => {
            if (querySnap.empty) {
              setPostLoading(false);
              return;
            } else {
              const postData = querySnap.docs[0].data() as PostDetailData;
              setPost({
                ...postData,
              });
              setPostLoading(false);
            }
          });
          return () => unSub();
        }
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  return { post, postLoading };
};
