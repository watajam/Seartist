import { collectionGroup, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { PostDetailData } from '../../types/PostDetailData';

//ユーザーの投稿詳細を取得する
export const useQuerPostsDetailSetLoading = () => {
  const [post, setPost] = useState<PostDetailData>(null);
  const [postLoading, setPostLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        if (router.query.id !== undefined) {
          const postRef = collectionGroup(db, 'posts');
          const q = query(postRef, where('id', '==', router.query.id));
          const querySnap = await getDocs(q);
          if (querySnap.docs) {
            const postData = querySnap?.docs[0].data();
            setPost({
              genre: postData?.genre,
              location: postData?.location,
              eventName: postData?.eventName,
              eventLocation: postData?.eventLocation,
              eventDate: postData?.eventDate,
              openTime: postData?.openTime,
              closeTime: postData?.closeTime,
              id: postData?.id,
              image: postData?.image,
              writing: postData?.writing,
              minAmount: postData?.minAmount,
              maxAmount: postData?.maxAmount,
              tickets: postData?.tickets,
              coupon: postData?.coupon,
              email: postData?.email,
            });
            setPostLoading(false);
          } else {
            console.log('投稿が見つかりませんでした');
          }
        }
      } else {
        router.push('/login');
      }
      return () => unSub();
    });
  }, [router]);

  return { post, postLoading };
};
