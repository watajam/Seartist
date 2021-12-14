import { collection, orderBy, query, onSnapshot } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { PostData } from '../../../types/PostData';

//ユーザープロフィールの投稿を取得する
export const useQueryProfilePosts = (user) => {
  const [posts, setPosts] = useState<Omit<PostData, 'email'>[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user?.email !== undefined) {
      const q = query(collection(db, 'users', `${user.email}`, 'posts'), orderBy('timestamp', 'desc'));
      const unSub = onSnapshot(q, (querySnap) => {
        if (querySnap.empty) {
          setPostsLoading(false);
          return;
        } else {
          setPosts(
            querySnap.docs.map((doc) => ({
              id: doc.id,
              image: doc?.data().image,
              writing: doc?.data().writing,
              eventName: doc?.data().eventName,
              genre: doc?.data().genre,
              eventLocation: doc?.data().eventLocation,
              eventDate: doc?.data().eventDate,
              openTime: doc?.data().openTime,
              closeTime: doc?.data().closeTime,
              likeCount: doc?.data().likeCount,
            }))
          );
          setPostsLoading(false);
        }
      });
      return () => unSub();
    }
  }, [user, router]);

  return { posts, postsLoading };
};
